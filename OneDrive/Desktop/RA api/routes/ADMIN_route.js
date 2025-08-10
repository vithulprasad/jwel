const express = require('express');
const router = express.Router();
const UserController = require('../controllers/USER_controller')
const PC_controller = require('../controllers/PC_controller')
const { authenticate } = require('../config/auth');

router.post('/api/log_in', UserController.admin_login); 
router.post('/api/sign_up', UserController.admin_sign_up); 
router.post('/api/check_otp', UserController.admin_sign_in_otp); 
router.get('/api/verify_admin',UserController.verify);

// category routes
router.post('/api/create_category', PC_controller.create_category); 
router.get('/api/list_category', PC_controller.list_category); 
router.get('/api/list_category_main', PC_controller.list_category_main); 
router.get('/api/list_collection_main', PC_controller.list_collections_main); 
router.get('/api/category_single',PC_controller.category_single)
router.delete('/api/delete_category', PC_controller.category_delete)
router.post('/api/edit_category', PC_controller.category_edit); 

// product routes

router.post('/api/create_product',PC_controller.product_create)
router.post('/api/edit_product',PC_controller.product_update)
router.post('/api/single_product',PC_controller.product_single_view)
router.get('/api/product_list',PC_controller.product_list) // pagination





//product routes


module.exports = router;