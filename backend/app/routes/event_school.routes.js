module.exports = (app) => {
  const eventSchool = require("../controllers/event_school_controller");
  var router = require("express").Router();
  router.post("/create_event_school", eventSchool.create);

  app.use("/api", router);
};
