module.exports = (app) => {
  const eventMentor = require("../controllers/event_mentor_controller");
  var router = require("express").Router();
  router.post("/create_event_mentor", eventMentor.create);
  app.use("/api", router);
};
