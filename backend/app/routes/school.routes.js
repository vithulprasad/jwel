module.exports = (app) => {
  const schools = require("../controllers/school.controller");

  var router = require("express").Router();

  // create role
  router.post("/create_school", schools.create);
  router.get("/get_all_schools", schools.getAllSchools);
  router.get("/get_schools/:id", schools.findOne);

  app.use("/api", router);
};
