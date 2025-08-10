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
        return res
          .status(400)
          .json({
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

    // ✅ Create product document
    const product = new product_model({
      name,
      description,
      category,
      price: hasVariants ? undefined : price,
      discount_price: hasVariants ? undefined : discount_price,
      quantity: hasVariants ? undefined : quantity,
      images: images || [],
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

exports.product_list = async (req, res) => {
  try {
    console.log("product list");
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.product_delete = async (req, res) => {
  try {
    console.log(req.body);
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
exports.product_update = async (req, res) => {
  try {
    console.log("product update");
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
exports.product_single_view = async (req, res) => {
  try {
    console.log("product update");
    res.status(200).json(data);
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
