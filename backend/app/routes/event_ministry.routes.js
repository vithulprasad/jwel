module.exports = (app) => {
  const eventMinistry = require("../controllers/event_ministry_controller");
  var router = require("express").Router();
  router.post("/create_event_ministries", eventMinistry.create);
  app.use("/api", router);
};
