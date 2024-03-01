const db = require("../models");
const EventSchool = db.event_schools;
exports.create = async (req, res) => {
  try {
    const { event_id, school_id } = req.body;
    console.log(event_id,school_id,"evnet id ans school id on controller")

    // Check if event_id and school_id are provided
    if (!event_id || !school_id) {
      return res
        .status(400)
        .send({ message: "Event ID and school ID are required." });
    }

    // Create event_school record
    const eventSchool = await EventSchool.create({
      event_id: event_id,
      school_id: school_id,
    });

    res.status(201).send(eventSchool);
  } catch (error) {
    console.error("Error creating event_school:", error);
    res.status(500).send({ message: "Error creating event_school record." });
  }
};
