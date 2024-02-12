const db = require("../models");
const Students = db.students;
exports.create = async (req, res) => {
  try {
    const {
      student_type,
      student_name,
      email_address,
      phone_number,
      parents_phone_number,
      school,
      school_address,
    } = req.body;
    const newStudent = await Students.create({
      student_type,
      student_name,
      email_address,
      phone_number,
      parents_phone_number,
      school,
      school_address,
    });
    console.log(newStudent, "new student >>>>>>>");
    res
      .status(201)
      .json({ message: "Form submitted successfully", student: newStudent });
  } catch (error) {
    console.log("Error in creating Student", error);
    return res.status(500).json({
      message: "Something went wrong",
      statusCode: 500,
    });
  }
};

exports.getAllStudent = async (req, res) => {
  try {
    const users = await Students.findAll();

    if (!users || users.length === 0) {
      return res.json({
        data: [],
        message: "No users found",
        statusCode: 200,
      });
    }

    return res.json({
      data: users,
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
    console.log("Error in creating Studern", error);
    return res.status(500).json({
      message: "Something went wrong",
      statusCode: 500,
    });
  }
};
