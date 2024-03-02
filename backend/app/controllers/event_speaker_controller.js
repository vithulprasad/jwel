const db = require("../models");
const EventSpeaker = db.event_speakers;

exports.create = async (req, res) => {
  try {
    const { event_id, speaker_id } = req.body;

    // Check if event_id and speaker_id are provided
    if (!event_id || !speaker_id) {
      return res
        .status(400)
        .send({ message: "Event ID and speaker ID are required." });
    }

    // Create event_speaker record
    const eventSpeaker = await EventSpeaker.create({
      event_id: event_id,
      speaker_id: speaker_id,
    });

    res.status(201).send(eventSpeaker);
  } catch (error) {
    console.error("Error creating event_speaker:", error);
    res.status(500).send({ message: "Error creating event_speaker record." });
  }
};
