const db = require("../models");
const Speaker = db.speaker;
// Controller function to create dummy data for multiple speakers
exports.createSpeakers = async (req, res) => {
  try {
    // Dummy data for speakers (you can replace this with req.body data)
    const speakersData = [
      {
        speaker_name: "Speaker 1",
        speaker_email: "speaker1@example.com",
        speaker_password: "password1",
      },
      {
        speaker_name: "Speaker 2",
        speaker_email: "speaker2@example.com",
        speaker_password: "password2",
      },
      {
        speaker_name: "Speaker 3",
        speaker_email: "speaker3@example.com",
        speaker_password: "password3",
      },
    ];

    // Create speakers in the database
    const createdSpeakers = await Speaker.bulkCreate(speakersData);

    // Return success response with created speakers
    return res.status(200).json({
      message: "Speakers created successfully",
      speakers: createdSpeakers,
    });
  } catch (error) {
    // If an error occurs, return error response
    console.error("Error creating speakers:", error.message);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// Controller function to get all speakers
exports.getAllSpeakers = async (req, res) => {
  try {
    // Find all speakers in the database
    const speakers = await Speaker.findAll();

    // If no speakers are found, return empty array
    if (!speakers || speakers.length === 0) {
      return res.json({
        data: [],
        message: "No speakers found",
        statusCode: 200,
      });
    }

    // Return success response with all speakers
    return res.json({
      data: speakers,
      message: "Success",
      statusCode: 200,
    });
  } catch (error) {
    // If an error occurs, return error response
    console.error("Error in fetching speakers:", error);
    return res.status(500).json({
      message: "Internal Server Error",
      statusCode: 500,
    });
  }
};
