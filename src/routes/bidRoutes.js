const express = require('express');
const { getAllBidsForItem, placeBid } = require('../controllers/bidController');
const authenticateToken = require('../middleware/auth');

const router = express.Router();

router.get('/items/:itemId/bids', getAllBidsForItem);
router.post('/items/:itemId/bids', authenticateToken, placeBid);

module.exports = router;
