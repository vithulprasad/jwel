const category_model = require("../models/Category_model");
const product_model = require("../models/Product_model");
const banner_model = require("../models/Banner_model.js");
const home_page_model = require("../models/HomePage_model.js");
const products_list_model = require("../models/products_list_model.js");

// ====================== SEARCH BANNER ======================
exports.search_banner = async (req, res) => {
  try {
    const search = req.query.search;

    if (!search || !search.trim()) {
      return res
        .status(200)
        .json({ message: "No search term provided", data: [] });
    }

    const find_banner = await banner_model
      .find({ heading: { $regex: search.trim(), $options: "i" } })
      .limit(5)
      .select("_id heading image");

    res
      .status(200)
      .json({ message: "Fetched successfully", data: find_banner });
  } catch (error) {
    console.error("Error searching banner:", error);
    res.status(500).json({ message: error.message });
  }
};

// ====================== SEARCH PRODUCT ======================
exports.search_product = async (req, res) => {
  try {
    const search = req.query.search;

    if (!search || !search.trim()) {
      return res
        .status(200)
        .json({ message: "No search term provided", data: [] });
    }

    const find_product = await product_model
      .find({ name: { $regex: search.trim(), $options: "i" } })
      .limit(5)
      .select("_id name front_image");

    res
      .status(200)
      .json({ message: "Fetched successfully", data: find_product });
  } catch (error) {
    console.error("Error searching product:", error);
    res.status(500).json({ message: error.message });
  }
};

// ====================== SEARCH CATEGORY ======================
exports.search_category = async (req, res) => {
  try {
    const search = req.query.search;

    if (!search || !search.trim()) {
      return res
        .status(200)
        .json({ message: "No search term provided", data: [] });
    }
    const regexSearch = search.trim().split(/\s+/).join(".*");
    const find_category = await category_model
      .find({ path: { $regex: regexSearch, $options: "i" } })
      .limit(5)
      .select("_id path");

    res
      .status(200)
      .json({ message: "Fetched successfully", data: find_category });
  } catch (error) {
    console.error("Error searching category:", error);
    res.status(500).json({ message: error.message });
  }
};

exports.create_home_settings = async (req, res) => {
  try {
    const {
      banners,
      featuredCategories,
      trendingProducts,
      newArrivals,
      flashDeals,
      end_time,
    } = req.body;

    // ✅ transform incoming data to match schema
    const payload = {
      banners: banners?.map((b) => ({ BannerId: b._id })),
      featuredCategories: featuredCategories?.map((c) => ({
        categoryId: c._id,
        image: c.image || null,
      })),
      trendingProducts: trendingProducts?.map((p) => ({
        productId: p._id,
      })),
      newArrivals: newArrivals?.map((p) => ({
        productId: p._id,
      })),
      flashDeals: {
        end_time,
        products: flashDeals?.map((p) => ({
          productId: p._id,
          discount: p.discount || 0,
        })),
      },
    };

    const homePage = await home_page_model.findOneAndUpdate({}, payload, {
      new: true,
      upsert: true,
      setDefaultsOnInsert: true,
    });

    res.status(200).json({
      success: true,
      message: "HomePage settings saved successfully",
      data: homePage,
    });
  } catch (error) {
    console.error("Error creating home settings:", error);
    res.status(500).json({ message: error.message });
  }
};

exports.create_collection_section = async (req, res) => {
  try {
    const { name, image, category } = req.body;

    if (!name || !category?.length) {
      return res
        .status(400)
        .json({ message: "Name and category are required" });
    }

    const payload = {
      collection: name,
      image,
      category_id: category[0]._id,
    };

    const section = await products_list_model.create(payload);

    res.status(201).json({
      success: true,
      message: "Collection section created successfully",
      data: section,
    });
  } catch (error) {
    console.error("Error creating collection section:", error);
    res.status(500).json({ message: error.message });
  }
};

exports.get_collection_section = async (req, res) => {
  try {
  } catch (error) {
    console.error("Error creating product:", error);
    res.status(500).json({ message: error.message });
  }
};
exports.get_home_section = async (req, res) => {
  try {
    const find_all = await home_page_model.find()
    .populate({
        path: "banners.BannerId",
        select: "_id heading image", // keep only required fields
      })
      .populate({
        path: "featuredCategories.categoryId",
        select: "_id name path image", // category details
      })
      .populate({
        path: "trendingProducts.productId",
        select: "_id name front_image", // product details
      })
      .populate({
        path: "newArrivals.productId",
        select: "_id name front_image", // product details
      })
      .populate({
        path: "flashDeals.products.productId",
        select: "_id name front_image", // product details
      });

    if (!find_all) {
      return res.status(404).json({ message: "Home section not found" });
    }
    console.log(find_all)
    res.status(200).json({
      success: true,
      data: find_all[0],
    });
  } catch (error) {
    console.error("Error creating product:", error);
    res.status(500).json({ message: error.message });
  }
};
