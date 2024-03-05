const db = require("../models");
const EventParty = db.event_parties;
exports.createEventParty = async (req, res) => {
  try {
    const { event_id, event_party_name, event_party_tagline } = req.body;
    const newEventParty = await EventParty.create({
      event_id,
      event_party_name,
      event_party_tagline,
    });
    res.status(201).json(newEventParty);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
