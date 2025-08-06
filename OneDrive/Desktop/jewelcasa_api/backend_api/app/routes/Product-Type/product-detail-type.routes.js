module.exports = app => {
  const productdetailtype = require("../../controllers/Product-Type/product-detail-type.controller.js");

  var router = require("express").Router();

  // Create a new productdetailtype
  router.post("/add_detail_type", productdetailtype.create);

  // Retrieve all productdetailtype
  router.get("/list_detail_type", productdetailtype.findAll);

  // Retrieve a single productdetailtype with id
  router.get("/detail_type/:id", productdetailtype.findOne);

  // Update a productdetailtype with id
  router.post("/edit_detail_type", productdetailtype.update);

  // // Delete a productdetailtype with id
  router.delete("/:id", productdetailtype.delete);


  app.use('/api', router);
};
