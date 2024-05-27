const Item = require('../models/Item');
const authenticateToken = require('../middleware/auth');
const { Op } = require('sequelize');

exports.getAllItems = async (req, res) => {
    try {
        const items = await Item.findAll();
        res.json(items);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.getItemById = async (req, res) => {
    try {
        const item = await Item.findByPk(req.params.id);
        if (!item) return res.status(404).json({ message: 'Item not found' });
        res.json(item);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.createItem = async (req, res) => {
    try {
        const { name, description, starting_price, end_time } = req.body;
        const item = await Item.create({
            name,
            description,
            starting_price,
            end_time,
            image_url: req.file ? req.file.path : null,
        });
        res.status(201).json({ message: 'Item created successfully', item });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.updateItem = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, description, starting_price, end_time } = req.body;
        const item = await Item.findByPk(id);
        if (!item) return res.status(404).json({ message: 'Item not found' });

        item.name = name;
        item.description = description;
        item.starting_price = starting_price;
        item.end_time = end_time;
        item.image_url = req.file ? req.file.path : item.image_url;

        await item.save();
        res.json({ message: 'Item updated successfully', item });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.deleteItem = async (req, res) => {
    try {
        const { id } = req.params;
        const item = await Item.findByPk(id);
        if (!item) return res.status(404).json({ message: 'Item not found' });

        await item.destroy();
        res.json({ message: 'Item deleted successfully' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
