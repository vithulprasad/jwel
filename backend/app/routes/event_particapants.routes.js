module.exports = (app) => {
  const eventParticipant = require("../controllers/event_particapant_controller");
  var router = require("express").Router();
  router.post(
    "/create_event_particapants",
    eventParticipant.createDummyEventParticipants
  );
  router.get(
    "/get_all_eventParticapants",
    eventParticipant.getAllEventParticipants
  );
  router.get(
    "/get_eventPartticapants_by_eventId/:id",
    eventParticipant.getEventParticipantsByEventId
  );
  app.use("/api", router);
};
