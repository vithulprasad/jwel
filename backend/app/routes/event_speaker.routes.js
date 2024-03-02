module.exports = (app) => {
  const eventSpeaker = require("../controllers/event_speaker_controller");
  var router = require("express").Router();
  router.post("/create_event_speakers", eventSpeaker.create);
  app.use("/api", router);
};
