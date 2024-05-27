const Bid = require('../models/Bid');
const Item = require('../models/Item');

exports.getAllBidsForItem = async (req, res) => {
    try {
        const bids = await Bid.findAll({
            where: { item_id: req.params.itemId },
            include: ['user']
        });
        res.json(bids);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.placeBid = async (req, res) => {
    try {
        const { itemId } = req.params;
        const { bid_amount } = req.body;
        const item = await Item.findByPk(itemId);
        if (!item) return res.status(404).json({ message: 'Item not found' });

        if (bid_amount <= item.current_price) {
            return res.status(400).json({ message: 'Bid amount must be higher than the current price' });
        }

        const bid = await Bid.create({
            item_id: itemId,
            user_id: req.user.id,
            bid_amount,
        });

        item.current_price = bid_amount;
        await item.save();

        res.status(201).json({ message: 'Bid placed successfully', bid });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
