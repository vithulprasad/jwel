const express = require('express');
const router = express.Router();
const { authenticate } = require('../config/auth');

router.post('/api/log_in', authenticate); 
router.post('/api/sign_up', authenticate); 
router.post('/api/check_otp', authenticate); 
module.exports = router;