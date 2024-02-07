const db = require("../models");
const Module = db.modules;
const Op = db.Sequelize.Op;

exports.create = async (req, res) => {
  try {
    const module = await Module.create(req.body);
    console.log(module);

    return res.json({
      data: module,
      message: "Module created successfully.",
      statusCode: 200,
    });
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
    let modules = await Module.findAll({
      order: [["created_at", "DESC"]],
    });
    console.log(modules)
    if (modules) {
      return res.json({
        data: modules,
        message: "Successfully get modules",
        statusCode: 200,
      });
    }
    return res.status(500).send({
      statusCode: 400,
      message: err.message || "Some error occurred while retrieving modules.",
    });
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
    const permission = await Module.findByPk(id);

    if (permission) {
      return res.json({
        data: permission,
        message: "Successfully get permission.",
        statusCode: 200,
      });
    }
    return res.json({
      message: "Failed get permission details.",
      statusCode: 400,
    });
  } catch (error) {
    console.log(error);
    return res.json({
      message: "Something went wrong",
      statusCode: 400,
    });
  }
};

exports.update = async (req, res) => {
  const id = req.body.module_id;
  try {
    await Module.update(req.body, {
      where: { module_id: id },
    })
      .then((num) => {
        if (num == 1) {
          res.send({
            message: "Module was updated successfully.",
            statusCode: 200,
          });
        } else {
          res.send({
            statusCode: 400,
            message: `Cannot update module with id=${id}. Maybe user was not found or req.body is empty!`,
          });
        }
      })
      .catch((err) => {
        res.status(500).send({
          statusCode: 400,
          message: "Error updating module with id=" + id,
        });
      });
  } catch (error) {
    console.log(error);
    return res.json({
      message: "Something went wrong",
      statusCode: 400,
    });
  }
};

exports.delete = async (req, res) => {
  try {
    await Module.destroy({
      where: { module_id: req.params.id },
    })
      .then((nums) => {
        res.send({ message: `${nums} Module were deleted successfully!` });
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message || "Some error occurred while removing module.",
        });
      });
  } catch (error) {
    console.log(error);
    return res.json({
      message: "Something went wrong",
      statusCode: 400,
    });
  }
};
