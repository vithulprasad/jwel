module.exports = app => {
  const product = require("../../controllers/Product/product.controller.js");

  var router = require("express").Router();

  // Create a new Page
  router.post("/add_product", product.create);

  // Retrieve all Pages
  router.get("/list_products", product.findAll);

  // Retrieve a single Page with id
  router.get("/product/:id", product.findOne);

  // Update a Page with id
  router.post("/edit_product", product.update);

  // // Delete a Tutorial with id
  router.delete("/:id", product.delete);


  app.use('/api', router);
};
