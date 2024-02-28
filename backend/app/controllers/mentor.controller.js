// Import the Mentor model
const db = require("../models");
const Mentor = db.mentor;

// Controller function to create dummy data for multiple mentors
exports.createMentors = async (req, res) => {
  try {
    // Dummy data for mentors (you can replace this with req.body data)
    const mentorsData = [
      {
        mentor_name: "Mentor 1",
        mentor_email: "mentor1@example.com",
        mentor_password: "password1",
      },
      {
        mentor_name: "Mentor 2",
        mentor_email: "mentor2@example.com",
        mentor_password: "password2",
      },
      {
        mentor_name: "Mentor 3",
        mentor_email: "mentor3@example.com",
        mentor_password: "password3",
      },
      // Add more mentors as needed
    ];

    // Create mentors in the database
    const createdMentors = await Mentor.bulkCreate(mentorsData);

    // Return success response with created mentors
    return res.status(200).json({
      message: "Mentors created successfully",
      mentors: createdMentors,
    });
  } catch (error) {
    // If an error occurs, return error response
    console.error("Error creating mentors:", error.message);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// Controller function to get all mentors
exports.getAllMentors = async (req, res) => {
  try {
    // Find all mentors in the database
    const mentors = await Mentor.findAll();

    // If no mentors are found, return empty array
    if (!mentors || mentors.length === 0) {
      return res.json({
        data: [],
        message: "No mentors found",
        statusCode: 200,
      });
    }

    // Return success response with all mentors
    return res.json({
      data: mentors,
      message: "Success",
      statusCode: 200,
    });
  } catch (error) {
    // If an error occurs, return error response
    console.error("Error in fetching mentors:", error);
    return res.status(500).json({
      message: "Internal Server Error",
      statusCode: 500,
    });
  }
};
