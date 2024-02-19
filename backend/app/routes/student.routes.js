module.exports = (app) => {
    const students = require("../controllers/student.controller");
  
    var router = require("express").Router();
  
    // create role
    router.post("/create_student", students.create);
    router.get("/get_all_students", students.getAllStudent);
    router.get("/get_student/:id", students.findOne);
    router.put("/update_user_status/:id",students.updateUserStatus)
    
  
    app.use("/api", router);
  };
  