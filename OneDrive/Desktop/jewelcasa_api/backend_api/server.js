const express = require("express");
const cors = require("cors");
const multer = require('multer')
const bodyParser = require('body-parser');
const app = express();
// parse requests of content-type - application/json
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({
  origin: 'http://localhost:3000', credentials: true
}));

app.use(function(req, res, next) {
   res.header("Access-Control-Allow-Origin", "http://localhost:3000");
   res.header('Access-Control-Allow-Methods', 'DELETE, PUT, GET, POST');
   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
   res.header("Access-Control-Allow-Credentials", "true");
   next();
});

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

const db = require("./app/models");

db.sequelize.sync()
  .then(() => {
    console.log("DB connected successfully.");
  })
  .catch((err) => {
    console.log("Failed to connect db: " + err.message);
  });

  app.options('*', cors());
// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to jewelcasa application." });
});

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
})
var upload = multer({ storage: storage })

app.use(express.static(__dirname + '/public'));
app.use('/uploads', express.static('uploads'));

app.post('/api/upload', upload.array('files', 5), function (req, res, next) {
var arr = []
  var response = ''
  console.log(req,'this is the files')
  for(var i=0;i<req.files.length;i++){
      response = req.files[i].path
      arr.push(response)
  }
  console.log(arr,'this is the array')
  return res.json({
    data: arr,
    message: "Files uploaded succesfully",
    statusCode: 200,
  });
})

require("./app/routes/users.routes")(app);
require("./app/routes/Product/product.routes")(app);
require("./app/routes/Product/product-details.routes")(app);
require("./app/routes/Product/product-stone-attribute.routes")(app);
require("./app/routes/Product/product-media.routes")(app);
require("./app/routes/Product-Type/media-type.routes")(app);
require("./app/routes/Product-Type/product-material-type.routes")(app);
require("./app/routes/Product-Type/stone-type.routes")(app);
require("./app/routes/Product-Type/product-detail-type.routes")(app);

// set port, listen for requests
const PORT = process.env.PORT || 8088;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
