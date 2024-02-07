module.exports = (app) => {
  const events = require("../controllers/event.controller");

  var router = require("express").Router();

  // create role
  router.post("/create_event", events.create);
  router.get("/get_all_events", events.getAllEvents);
  router.get("/get_event/:id", events.findOne);

  app.use("/api", router);
};
