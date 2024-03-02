const db = require("../models");
const EventMinistry = db.event_ministries;

exports.create = async (req, res) => {
  try {
    const { event_id, ministry_id } = req.body;

    // Check if event_id and ministry_id are provided
    if (!event_id || !ministry_id) {
      return res
        .status(400)
        .send({ message: "Event ID and ministry ID are required." });
    }

    // Create event_ministry record
    const eventMinistry = await EventMinistry.create({
      event_id: event_id,
      ministry_id: ministry_id,
    });

    res.status(201).send(eventMinistry);
  } catch (error) {
    console.error("Error creating event_ministry:", error);
    res.status(500).send({ message: "Error creating event_ministry record." });
  }
};
