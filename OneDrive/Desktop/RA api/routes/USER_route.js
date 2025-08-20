const express = require('express');
const router = express.Router();
const USER_controller = require('../controllers/USER_controller')
const { authenticate } = require('../config/auth');

router.post('/api/log_in', USER_controller.user_login); 
router.post('/api/sign_up', USER_controller.user_sign_up); 
router.post('/api/verify_otp', USER_controller.verify_otp); 

router.get('/api/get_profile',authenticate,USER_controller.get_profile)
router.post('/api/create_address',authenticate,USER_controller.create_address)
router.post('/api/edit_address',authenticate,USER_controller.edit_address)
router.delete('/api/delete_address',authenticate,USER_controller.delete_address)
router.post('/api/profile_name_edit',authenticate,USER_controller.profile_name_edit)
router.post('/api/profile_password_edit',authenticate,USER_controller.profile_password_edit)
router.post('/api/forgot_password',USER_controller.forgot_password)
router.post('/api/forgot_password_email_verify',USER_controller.forgot_password_email_verify)
router.post('/api/google_sign_in_login',USER_controller.google_sign_in_login)


router.get('/api/fetch_all_collections',USER_controller.fetch_all_collections)

router.get('/api/fetch_collections_by_id',USER_controller.fetch_collections_by_main_id)

router.get('/api/fetch_products_by_collection',USER_controller.fetch_products_by_collection_id)
router.get('/api/fetch_filter_category_by_id',USER_controller.fetch_filter_category_by_id)
router.get('/api/fetch_product',USER_controller.fetch_product)


router.post('/api/add_to_cart',authenticate,USER_controller.add_to_cart)
router.post('/api/remove_cart_product',authenticate,USER_controller.remove_cart_product_by_id)
router.post('/api/update_cart_quantity',authenticate,USER_controller.update_cart_quantity)
router.get('/api/find_cart',authenticate,USER_controller.find_user_cart)







module.exports = router;