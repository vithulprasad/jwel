const Razorpay = require("razorpay");
const crypto = require("crypto");
const Order = require("../models/Order_mode");
const Product = require("../models/Product_model"); // for stock deduction
const cart_model = require("../models/Cart_model");
const user_model = require("../models/User_model");

exports.get_address = async (req, res) => {
  const user = req.user.user_id;

  const find_user = await user_model.findOne({ _id: user });

  return res
    .status(200)
    .json({ message: "address fetched", data: find_user.address.reverse() });
};

exports.single_product = async (req, res) => {
  const id = req.query.id;
  const qty = req.query.qty;
  const find_product = await Product.findOne({ _id: id });
  if (!find_product) {
    return res.status(400).json({ message: "product not fond" });
  }

  if (find_product.status == "inactive") {
    return res.status(400).json({ message: "product is unavailable" });
  }

  if (find_product.quantity <= 0) {
    return res.status(400).json({ message: "product is out of stock" });
  }

  if (find_product.quantity < qty) {
    return res.status(400).json({ message: "sorry quantity is limited" });
  }

  return res.status(200).json({ message: "finded", data: find_product });
};

exports.cart_find = async (req, res) => {
  const id = req.query.id;
  const find_cart = await cart_model
    .findOne({ _id: id })
    .populate("items.product");

  if (!find_cart) {
    return res.status(400).json({ message: "cart not found" });
  }

  if (!find_cart.items.length) {
    return res.status(400).json({ message: "cart is empty" });
  }

  const find_product_is_valid = find_cart.items.some(
    (val) => val.product.status == "inactive"
  );

  if (find_product_is_valid) {
    return res
      .status(400)
      .json({ message: "The cart containing inactive product" });
  }

  const filter_stock = find_cart.items.filter(
    (val) => val.product.quantity <= 0
  );
  console.log(filter_stock);

  if (!filter_stock.length == false) {
    return res.status(400).json({
      message: `${filter_stock.map(
        (val) => val.product.name
      )} this product are out of stock`,
    });
  }

  return res.status(200).json({ message: "finded", data: find_cart.items });
};

// ✅ 1. Create Razorpay order + MongoDB order (pending)
exports.createOrder = async (req, res) => {
  try {
    const { products, address, type } = req.body;

    // ✅ Validate address fields
    const requiredFields = ["phone", "town", "landMark", "pinCode", "state"];
    for (const field of requiredFields) {
      if (
        !address ||
        !address[field] ||
        address[field].toString().trim() === ""
      ) {
        return res.status(400).json({
          message: `Address field '${field}' is required.`,
        });
      }
    }

    // ✅ Calculate totalAmount from DB
    let totalAmount = 0;

    for (const p of products) {
      const productDoc = await Product.findById(p.product);
      if (!productDoc) {
        return res
          .status(404)
          .json({ message: `Product not found: ${p.product}` });
      }
      totalAmount += productDoc.discount_price * p.quantity;
    }

    console.log("request is started razorpay", totalAmount);

    // ✅ Initialize Razorpay instance
    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    });

    // ✅ Create Razorpay order first
    const options = {
      amount: totalAmount * 100, // paise
      currency: "INR",
      receipt: Date.now().toString(),
    };

    const razorpayOrder = await razorpay.orders.create(options);
    console.log("Razorpay Order:", address);
    if (!razorpayOrder.id) {
      return res.status(400).json({ message: "error creating razorpay " });
    }

    // ✅ Create order in DB
    const newOrder = await Order.create({
      user: req.user.user_id,
      products: await Promise.all(
        products.map(async (p) => {
          const productDoc = await Product.findById(p.product);
          return {
            product: p.product,
            quantity: p.quantity,
            total_price: productDoc
              ? productDoc.discount_price * p.quantity
              : 0,
          };
        })
      ),
      totalAmount,
      razorpay_order_id: razorpayOrder.id,
      address,
      paymentStatus: "pending",
      orderStatus: "pending",
    });

    res.json({
      message: "Order created and pending payment",
      order: newOrder,
      raz:razorpayOrder,
    });
  } catch (err) {
    console.error("createOrder error:", err);
    res.status(500).json({ success: false, error: err.message });
  }
};

// ✅ 2. Verify Razorpay payment (frontend -> backend)
exports.verifyPayment = async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
      req.body;

    // generate expected signature
    const sign = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSign = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(sign)
      .digest("hex");

    if (expectedSign === razorpay_signature) {
      // update order
      const order = await Order.findOneAndUpdate(
        { razorpay_order_id },
        {
          $set: {
            razorpay_payment_id,
            razorpay_signature,
            paymentStatus: "paid",
            orderStatus: "confirmed",
            paidAt: new Date(),
          },
        },
        { new: true }
      );

      // reduce stock safely
      for (const item of order.products) {
        await Product.updateOne(
          { _id: item.product },
          { $inc: { stock: -item.quantity } }
        );
      }

      return res.json({ success: true, message: "Payment verified", order });
    } else {
      return res
        .status(400)
        .json({ success: false, message: "Invalid signature" });
    }
  } catch (err) {
    console.error("verifyPayment error:", err.message);
    res.status(500).json({ success: false, error: err.message });
  }
};

// ✅ 3. Webhook (backup verification)
exports.razorpayWebhook = async (req, res) => {
  try {
    const secret = process.env.RAZORPAY_WEBHOOK_SECRET;

    const shasum = crypto.createHmac("sha256", secret);
    shasum.update(JSON.stringify(req.body));
    const digest = shasum.digest("hex");

    const signature = req.headers["x-razorpay-signature"];
    if (digest !== signature) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid signature" });
    }

    const event = req.body.event;

    if (event === "payment.captured") {
      const payment = req.body.payload.payment.entity;

      await Order.findOneAndUpdate(
        { razorpay_order_id: payment.order_id },
        {
          $set: {
            razorpay_payment_id: payment.id,
            paymentStatus: "paid",
            orderStatus: "confirmed",
            paidAt: new Date(),
          },
        }
      );

      // (Optional) Deduct stock here too as backup
    }

    res.json({ success: true });
  } catch (err) {
    console.error("webhook error:", err.message);
    res.status(500).json({ success: false, error: err.message });
  }
};

// ✅ 4. Get all orders (admin)
exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("user", "name email")
      .populate("products.product", "name price image");
    res.json({ success: true, orders });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// ✅ 5. Get user’s own orders
exports.getUserOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id }).populate(
      "products.product",
      "name price image"
    );
    res.json({ success: true, orders });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// ✅ 6. Update order status (admin only: shipped/delivered/cancelled)
exports.updateOrderStatus = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;

    const order = await Order.findByIdAndUpdate(
      orderId,
      { orderStatus: status },
      { new: true }
    );

    res.json({ success: true, order });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};
