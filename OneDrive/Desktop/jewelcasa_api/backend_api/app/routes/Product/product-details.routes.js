module.exports = app => {
  const productdetails = require("../../controllers/Product/product-details.controller.js");

  var router = require("express").Router();

  // Create a new Page
  router.post("/add_product_details", productdetails.create);

  // Retrieve all Pages
  router.get("/list_product_details", productdetails.findAll);
 
  // Retrieve all Pages
 router.get("/list_product_details_with_pid", productdetails.findAllWithPId);


  // Retrieve a single Page with id
  router.get("/product_detail/:id", productdetails.findOne);

  // Update a Page with id
  router.post("/edit_product_details", productdetails.update);

  // // Delete a Tutorial with id
  // router.delete("/:id", tutorials.delete);

  
  app.use('/api', router);
};
