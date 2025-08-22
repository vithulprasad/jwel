const Razorpay = require("razorpay");
const crypto = require("crypto");
const Order = require("../models/Order_mode");
const Product = require("../models/Product_model"); // for stock deduction
const cart_model = require("../models/Cart_model");

exports.single_product = async (req, res) => {
  const id = req.query.id;
  const qty = req.query.qty
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

if(find_product.quantity < qty){
  return res.status(400).json({ message: "sorry quantity is limited" });
}

  return res.status(200).json({ message: "finded", data: find_product });
};

exports.cart_find = async (req, res) => {
  const id = req.query.id;
  const find_cart = await cart_model.findOne({ _id: id }).populate("items.product")

  if (!find_cart) {
    return res.status(400).json({ message: "cart not found" });
  }

  if (!find_cart.items.length) {
    return res.status(400).json({ message: "cart is empty" });
  }
  
  const find_product_is_valid  = find_cart.items.some((val)=>val.product.status == 'inactive')

  if(find_product_is_valid){
     return res.status(400).json({ message: "The cart containing inactive product" });
  }


  const filter_stock = find_cart.items.filter((val)=>val.product.quantity <=0)
  console.log(filter_stock)

  if(!filter_stock.length == false){
         return res.status(400).json({ message: `${filter_stock.map((val)=>val.product.name)} this product are out of stock` });
  }



  return res.status(200).json({ message: "finded", data: find_cart.items });
};

// ✅ 1. Create Razorpay order + MongoDB order (pending)
exports.createOrder = async (req, res) => {
  try {
    const { products, totalAmount, address } = req.body;

    // create Razorpay order
    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    });

    // create order in DB
    const newOrder = await Order.create({
      user: req.user._id,
      products: products.map((p) => ({
        product: p.productId,
        quantity: p.quantity,
        price: p.price,
      })),
      totalAmount,
      razorpay_order_id: razorpayOrder.id,
      address,
      paymentStatus: "pending",
      orderStatus: "created",
    });

    const options = {
      amount: totalAmount * 100, // convert to paise
      currency: "INR",
      receipt: newOrder._id,
    };

    const razorpayOrder = await razorpay.orders.create(options);

    res.json({ success: true, order: newOrder, razorpayOrder });
  } catch (err) {
    console.error("createOrder error:", err.message);
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
