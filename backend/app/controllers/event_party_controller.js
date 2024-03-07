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
// Controller function to get all event parties
exports.getAllEventParties = async (req, res) => {
  try {
    const eventParties = await EventParty.findAll();

    if (!eventParties || eventParties.length === 0) {
      return res.json({
        data: [],
        message: "No event parties found",
        statusCode: 200,
      });
    }

    return res.json({
      data: eventParties,
      message: "Success",
      statusCode: 200,
    });
  } catch (error) {
    console.error("Error in fetching event parties:", error);
    return res.status(500).json({
      message: "Internal Server Error",
      statusCode: 500,
    });
  }
};

exports.getEventPartiesByEventId = async (req, res) => {
  const id = req.params.id;

  try {
    const eventParties = await EventParty.findAll({
      where: { event_id: id },
    });

    if (!eventParties || eventParties.length === 0) {
      return res.json({
        data: [],
        message: "No event parties found for the given event ID",
        statusCode: 200,
      });
    }

    return res.json({
      data: eventParties,
      message: "Success",
      statusCode: 200,
    });
  } catch (error) {
    console.error("Error in fetching event parties:", error);
    return res.status(500).json({
      message: "Internal Server Error",
      statusCode: 500,
    });
  }
};
