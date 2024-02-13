const db = require("../models");
const Schools = db.schools;

exports.create = async (req, res) => {
  try {
    const {
      school_name,
      school_type,
      school_address,
      school_phone_number,
      principal_name,
      principal_email,
      principal_phone_number,
    } = req.body;

    // Create a new school record
    const newSchool = await Schools.create({
      school_name,
      school_type,
      school_address,
      school_phone_number,
      principal_name,
      principal_email,
      principal_phone_number,
    });

    console.log(newSchool, "new school >>>>>>>");

    // Respond with a success message and the created school data
    res
      .status(201)
      .json({ message: "School created successfully", school: newSchool });
  } catch (error) {
    console.log("Error in creating Schools", error);
    return res.status(500).json({
      message: "Something went wrong",
      statusCode: 500,
    });
  }
};
exports.getAllSchools = async (req, res) => {
  try {
    const schools = await Schools.findAll();

    if (!schools || schools.length === 0) {
      return res.json({
        data: [],
        message: "No schools found",
        statusCode: 200,
      });
    }

    return res.json({
      data: schools,
      message: "Success",
      statusCode: 200,
    });
  } catch (error) {
    console.error("Error in fetching students:", error);
    return res.status(500).json({
      message: "Internal Server Error",
      statusCode: 500,
    });
  }
};

exports.findOne = async (req, res) => {
  try {
  } catch (error) {
    console.log("Error in finding One School", error);
    return res.status(500).json({
      message: "Something went wrong",
      statusCode: 500,
    });
  }
};
