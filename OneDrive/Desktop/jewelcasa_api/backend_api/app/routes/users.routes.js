const { authentication } = require("../verification/authenticate.js");

module.exports = (app) => {
  const users = require("../controllers/users.controller.js");

  var router = require("express").Router();

  // register
  router.post("/register", users.register);

  // login
  router.post("/login", users.login);

  // Retrieve all users
  router.get("/getUsers", authentication, users.findAll);

  // Retrieve a single user
  router.get("/getUser/:id", authentication, users.findOne);

  // logout
  router.get("/logout", users.logout);

  // Update a user with id
  router.post("/editUser", authentication, users.update);

  // Retrieve all user with status
  router.get("/getUsersWithStatus", authentication, users.findAllWithStatus);

  //Inactive a user
  router.get("/inActiveUser/:id", authentication, users.updateStatus);

  // // Delete a user with id
  router.delete("/delete_user/:id", authentication, users.delete);

  app.use("/api", router);
};
