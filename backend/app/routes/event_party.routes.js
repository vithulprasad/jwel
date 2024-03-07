module.exports = (app) => {
  const eventParty = require("../controllers/event_party_controller");
  var router = require("express").Router();
  router.post("/create_event_party", eventParty.createEventParty);
  router.get("/get_all_party", eventParty.getAllEventParties);
  router.get("/get_all_party_eventsId/:id",eventParty.getEventPartiesByEventId)
  app.use("/api", router);
};
