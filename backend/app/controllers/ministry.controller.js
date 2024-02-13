const db = require("../models");
const Ministry = db.ministry;
exports.create = async (req, res) => {
  try {
    const { ministry_name } = req.body;
    const newMinistry = await Ministry.create({
      ministry_name: ministry_name,
    });
    res.status(201).json({
      message: "Ministry created successfully",
      ministry: newMinistry,
    });
  } catch (error) {
    console.log("Error in creating Schools", error);
    return res.status(500).json({
      message: "Something went wrong",
      statusCode: 500,
    });
  }
};

exports.getAllMinstry = async (req, res) => {
  try {
    const ministry = await Ministry.findAll();

    if (!ministry || ministry.length === 0) {
      return res.json({
        data: [],
        message: "No Ministry found",
        statusCode: 200,
      });
    }

    return res.json({
      data: ministry,
      message: "Success",
      statusCode: 200,
    });
  } catch (error) {
    console.error("Error in fetching Ministry:", error);
    return res.status(500).json({
      message: "Internal Server Error",
      statusCode: 500,
    });
  }
};
exports.findOne = async (req, res) => {
  try {
  } catch (error) {}
};
