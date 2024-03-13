const db = require("../models");
const Schools = db.schools;

exports.create = async (req, res) => {
  try {
    const {
      school_name,
      school_type,
      school_address,
      school_number,
      principal_name,
      principal_email,
      principal_phone_number,
      vice_name,
      vice_email,
      vice_phone_number,
    } = req.body;

    // Create a new school record
    const newSchool = await Schools.create({
      school_name,
      school_type,
      school_address,
      school_number,
      principal_name,
      principal_email,
      principal_phone_number,
      vice_name,
      vice_email,
      vice_phone_number,
    });

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

// Function to get school by ID
exports.getSchoolById = async (req, res) => {
  try {
    const id = req.params.id;

    // Find the school by ID
    const school = await Schools.findByPk(id);

    if (!school) {
      return res.status(404).json({
        message: "School not found",
        statusCode: 404,
      });
    }
    res.status(200).json({
      data: school,
      message: "Success",
      statusCode: 200,
    });
  } catch (error) {
    console.error("Error fetching school by ID:", error);
    return res.status(500).json({
      message: "Internal Server Error",
      statusCode: 500,
    });
  }
};

exports.updateSchool = async (req, res) => {
  try {
    const {
      schoolName,
      schoolType,
      schoolAddress,
      schoolPhone,
      principalName,
      principalEmail,
      principalPhone,
      viceName,
      viceEmail,
      vicePhone,
    } = req.body;

    const id = req.params.id;
    console.log(req.body,"1111")

    // Find the school by ID
    const school = await Schools.findByPk(id);

    if (!school) {
      return res
        .status(404)
        .json({ message: "School not found", statusCode: 404 });
    }

    // Update the school record
    await school.update({
      school_name:schoolName,
      school_type:schoolType,
      school_address:schoolAddress,
      school_number:schoolPhone,
      principal_name:principalName,
      principal_email:principalEmail,
      principal_phone_number:principalPhone,
      vice_name:viceName,
      vice_email:viceEmail,
      vice_phone_number:vicePhone,
    });

    // Respond with a success message and the updated school data
    res.json({ message: "School updated successfully", school });
    console.log(school,"updated shcool from controller")
  } catch (error) {
    console.error("Error updating school:", error);
    return res.status(500).json({
      message: "Something went wrong",
      statusCode: 500,
    });
  }
};
