module.exports = (app) => {
  const eventParty = require("../controllers/event_party_controller");
  var router = require("express").Router();
  router.post("/create_event_party", eventParty.createEventParty);
  app.use("/api", router);
};
