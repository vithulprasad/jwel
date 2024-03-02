module.exports = (app) => {
  const speaker = require("../controllers/speaker.controller");

  var router = require("express").Router();

  // create role
  router.post("/create_speaker", speaker.createSpeakers);
  router.get("/get_all_speakers", speaker.getAllSpeakers);

  app.use("/api", router);
};
