module.exports = app => {
  const productmaterialtype = require("../../controllers/Product-Type/product-material-type.controller.js");

  var router = require("express").Router();

  // Create a new productmaterialtype
  router.post("/add_material_type", productmaterialtype.create);

  // Retrieve all productmaterialtype
  router.get("/list_material_type", productmaterialtype.findAll);

 
  // Retrieve a single productmaterialtype with id
  router.get("/material_type/:id", productmaterialtype.findOne);

  // Update a productmaterialtype with id
  router.post("/edit_material_type", productmaterialtype.update);

  // // Delete a productmaterialtype with id
  router.delete("/:id", productmaterialtype.delete);


  app.use('/api', router);
};
