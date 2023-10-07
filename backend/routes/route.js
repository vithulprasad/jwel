// server/routes/route.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const rolesController = require('../controllers/rolesController');

router.post('/addsuperadmin', rolesController.addSuperAdmin);
router.post('/addnewrole', rolesController.addUserRole);
router.get('/getroledetail/:role', rolesController.getUserRole);
router.get('/getrolebyid/:Id', rolesController.getUserRoleById);

router.post('/signup', userController.signup);

router.post('/login', userController.login);
router.get('/user/:userId', userController.allowIfLoggedin, userController.getUser);
router.get('/users', userController.allowIfLoggedin, userController.getUsers);
router.put('/user/:userId', userController.allowIfLoggedin, userController.updateUser);
router.delete('/user/:userId', userController.allowIfLoggedin, userController.deleteUser);

module.exports = router;