module.exports = (app) => {
  const schools = require("../controllers/school.controller");
  const Users = require("../controllers/student.controller");

  var router = require("express").Router();

  // create role
  router.post("/create_school", schools.create);
  router.get("/get_all_schools", schools.getAllSchools);
  router.get("/get_school_byId/:id", schools.getSchoolById);
  router.put("/update_school_byId/:id", schools.updateSchool);

  router.get("/get_users/:id", Users.getUserBySchoolId);

  app.use("/api", router);
};
