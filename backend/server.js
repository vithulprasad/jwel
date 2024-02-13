const express = require("express");
const multer = require("multer");
// import express from "express"
const app = express();
app.use(express.json());
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header("Access-Control-Allow-Methods", "DELETE, PUT, GET, POST");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Credentials", "true");
  next();
});

const db = require("./app/models");

db.sequelize
  .sync()
  .then(() => {
    console.log("DB connected successfully.");
  })
  .catch((err) => {
    console.log("Failed to connect db: " + err.message);
  });

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/events");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
var upload = multer({ storage: storage });
// Create a new file
const image = (req, res) => {
  console.log(req.file.path, "patheeeeee");
  res.json({ image: req.file });
};
app.post("/upload", upload.single("file"), image);
// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to jewelcasa application." });
});

require("./app/routes/module.routes")(app);
require("./app/routes/event.routes")(app);
require("./app/routes/student.routes")(app);
require("./app/routes/school.routes")(app)

// set port, listen for requests
const PORT = process.env.PORT || 8088;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
