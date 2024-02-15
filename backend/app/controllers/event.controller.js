const db = require("../models");
const Events = db.events;

exports.create = async (req, res) => {
  try {
    const {
      eventName,
      eventStartDate,
      eventCoverImage,
      eventType,
      eventDescription,
      eventMethod,
      eventVenue,
      eventOrientationDate,
      eventAgeRestriction,
      eventEndDate,
      eventStartTime,
      eventEndTime,
    } = req.body;
    const formattedStartTime = `${eventStartTime.hours}:${eventStartTime.minutes}:${eventStartTime.seconds}`;
    const formattedEndTime = `${eventEndTime.hours}:${eventEndTime.minutes}:${eventEndTime.seconds}`;
    console.log(formattedEndTime, formattedStartTime, "zzzzz");
    const newEvent = await Events.create({
      event_name: eventName,
      event_start_date: eventStartDate,
      event_end_date: eventEndDate,
      event_cover_image: eventCoverImage,
      event_type: eventType,
      event_description: eventDescription,
      event_method: eventMethod,
      event_venue: eventVenue,
      event_orientation_date: eventOrientationDate,
      event_age_restriction: eventAgeRestriction,
      event_end_time: formattedEndTime,
      event_start_time: formattedStartTime,
      created_at: new Date(),
      updated_at: new Date(),
    });
    console.log(newEvent,"new eeeeeeeeeeevene")

    return res.status(201).json({
      data: newEvent,
      message: "Event created successfully.",
      statusCode: 201,
    });
  } catch (error) {
    console.error("Error creating event:", error);
    return res.status(500).json({
      message: "Something went wrong",
      statusCode: 500,
    });
  }
};

exports.getAllEvents = async (req, res) => {
  try {
    const allEvents = await Events.findAll();

    if (allEvents.length) {
      return res.json({
        data: allEvents,
        message: "scucess",
        statusCode: 200,
      });
    } else {
      return res.send({
        data: [],
        statusCode: 400,
        message: "Some error occurred while retrieving event details.",
      });
    }
  } catch (error) {
    console.error("Error retrieving events:", error);

    return res.status(500).json({
      message: "Internal Server Error",
      statusCode: 500,
    });
  }
};

exports.findOne = async (req, res) => {
  const id = req.params.id;
  try {
    const event = await Events.findByPk(id);

    if (event) {
      return res.json({
        data: event,
        message: "Successfully get permission.",
        statusCode: 200,
      });
    }
    return res.json({
      message: "Failed get permission details.",
      statusCode: 400,
    });
  } catch (error) {
    console.log(error);
    return res.json({
      message: "Something went wrong",
      statusCode: 400,
    });
  }
};
