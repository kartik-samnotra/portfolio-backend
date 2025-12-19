const express = require('express');
const { login, getMe, refreshToken, logout } = require('../controllers/authController');
const { protect } = require('../middleware/auth');

const router = express.Router();

router.post('/login', login);
router.get('/me', protect, getMe);
router.post('/refresh', protect, refreshToken);
router.post('/logout', protect, logout);

module.exports = router;