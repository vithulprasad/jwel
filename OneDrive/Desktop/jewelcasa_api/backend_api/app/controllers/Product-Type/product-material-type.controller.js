const db = require("../../models");
const ProductMaterialType = db.ProductMaterialTypes;
const Op = db.Sequelize.Op;
// const { verifyToken } = require("../utils/jwt.util");

exports.create = async (req, res) => {
  try {
    // let decode = verifyToken(req.headers.authorization);
    // if (decode.role === "admin") {
      const Data = {
        MaterialType: req.body.MaterialType,
        ActiveFlag: req.body.ActiveFlag,
        Description: req.body.Description,
        CreatedBy: req.body.CreatedBy,
      };
      const details = await ProductMaterialType.create(Data);
      return res.json({
        data: details,
        message: "Product material type created successfully.",
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
    let details = await ProductMaterialType.findAll();
    if (details.length) {
      return res.json({
        data: details,
        message: "Successfully get product material type",
        statusCode: 200,
      });
    }
    return res.status(500).send({
      statusCode: 400,
      message: err.message || "Some error occurred while retrieving product material type",
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
      message: "Some error occurred while retrieving product material type.",
      statusCode: 400,
    });
  }
};


exports.findOne = async (req, res) => {
  const id = req.params.id;
  try {
    // let decode = verifyToken(req.headers.authorization);
    // if (decode.role === "admin") {
    const details = await ProductMaterialType.findByPk(id);

    if (details) {
      return res.json({
        data: details,
        message: "Successfully get product material type.",
        statusCode: 200,
      });
    }
    return res.json({
      message: "Failed get product material type.",
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
  const id = req.body.MaterialTypeId;
  try {
    // let decode = verifyToken(req.headers.authorization);
    // if (decode.role === "admin") {
    await ProductMaterialType.update(req.body, {
      where: { MaterialTypeId: id },
    })
      .then(() => {
       
          res.send({
            message: "Product material type was updated successfully.",
            statusCode: 200,
          });
       
      })
      .catch((err) => {
        res.status(500).send({
          statusCode: 400,
          message: "Error updating product material type",
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
      await ProductMaterialType.destroy({
        where: { MaterialTypeId: req.params.id },
      })
        .then((nums) => {
          res.send({ message: `${nums} Product material type were deleted successfully!` });
        })
        .catch((err) => {
          res.status(500).send({
            message:
              err.message || "Some error occurred while removing product material type.",
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




