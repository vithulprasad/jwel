const db = require("../models");
const EventMentor = db.event_mentors;

exports.create = async (req, res) => {
  try {
    const { event_id, mentor_id } = req.body;

    // Check if event_id and mentor_id are provided
    if (!event_id || !mentor_id) {
      return res
        .status(400)
        .send({ message: "Event ID and mentor ID are required." });
    }

    // Create event_mentor record
    const eventMentor = await EventMentor.create({
      event_id: event_id,
      mentor_id: mentor_id,
    });

    res.status(201).send(eventMentor);
  } catch (error) {
    console.error("Error creating event_mentor:", error);
    res.status(500).send({ message: "Error creating event_mentor record." });
  }
};
