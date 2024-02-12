module.exports = (app) => {
    const students = require("../controllers/student.controller");
  
    var router = require("express").Router();
  
    // create role
    router.post("/create_student", students.create);
    router.get("/get_all_students", students.getAllStudent);
    router.get("/get_student/:id", students.findOne);
    
  
    app.use("/api", router);
  };
  