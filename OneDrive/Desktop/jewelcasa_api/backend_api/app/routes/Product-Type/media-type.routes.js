module.exports = app => {
  const mediatype = require("../../controllers/Product-Type/media-type.controller.js");

  var router = require("express").Router();

  // Create a new mediatype
  router.post("/add_media_type", mediatype.create);

  // Retrieve all mediatype
  router.get("/list_media_type", mediatype.findAll);

  // Retrieve a single mediatype with id
  router.get("/media_type/:id", mediatype.findOne);

  // Update a mediatype with id
  router.post("/edit_media_type", mediatype.update);

  // // Delete a mediatype with id
  router.delete("/:id", mediatype.delete);


  app.use('/api', router);
};
