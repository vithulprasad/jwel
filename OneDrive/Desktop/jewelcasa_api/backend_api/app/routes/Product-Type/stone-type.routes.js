module.exports = app => {
  const stonetype = require("../../controllers/Product-Type/stone-type.controller.js");

  var router = require("express").Router();

  // Create a new stonetype
  router.post("/add_stone_type", stonetype.create);

  // Retrieve all stonetype
  router.get("/list_stone_type", stonetype.findAll);

  // Retrieve a single stonetype with id
  router.get("/stone_type/:id", stonetype.findOne);

  // Update a stonetype with id
  router.post("/edit_stone_type", stonetype.update);

  // // Delete a stonetype with id
  router.delete("/:id", stonetype.delete);


  app.use('/api', router);
};
