module.exports = (app) => {
  const ministry = require("../controllers/ministry.controller");

  var router = require("express").Router();

  // create role
  router.post("/create_ministry", ministry.create);
  router.get("/get_all_ministry", ministry.getAllMinstry);
  router.get("/get_ministry/:id", ministry.findOne);

  app.use("/api", router);
};
