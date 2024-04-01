module.exports = (app) => {
    const students = require("../controllers/student.controller");
  
    var router = require("express").Router();
  
    // create role
    router.post("/create_student", students.create);
    router.get("/get_all_students", students.getAllStudent);
    router.get("/get_student/:id", students.getUserById);
    router.put("/update_user_status/:id",students.updateUserStatus)
    router.put("/update_one_student/:id",students.updateOneStudent)
    
  
    app.use("/api", router);
  };
  