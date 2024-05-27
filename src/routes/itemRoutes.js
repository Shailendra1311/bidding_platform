const express = require('express');
const { getAllItems, getItemById, createItem, updateItem, deleteItem } = require('../controllers/itemController');
const authenticateToken = require('../middleware/auth');
const multer = require('multer');

const upload = multer({ dest: 'uploads/' });

const router = express.Router();

router.get('/', getAllItems);
router.get('/:id', getItemById);
router.post('/', authenticateToken, upload.single('image'), createItem);
router.put('/:id', authenticateToken, upload.single('image'), updateItem);
router.delete('/:id', authenticateToken, deleteItem);

module.exports = router;
