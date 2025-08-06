const db = require("../../models");
const ProductStoneAttribute = db.ProductStoneAttributes;
const Op = db.Sequelize.Op;
// const { verifyToken } = require("../utils/jwt.util");

exports.create = async (req, res) => {
  try {
    // let decode = verifyToken(req.headers.authorization);
    // if (decode.role === "admin") {
      const productData = {
        AttributeId: req.body.AttributeId,
        Details: req.body.Details,
        StoneType: req.body.StoneType,
        TotalStone: req.body.TotalStone,
        Weight: req.body.Weight,
        ActiveFlag: req.body.ActiveFlag,
        CreatedBy: req.body.CreatedBy,
      };
      const stone_attribute = await ProductStoneAttribute.create(productData);
      return res.json({
        data: stone_attribute,
        message: "Product stone attribute created successfully.",
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
    let stone_attribute = await ProductStoneAttribute.findAll();
    if (stone_attribute) {
      return res.json({
        data: stone_attribute,
        message: "Successfully get product stone attribute",
        statusCode: 200,
      });
    }
    return res.status(500).send({
      statusCode: 400,
      message: err.message || "Some error occurred while retrieving product stone attribute.",
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
      message: "Some error occurred while retrieving product stone attribute.",
      statusCode: 400,
    });
  }
};


exports.findOne = async (req, res) => {
  const id = req.params.id;
  try {
    // let decode = verifyToken(req.headers.authorization);
    // if (decode.role === "admin") {
    const stone_attribute = await ProductStoneAttribute.findByPk(id);

    if (stone_attribute) {
      return res.json({
        data: stone_attribute,
        message: "Successfully get product stone attribute.",
        statusCode: 200,
      });
    }
    return res.json({
      message: "Failed get product product stone attribute.",
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
  const id = req.body.ProductId;
  try {
    // let decode = verifyToken(req.headers.authorization);
    // if (decode.role === "admin") {
    await ProductStoneAttribute.update(req.body, {
      where: { ProductId: id },
    })
      .then((num) => {
        if (num == 1) {
          res.send({
            message: "Product stone attribute was updated successfully.",
            statusCode: 200,
          });
        } else {
          res.send({
            statusCode: 400,
            message: `Cannot update product stone attribute with id=${id}. Maybe product stone attribute was not found or req.body is empty!`,
          });
        }
      })
      .catch((err) => {
        res.status(500).send({
          statusCode: 400,
          message: "Error updating product stone attribute with id=" + id,
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
      await ProductStoneAttribute.destroy({
        where: { id: req.params.id },
      })
        .then((nums) => {
          res.send({ message: `${nums} Product stone attribute were deleted successfully!` });
        })
        .catch((err) => {
          res.status(500).send({
            message:
              err.message || "Some error occurred while removing product stone attribute.",
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




