const db = require("../../models");
const Product = db.Products;
const ProductMedia = db.ProductMedias;
const Op = db.Sequelize.Op;
const multer = require('multer');
// const { verifyToken } = require("../utils/jwt.util");

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

exports.create = async (req, res) => {
  try {

    // let decode = verifyToken(req.headers.authorization);
    // if (decode.role === "admin") {
      const productData = {
        VendorInstanceId: req.body.VendorInstanceId,
        SKU: req.body.SKU,
        Name: req.body.Name,
        Description: req.body.Description,
        ProductMaterialTypeId: req.body.ProductMaterialTypeId,
        Weight: req.body.Weight,
        Wasteage: req.body.Wasteage,
        CreatedBy: req.body.CreatedBy,
      };
      const product = await Product.create(productData);
      return res.json({
        data: product,
        message: "Product created successfully.",
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
    let product = await Product.findAll();
   
    if (product.length) {
      product.map(async(e)=>{
        console.log(e.ProductId)
        let productImage = await ProductMedia.findAll({where:{ProductId:e.ProductId}});
        if(productImage.length){
          return res.json({
            data: product,productImage,
            message: "Successfully get products",
            statusCode: 200,
          });
        }else{
          return res.json({
            data: product,
            message: "Successfully get products",
            statusCode: 200,
          });
        }
      })
      
    }else{
      return res.status(200).send({
        ata: [],
        statusCode: 400,
        message: "Products not found",
      });
    }
   
  // }else{
  //   return res.json({
  //     message: "Unauthorized",
  //     statusCode: 400,
  //   });
  // }
  } catch (error) {
    console.log(error);
    return res.json({
      message: "Some error occurred while retrieving product.",
      statusCode: 400,
    });
  }
};


exports.findOne = async (req, res) => {
  const ProductId = req.params.id;
  try {
    // let decode = verifyToken(req.headers.authorization);
    // if (decode.role === "admin") {
    const product = await Product.findByPk(ProductId);

    if (product) {
      return res.json({
        data: product,
        message: "Successfully get product.",
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
  const id = req.body.ProductId;
  try {
    // let decode = verifyToken(req.headers.authorization);
    // if (decode.role === "admin") {
    await Product.update(req.body, {
      where: { ProductId: id },
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
     let ProductId = req.params.id;
      await Product.destroy({where:{ProductId:ProductId}})
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




