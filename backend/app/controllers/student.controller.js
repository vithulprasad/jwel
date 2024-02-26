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
      school_id,
      school_address,
    } = req.body;
    const newStudent = await Students.create({
      student_type,
      student_name,
      email_address,
      phone_number,
      parents_phone_number,
      school_id,
      school_address,
      student_status: "active",
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

exports.updateUserStatus = async (req, res) => {
  const { id } = req.params;
  const { userStatus } = req.body;
  console.log(id, "00000000000");

  try {
    // Update user status in the database
    await Students.update(
      { student_status: userStatus },
      { where: { student_id: id } }
    );

    res.status(200).json({ message: "User status updated successfully" });
  } catch (error) {
    console.error("Error updating user status:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.getUserBySchoolId = async (req, res) => {
  const { id } = req.params;
  try {
    const users = await Students.findAll({ where: { school_id: id } });
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
