const db = require("../../models");
const ProductMedia = db.ProductMedias;
const Op = db.Sequelize.Op;
// const { verifyToken } = require("../utils/jwt.util");

exports.create = async (req, res) => {
  try {
    // let decode = verifyToken(req.headers.authorization);
    // if (decode.role === "admin") {

    
      const productData = {
        ProductId: req.body.ProductId,
        MediaTypeId: req.body.MediaTypeId,
        StorageLocation: req.body.StorageLocation,
        Description: req.body.Description,
      };
      const product_media = await ProductMedia.create(productData);
      return res.json({
        data: product_media,
        message: "Product media created successfully.",
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
    let product_media = await ProductMedia.findAll();
    if (product_media) {
      return res.json({
        data: product_media,
        message: "Successfully get product media",
        statusCode: 200,
      });
    }
    return res.status(500).send({
      statusCode: 400,
      message: err.message || "Some error occurred while retrieving product media.",
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
      message: "Some error occurred while retrieving product media.",
      statusCode: 400,
    });
  }
};

exports.findAllWithPID = async (req, res) => {
  try {
    // let decode = verifyToken(req.headers.authorization);
    // if (decode.role === "admin") {
      const id = req.params.id;
    let product_media = await ProductMedia.findAll({where:{ProductId:id}});
    if (product_media) {
      return res.json({
        data: product_media,
        message: "Successfully get product media",
        statusCode: 200,
      });
    }
    return res.status(500).send({
      statusCode: 400,
      message: err.message || "Some error occurred while retrieving product media.",
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
      message: "Some error occurred while retrieving product media.",
      statusCode: 400,
    });
  }
};


exports.findOne = async (req, res) => {
  const id = req.params.id;
  try {
    // let decode = verifyToken(req.headers.authorization);
    // if (decode.role === "admin") {
    const product_media = await ProductMedia.findByPk(id);

    if (product_media) {
      return res.json({
        data: product_media,
        message: "Successfully get product media.",
        statusCode: 200,
      });
    }
    return res.json({
      message: "Failed get product media.",
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

exports.findOneWithPID = async (req, res) => {
  const id = req.params.id;
  try {
    // let decode = verifyToken(req.headers.authorization);
    // if (decode.role === "admin") {
    const product_media = await ProductMedia.findOne({where:{ProductId:id}});
console.log(product_media)
    if (product_media) {
      return res.json({
        data: product_media,
        message: "Successfully get product media.",
        statusCode: 200,
      });
    }
    return res.json({
      message: "Failed get product media.",
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
  const id = req.body.ProductMediaId;
  try {
    // let decode = verifyToken(req.headers.authorization);
    // if (decode.role === "admin") {
    await ProductMedia.update(req.body, {
      where: { ProductMediaId: id },
    })
      .then((num) => {
        if (num == 1) {
          res.send({
            message: "Product meida was updated successfully.",
            statusCode: 200,
          });
        } else {
          res.send({
            statusCode: 400,
            message: `Cannot update product media with id=${id}. Maybe product madia was not found or req.body is empty!`,
          });
        }
      })
      .catch((err) => {
        res.status(500).send({
          statusCode: 400,
          message: "Error updating product media with id=" + id,
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
      await ProductMedia.destroy({
        where: { id: req.params.id },
      })
        .then((nums) => {
          res.send({ message: `${nums} Product media were deleted successfully!` });
        })
        .catch((err) => {
          res.status(500).send({
            message:
              err.message || "Some error occurred while removing product media.",
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




