const db = require("../models");
const EventParticipant = db.event_particapants;

exports.createDummyEventParticipants = async (req, res) => {
  try {
    // Dummy data for event participants
    const eventParticipantsData = [
      {
        event_id: 1,
        user_id: 1,
        status: "accepted",
      },
      {
        event_id: 1,
        user_id: 2,
        status: "accepted",
      },
      {
        event_id: 1,
        user_id: 3,
        status: "accepted",
      },
      {
        event_id: 1,
        user_id: 3,
        status: "applied",
      },
      {
        event_id: 3,
        user_id: 3,
        status: "rejected",
      },
    ];

    const createdEventParticipants = await EventParticipant.bulkCreate(
      eventParticipantsData
    );

    return res.status(200).json({
      message: "Event participants created successfully",
      eventParticipants: createdEventParticipants,
    });
  } catch (error) {
    console.error("Error creating event participants:", error.message);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// Controller function to get all event participants
exports.getAllEventParticipants = async (req, res) => {
  try {
    const eventParticipants = await EventParticipant.findAll();

    if (!eventParticipants || eventParticipants.length === 0) {
      return res.json({
        data: [],
        message: "No event participants found",
        statusCode: 200,
      });
    }

    return res.json({
      data: eventParticipants,
      message: "Success",
      statusCode: 200,
    });
  } catch (error) {
    // If an error occurs, return error response
    console.error("Error in fetching event participants:", error);
    return res.status(500).json({
      message: "Internal Server Error",
      statusCode: 500,
    });
  }
};

// Controller function to get a single event participant by ID
exports.getOneEventParticipant = async (req, res) => {
  try {
    const eventId = req.params.id;

    const eventParticipant = await EventParticipant.findByPk(eventId);

    if (!eventParticipant) {
      return res.status(404).json({ message: "Event participant not found" });
    }

    return res.status(200).json({
      message: "Event participant found",
      eventParticipant: eventParticipant,
    });
  } catch (error) {
    console.error("Error in fetching event participant:", error);
    return res.status(500).json({
      message: "Internal Server Error",
      statusCode: 500,
    });
  }
};
