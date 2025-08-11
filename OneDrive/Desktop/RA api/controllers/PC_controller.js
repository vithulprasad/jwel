const category_model = require("../models/Category_model");
const mongoose = require("mongoose");

const product_model = require("../models/Product_model"); // adjust path if needed

exports.product_create = async (req, res) => {
  try {
    const {
      name,
      description,
      model,
      category,
      price,
      discount_price,
      quantity,
      images,
      front_image,
      hasVariants,
      variants,
      status,
    } = req.body;

    console.log(req.body);

    // ✅ Validate name
    if (!name || name.trim() === "") {
      return res.status(400).json({ message: "Product name is required" });
    }
    const existingProduct = await product_model.findOne({ name: name.trim() });
    if (existingProduct) {
      return res
        .status(400)
        .json({ message: "A product with this name already exists" });
    }
    // ✅ Validate price logic if no variants
    if (!hasVariants) {
      if (price == null || isNaN(price)) {
        return res
          .status(400)
          .json({ message: "Price is required for non-variant products" });
      }
      if (discount_price != null && discount_price >= price) {
        return res.status(400).json({
          message: "Discount price must be less than the original price",
        });
      }
    }

    // ✅ Validate variants price logic
    if (hasVariants && variants && variants.length > 0) {
      for (let v of variants) {
        if (v.discount_price != null && v.discount_price >= v.price) {
          return res.status(400).json({
            message: `Discount price for variant "${v.name}" must be less than its price`,
          });
        }
      }
    }

    let image_collector = [
      req.body.image_url_1,
      req.body.image_url_2,
      req.body.image_url_3,
      req.body.image_url_4,
      req.body.image_url_5,
    ];

    // ✅ Create product document
    const product = new product_model({
      name,
      description,
      category,
      price: hasVariants ? undefined : price,
      discount_price: hasVariants ? undefined : discount_price,
      quantity: hasVariants ? undefined : quantity,
      images: image_collector || [],
      front_image,
      hasVariants,
      variants: hasVariants ? variants : [],
      status,
    });

    // ✅ Save to DB
    const savedProduct = await product.save();

    res.status(201).json({
      message: "Product created successfully",
      product: savedProduct,
    });
  } catch (error) {
    console.error("Error creating product:", error);
    res.status(500).json({ message: error.message });
  }
};

exports.search_product = async (req, res) => {
  try {
    const search = req.query.search || "";
    const activeOnly = req.query.activeOnly === "true";
    const inactiveOnly = req.query.inactiveOnly === "true";
    const limit = parseInt(req.query.limit) || 10;

    // Build query object
    const query = {};

    // Search by name
    if (search.trim() !== "") {
      query.name = { $regex: search, $options: "i" }; // case-insensitive
    }

    // Status filter
    if (activeOnly) {
      query.status = "active";
    } else if (inactiveOnly) {
      query.status = "inactive";
    }

    // Fetch results with limit
    const products = await product_model.find(query).limit(limit);

    res.status(200).json({
      success: true,
      count: products.length,
      data: products,
    });
  } catch (error) {
    console.error("Error searching product:", error);
    res.status(500).json({ message: error.message });
  }
};

exports.product_list = async (req, res) => {
  try {
    console.log("product find", req.query);

    const skip = parseInt(req.query.skip) || 0;
    const limit = parseInt(req.query.limit) || 10;

    const activeOnly = req.query.activeOnly === "true";
    const inactiveOnly = req.query.inactiveOnly === "true";
    const category = req.query.category;

    const pipeline = [];

    // 🔹 Build match filter
    const match = {};

    if (category) {
      match.category = category;
      // or match.category = new mongoose.Types.ObjectId(category) if ObjectId
    }

    if (activeOnly && !inactiveOnly) {
      match.status = "active";
    } else if (!activeOnly && inactiveOnly) {
      match.status = "inactive";
    }
    // If both are true → no status filter
    // If both are false → also no status filter

    if (Object.keys(match).length > 0) {
      pipeline.push({ $match: match });
    }

    pipeline.push({ $skip: skip }, { $limit: limit });

    const find_product_count = await product_model.countDocuments(match);
    const data = await product_model.aggregate(pipeline);

    res.status(200).json({ success: true, data, count: find_product_count });
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ message: error.message });
  }
};

exports.product_update = async (req, res) => {
  try {
    const {
      id,
      name,
      description,
      model,
      category,
      price,
      discount_price,
      quantity,
      images,
      front_image,
      hasVariants,
      variants,
      status,
    } = req.body;

    const product = await product_model.findById(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    console.log(req.body, "0000000000000000000000");
    // ✅ Update basic fields
    if (name && name.trim() !== "") product.name = name.trim();
    if (description) product.description = description;
    if (model) product.model = model;
    if (category) product.category = category;
    product.hasVariants = hasVariants;
    product.status = status || product.status;
    product.images = images || product.images;
    product.front_image = front_image || product.front_image;

    // ✅ Price logic for non-variant products
    if (!hasVariants) {
      if (price != null) product.price = price;
      if (discount_price != null) product.discount_price = discount_price;
      if (quantity != null) product.quantity = quantity;

      if (discount_price != null && discount_price >= price) {
        return res.status(400).json({
          message: "Discount price must be less than the original price",
        });
      }
    } else {
      product.price = null;
      product.discount_price = null;
      product.quantity = null;
    }

    // ✅ Handle variant updates
    if (hasVariants && Array.isArray(variants)) {
      // Update existing & add new
      for (let v of variants) {
        if (v._id) {
          const existingVariant = product.variants.id(v._id);
          if (existingVariant) {
            if (v.name) existingVariant.name = v.name;
            if (v.price != null) existingVariant.price = v.price;
            if (v.discount_price != null)
              existingVariant.discount_price = v.discount_price;
            if (v.quantity != null) existingVariant.quantity = v.quantity;
            if (typeof v.flag === "boolean") existingVariant.flag = v.flag;

            if (v.discount_price != null && v.discount_price >= v.price) {
              return res.status(400).json({
                message: `Discount price for variant "${v.name}" must be less than its price`,
              });
            }
          }
        } else {
          if (v.discount_price != null && v.discount_price >= v.price) {
            return res.status(400).json({
              message: `Discount price for variant "${v.name}" must be less than its price`,
            });
          }
          product.variants.push({
            name: v.name,
            price: v.price,
            discount_price: v.discount_price,
            quantity: v.quantity,
            flag: true,
          });
        }
      }
    }

    if (product.hasVariants) {
      if (product.variants.length != 0) {
        const filter_out = product.variants.filter(
          (val) =>
            val.name == variants.find((value) => value.name == val.name)?.name
        );
        product.variants = filter_out;
      }
    } else {
      product.variants = [];
    }
   let image_collector = [
      req.body.image_url_1,
      req.body.image_url_2,
      req.body.image_url_3,
      req.body.image_url_4,
      req.body.image_url_5,
    ];
  product.images = image_collector
    const updatedProduct = await product.save();

    res.status(200).json({
      message: "Product updated successfully",
      product: updatedProduct,
    });
  } catch (error) {
    console.error("Error updating product:", error);
    res.status(500).json({ message: error.message });
  }
};

exports.get_product_by_id = async (req, res) => {
  try {
    console.log(req.query);
    const find_product = await product_model.findOne({ _id: req.query.id });
    res.status(200).json({ message: "product find", data: find_product });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.product_delete = async (req, res) => {
  try {
    const id = req.query.id;

    await product_model.findOneAndUpdate(
      { _id: id },
      { $set: { status: "inactive" } }
    );
    res.status(200).json({ message: "product deleted/inactive" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
exports.product_recover = async (req, res) => {
  try {
    const id = req.query.id;

    await product_model.findOneAndUpdate(
      { _id: id },
      { $set: { status: "active" } }
    );
    res.status(200).json({ message: "product recovered" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.create_category = async (req, res) => {
  try {
    const { name, status, type, parent_id, image } = req.body;

    const create_category = new category_model({
      name: name,
      slug: name,
      parent: parent_id,
      type: type,
      flag: status == "active" ? true : false,
      image: image,
    });
    const result = await create_category.save();
    res
      .status(200)
      .json({ data: result, message: "category created successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.list_category = async (req, res) => {
  try {
    console.log("product ddd");
    const categoriesWithCount = await category_model.find();

    res
      .status(200)
      .json({ message: "category fetched", data: categoriesWithCount });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
exports.category_delete = async (req, res) => {
  try {
    const _id = req.query.id;
    const having_children = await category_model.findOne({
      parent: _id,
    });

    if (having_children) {
      return res.status(400).json({ message: "please delete the children" });
    }

    await category_model.deleteOne({ _id: _id });
    res.status(200).json({ message: "deleted", data: [] });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.category_edit = async (req, res) => {
  try {
    console.log("category edit request body:", req.body);

    const { name, status, type, parent_id, image, _id } = req.body;

    // Update the category
    const updatedCategory = await category_model.findByIdAndUpdate(
      _id,
      {
        name,
        slug: name,
        parent: parent_id,
        type,
        flag: status === "active",
        image,
      },
      { new: true } // return the updated document
    );

    if (!updatedCategory) {
      return res.status(404).json({ message: "Category not found" });
    }

    res.status(200).json(updatedCategory);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.category_single = async (req, res) => {
  try {
    console.log("product delete");
    const find_category = await category_model.findOne({ _id: req.query.id });
    res.status(200).json({ message: "fetched", data: find_category });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.list_category_main = async (req, res) => {
  try {
    console.log("product ddd");
    const categoriesWithCount = await category_model.find({ type: "main" });

    res
      .status(200)
      .json({ message: "category fetched", data: categoriesWithCount });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.list_collections_main = async (req, res) => {
  try {
    console.log("product ddd");

    const typeOrder = ["main", "category", "model", "part"];

    const result = await category_model.aggregate([
      // Match starting category
      { $match: { _id: new mongoose.Types.ObjectId(req.query.id) } },

      // Get all descendants
      {
        $graphLookup: {
          from: "categories",
          startWith: "$_id",
          connectFromField: "_id",
          connectToField: "parent",
          as: "descendants",
        },
      },
    ]);

    if (!result.length) {
      return res.status(404).json({ message: "Parent category not found" });
    }

    // Combine root + descendants
    const allItems = [result[0], ...result[0].descendants].map((item) => ({
      _id: String(item._id),
      name: item.name,
      type: item.type,
      parent: item.parent ? String(item.parent) : null,
    }));

    // Recursive function to build tree
    const buildTree = (parentId) => {
      return allItems
        .filter((item) => item.parent === parentId)
        .sort((a, b) => typeOrder.indexOf(a.type) - typeOrder.indexOf(b.type))
        .map((item) => ({
          ...item,
          children: buildTree(item._id),
        }));
    };

    // Build tree starting from the given parent category
    const data = buildTree(String(result[0]._id));

    res.status(200).json({ message: "Category fetched", data });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

const { faker } = require("@faker-js/faker");

exports.product_dummy_insert = async (req, res) => {
  try {
    const count = parseInt(req.query.count) || 1; // default 1 if not given
    const products = [];

    for (let i = 0; i < count; i++) {
      const hasVariants = faker.datatype.boolean();

      const variants = hasVariants
        ? Array.from({ length: faker.number.int({ min: 2, max: 5 }) }, () => ({
            name: faker.commerce.productAdjective(),
            price: faker.commerce.price({ min: 10, max: 500 }),
            quantity: faker.number.int({ min: 1, max: 100 }),
          }))
        : [];

      const product = new product_model({
        name: faker.commerce.productName(),
        description: faker.commerce.productDescription(),
        category: null,
        price: hasVariants
          ? undefined
          : faker.commerce.price({ min: 10, max: 500 }),
        discount_price: hasVariants
          ? undefined
          : faker.commerce.price({ min: 5, max: 300 }),
        quantity: hasVariants
          ? undefined
          : faker.number.int({ min: 1, max: 200 }),
        images: [faker.image.urlLoremFlickr({ category: "product" })],
        front_image: faker.image.urlLoremFlickr({ category: "product" }),
        hasVariants,
        variants,
        status: faker.helpers.arrayElement(["active", "inactive"]),
      });

      products.push(product);
    }

    await product_model.insertMany(products);

    res.status(201).json({
      message: `${count} dummy product(s) created`,
      products,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};
