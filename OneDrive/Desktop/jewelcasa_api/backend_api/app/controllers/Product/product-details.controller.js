const db = require("../../models");
const ProductDetails = db.ProductDetails;
const Op = db.Sequelize.Op;
// const { verifyToken } = require("../utils/jwt.util");

exports.create = async (req, res) => {
  try {
    // let decode = verifyToken(req.headers.authorization);
    // if (decode.role === "admin") {
      const productData = {
        ProductId: req.body.ProductId,
        ProductDetailType: req.body.ProductDetailType,
        DetailData: req.body.DetailData,
        Description: req.body.Description,
        CreatedBy: req.body.CreatedBy,
      };
      const product_details = await ProductDetails.create(productData);
      return res.json({
        data: product_details,
        message: "Product details created successfully.",
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
    let product_details = await ProductDetails.findAll();
    if (product_details.length) {
      return res.json({
        data: product_details,
        message: "Successfully get productdetails",
        statusCode: 200,
      });
    }
    return res.status(500).send({
      statusCode: 400,
      message: err.message || "Some error occurred while retrieving productdetails.",
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
      message: "Some error occurred while retrieving modules.",
      statusCode: 400,
    });
  }
};

exports.findAllWithPId = async (req, res) => {
  try {
    // let decode = verifyToken(req.headers.authorization);
    // if (decode.role === "admin") {
    let product_details = await ProductDetails.findAll({where:{
      ProductId:req.headers.id
    }});
    if (product_details.length) {
      return res.json({
        data: product_details,
        message: "Successfully get productdetails",
        statusCode: 200,
      });
    }
    return res.status(500).send({
      statusCode: 400,
      message: err.message || "Some error occurred while retrieving productdetails.",
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
      message: "Some error occurred while retrieving modules.",
      statusCode: 400,
    });
  }
};


exports.findOne = async (req, res) => {
  const id = req.params.id;
  try {
    // let decode = verifyToken(req.headers.authorization);
    // if (decode.role === "admin") {
    const product_details = await ProductDetails.findByPk(id);

    if (product_details) {
      return res.json({
        data: product_details,
        message: "Successfully get productdetails.",
        statusCode: 200,
      });
    }
    return res.json({
      message: "Failed get product details.",
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
  const id = req.body.ProductDetailId;
  try {
    // let decode = verifyToken(req.headers.authorization);
    // if (decode.role === "admin") {
    await ProductDetails.update(req.body, {
      where: { ProductDetailId: id },
    })
      .then(() => {
       
          res.send({
            message: "Product was updated successfully.",
            statusCode: 200,
          });
       
      })
      .catch((err) => {
        res.status(500).send({
          statusCode: 400,
          message: "Error updating product",
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
      await ProductDetails.destroy({
        where: { id: req.params.id },
      })
        .then((nums) => {
          res.send({ message: `${nums} Product were deleted successfully!` });
        })
        .catch((err) => {
          res.status(500).send({
            message:
              err.message || "Some error occurred while removing product.",
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




