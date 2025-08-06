const db = require("../../models");
const StoneType = db.StoneTypes;
const Op = db.Sequelize.Op;
// const { verifyToken } = require("../utils/jwt.util");

exports.create = async (req, res) => {
  try {
    // let decode = verifyToken(req.headers.authorization);
    // if (decode.role === "admin") {
      const Data = {
        StoneType: req.body.StoneType,
        ActiveFlag: req.body.ActiveFlag,
        Description: req.body.Description,
        CreatedBy: req.body.CreatedBy,
      };
      const details = await StoneType.create(Data);
      return res.json({
        data: details,
        message: "Stone type created successfully.",
        statusCode: 200,
      });
   
  // }else{
  //   return res.json({
  //     message: "Unauthorized",
  //     statusCode: 400,
  //   });
  // }
  } catch (error) {
    console.log(error);
    return res.json({
      message: "Something went wrong",
      statusCode: 400,
    });
  }
};

exports.findAll = async (req, res) => {
  try {
    // let decode = verifyToken(req.headers.authorization);
    // if (decode.role === "admin") {
    let details = await StoneType.findAll();
    if (details.length) {
      return res.json({
        data: details,
        message: "Successfully get stone type",
        statusCode: 200,
      });
    }
    return res.status(500).send({
      statusCode: 400,
      message: err.message || "Some error occurred while retrieving stone type.",
    });
  // }else{
  //   return res.json({
  //     message: "Unauthorized",
  //     statusCode: 400,
  //   });
  // }
  } catch (error) {
    console.log(error);
    return res.json({
      message: "Some error occurred while retrieving stone type.",
      statusCode: 400,
    });
  }
};


exports.findOne = async (req, res) => {
  const id = req.params.id;
  try {
    // let decode = verifyToken(req.headers.authorization);
    // if (decode.role === "admin") {
    const details = await StoneType.findByPk(id);

    if (details) {
      return res.json({
        data: details,
        message: "Successfully get stone type.",
        statusCode: 200,
      });
    }
    return res.json({
      message: "Failed get stone type.",
      statusCode: 400,
    });
  // }else{
  //   return res.json({
  //     message: "Unauthorized",
  //     statusCode: 400,
  //   });
  // }
  } catch (error) {
    console.log(error);
    return res.json({
      message: "Something went wrong",
      statusCode: 400,
    });
  }
};

// Update a module by the id in the request
exports.update = async (req, res) => {
  const id = req.body.StoneTypeId;
  try {
    // let decode = verifyToken(req.headers.authorization);
    // if (decode.role === "admin") {
    await StoneType.update(req.body, {
      where: { StoneTypeId: id },
    })
      .then(() => {
       
          res.send({
            message: "Stone type was updated successfully.",
            statusCode: 200,
          });
       
      })
      .catch((err) => {
        res.status(500).send({
          statusCode: 400,
          message: "Error updating stone type",
        });
      });
    // }else{
    //   return res.json({
    //     message: "Unauthorized",
    //     statusCode: 400,
    //   });
    // }
  } catch (error) {
    console.log(error);
    return res.json({
      message: "Something went wrong",
      statusCode: 400,
    });
  }
};

// Delete module from the database.
exports.delete = async (req, res) => {
  try {
    // let decode = verifyToken(req.headers.authorization);
    // if (decode.role === "admin") {
    // let check = await User.findAll({ where: { module_id: req.params.id } });
    // if (check.length) {
    //   res.status(500).send({
    //     statusCode: 400,
    //     message: "Deactivate module from module before delete",
    //   });
    // } else {
      await StoneType.destroy({
        where: { StoneTypeId: req.params.id },
      })
        .then((nums) => {
          res.send({ message: `${nums} stone type were deleted successfully!` });
        })
        .catch((err) => {
          res.status(500).send({
            message:
              err.message || "Some error occurred while removing stone type.",
          });
        });
    }
  // } else{
  //   return res.json({
  //     message: "Unauthorized",
  //     statusCode: 400,
  //   });
  // }
// }
  catch (error) {
    console.log(error);
    return res.json({
      message: "Something went wrong",
      statusCode: 400,
    });
  }
};




