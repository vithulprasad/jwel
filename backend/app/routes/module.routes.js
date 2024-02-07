module.exports = (app) => {
  const modules = require("../controllers/module.controller");

  var router = require("express").Router();

  // create role
  router.post("/create_module", modules.create);
  router.get("/get_modules", modules.findAll);
  router.get("/get_module/:id", modules.findOne);
  router.post("/edit_module", modules.update);
  router.delete("/delete_module/:id", modules.delete);

  app.use("/api", router);
};
