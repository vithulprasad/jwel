// const Users = require('../services/auth.service');
const jwtConfig = require("../config/jwt.config");
const bcryptUtil = require("../utils/bcrypt.util");
const jwtUtil = require("../utils/jwt.util");
const { verifyToken } = require("../utils/jwt.util");
const db = require("../models");
const Users = db.users;
const Token = db.token;
const Op = db.Sequelize.Op;

exports.register = async (req, res) => {
  try {
    const isExist = await Users.findOne({
      where: { email: req.body.email },
    });
    if (isExist) {
      return res.status(400).json({
        message: "Email already exists.",
        statusCode: 400,
      });
    }

    const hashedPassword = await bcryptUtil.createHash(req.body.password);
    const userData = {
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      role_id: req.body.role_id,
      role_type: req.body.role_type,
      email: req.body.email,
      password: hashedPassword,
      status: "Inactive",
    };
    const user = await Users.create(userData);
    return res.json({
      data: user,
      message: "User registered successfully.",
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

exports.login = async (req, res) => {
  try {
    const user = await Users.findOne({
      where: { email: req.body.email },
    });

    if (user) {
      if (user.status === "Active") {
        const isMatched = await bcryptUtil.compareHash(
          req.body.password,
          user.password
        );
        if (isMatched) {
          const tokenExist = await Token.findOne({
            where: { user_id: user.id },
          });
          if (tokenExist) {
            const token = await jwtUtil.createToken({
              id: user.id,
            });

            let tokenData = {
              user_id: user.id,
              token: token,
              expiry: jwtConfig.ttl,
            };
            await Token.update(tokenData, {
              where: { id: tokenExist.id },
            });
            return res.json({
              data: user,
              access_token: token,
              statusCode: 200,
              expires_in: jwtConfig.ttl,
              message: "User logged in successfully",
            });
          } else {
            const token = await jwtUtil.createToken({
              id: user.id,
            });
            let tokenData = {
              user_id: user.id,
              token: token,
              expiry: jwtConfig.ttl,
            };
            await Token.create(tokenData);
            return res.json({
              data: user,
              access_token: token,
              statusCode: 200,
              expires_in: jwtConfig.ttl,
              message: "User logged in successfully",
            });
          }
        }
      } else {
        return res.status(400).json({
          message: "You account is inactive.Please contact admin.",
          statusCode: 400,
        });
      }
    }
    return res.status(400).json({ message: "Unauthorized.", statusCode: 400 });
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
    let user = await Users.findAll();
    if (user) {
      return res.json({
        data: user,
        message: "Successfully get users",
        statusCode: 200,
      });
    }
    return res.status(500).send({
      statusCode: 400,
      message: err.message || "Some error occurred while retrieving users.",
    });
  } catch (error) {
    console.log(error);
    return res.json({
      message: "Some error occurred while retrieving users.",
      statusCode: 400,
    });
  }
};
exports.findOne = async (req, res) => {
  const id = req.params.id;
  try {
    const user = await Users.findByPk(id);
    const token = await Token.findOne({ where: { user_id: id } });
    let decode = jwtUtil.verifyToken(req.headers.authorization);
    if (decode.id == req.params.id || decode.role === "admin") {
      if (user) {
        return res.json({
          data:user,
          token: token === null ? "" : token.token,
          message: "Successfully get user details.",
          statusCode: 200,
        });
      } else {
        return res.json({
          message: "Failed get user details.",
          statusCode: 400,
        });
      }
    } else {
      return res.status(401).json({ message: "Unauthorized" });
    }
  } catch (error) {
    console.log(error);
    return res.json({
      message: "Something went wrong",
      statusCode: 400,
    });
  }
};

// Update a Page by the id in the request
exports.update = (req, res) => {
  const id = req.body.id;
  try {
    let decode = verifyToken(req.headers.authorization);
    if (decode.role === "admin") {
      Users.update(req.body, {
        where: { id: id },
      })
        .then((num) => {
          if (num == 1) {
            res.send({
              message: "User was updated successfully.",
              statusCode: 200,
            });
          } else {
            res.send({
              statusCode: 400,
              message: `Cannot update user with id=${id}. Maybe user was not found or req.body is empty!`,
            });
          }
        })
        .catch((err) => {
          res.status(500).send({
            statusCode: 400,
            message: "Error updating user with id=" + id,
          });
        });
    }
  } catch (error) {
    console.log(error);
    return res.json({
      message: "Something went wrong",
      statusCode: 400,
    });
  }
};

exports.logout = async (req, res) => {
  await Users.logoutUser(req.token, req.user.exp);
  return res.json({ message: "Logged out successfully." });
};

exports.findAllWithStatus = async (req, res) => {
  try {
    let users = await Users.findAll({ where: { status: "Active" } });
    if (users) {
      return res.json({
        data: users,
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

// Delete module from the database.
exports.delete = async (req, res) => {
  try {
    let decode = verifyToken(req.headers.authorization);

    if (decode.role === "admin") {
      await Users.destroy({
        where: { id: req.params.id },
      })
        .then((nums) => {
          res.send({ message: `${nums} User were deleted successfully!` });
        })
        .catch((err) => {
          res.status(500).send({
            message: err.message || "Some error occurred while removing user.",
          });
        });
    } else {
      return res.json({
        message: "Unauthorized",
        statusCode: 400,
      });
    }
  } catch (error) {
    console.log(error);
    return res.json({
      message: "Something went wrong",
      statusCode: 400,
    });
  }
};

// Update a module status by the id in the request
exports.updateStatus = async (req, res) => {
  let decode = jwtUtil.verifyToken(req.headers.authorization);
  const id = req.params.id;
  const status = req.headers.status;

  try {
    if (decode.role === "admin") {
      await Users.update(
        { status: status },
        {
          where: { id: id },
        }
      )
        .then(() => {
          console.log("test");
          res.send({
            message: "User status changed successfully.",
            statusCode: 200,
          });
        })
        .catch((err) => {
          res.status(500).send({
            statusCode: 400,
            message: "Error while change user status with id=" + id,
          });
        });
    } else {
      return res.json({
        message: "Unauthorized",
        statusCode: 400,
      });
    }
  } catch (error) {
    console.log(error);
    return res.json({
      message: "Something went wrong",
      statusCode: 400,
    });
  }
};
