module.exports = (app) => {
  const mentor = require("../controllers/mentor.controller");
  var router = require("express").Router();

  router.post("/create_mentor", mentor.createMentors);
  router.get("/get_all_mentors", mentor.getAllMentors);
  app.use("/api", router);
};
