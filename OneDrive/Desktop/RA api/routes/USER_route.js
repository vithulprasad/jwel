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

module.exports = router;