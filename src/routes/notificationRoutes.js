const express = require('express');
const { getNotifications, markNotificationsAsRead } = require('../controllers/notificationController');
const authenticateToken = require('../middleware/auth');

const router = express.Router();

router.get('/notifications', authenticateToken, getNotifications);
router.post('/notifications/mark-read', authenticateToken, markNotificationsAsRead);

module.exports = router;
