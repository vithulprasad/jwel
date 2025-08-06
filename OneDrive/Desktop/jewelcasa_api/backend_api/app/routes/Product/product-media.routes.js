module.exports = app => {
  const productmedia = require("../../controllers/Product/product-media.controller.js");

  var router = require("express").Router();

  // Create a new Page
  router.post("/add_product_media", productmedia.create);

  // Retrieve all Pages
  router.get("/list_products_media", productmedia.findAll);

  router.get("/all_products_media_pid/:id", productmedia.findAllWithPID);

  router.get("/products_media_with_pid/:id", productmedia.findOneWithPID);

  // Retrieve a single Page with id
  router.get("/product_media/:id", productmedia.findOne);

  // Update a Page with id
  router.post("/edit_product_media", productmedia.update);

  // // Delete a Tutorial with id
  // router.delete("/:id", tutorials.delete);


  app.use('/api', router);
};
