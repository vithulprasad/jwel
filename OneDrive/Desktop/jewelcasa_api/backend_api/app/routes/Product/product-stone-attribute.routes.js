module.exports = app => {
  const productstoneattribute = require("../../controllers/Product/product-stone-attribute.controller.js");

  var router = require("express").Router();

  // Create a new Page
  router.post("/add_product_stone", productstoneattribute.create);

  // Retrieve all Pages
  router.get("/list_products_stone", productstoneattribute.findAll);

  // Retrieve a single Page with id
  router.get("/product_stone/:id", productstoneattribute.findOne);

  // Update a Page with id
  router.post("/edit_product_stone", productstoneattribute.update);

  // // Delete a Tutorial with id
  // router.delete("/:id", tutorials.delete);


  app.use('/api', router);
};
