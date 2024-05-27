const express = require('express');
const dotenv = require('dotenv');
const http = require('http');
const { Server } = require('socket.io');
const userRoutes = require('./routes/userRoutes');
const itemRoutes = require('./routes/itemRoutes');
const bidRoutes = require('./routes/bidRoutes');
const notificationRoutes = require('./routes/notificationRoutes');
const sequelize = require('./config/database');
const Bid = require('./models/Bid');
const Item = require('./models/Item');
const Notification = require('./models/Notification');

dotenv.config();

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.json());

app.use('/users', userRoutes);
app.use('/items', itemRoutes);
app.use('/', bidRoutes);
app.use('/', notificationRoutes);

io.on('connection', (socket) => {
    console.log('a user connected');

    socket.on('bid', async ({ itemId, bid_amount, userId }) => {
        try {
            const item = await Item.findByPk(itemId);
            if (!item) return;

            if (bid_amount <= item.current_price) return;

            const bid = await Bid.create({
                item_id: itemId,
                user_id: userId,
                bid_amount,
            });

            item.current_price = bid_amount;
            await item.save();

            io.emit('update', { itemId, bid_amount });

            const notification = await Notification.create({
                user_id: item.user_id,
                message: `New bid on your item ${item.name}`,
            });

            socket.broadcast.emit('notify', notification);
        } catch (error) {
            console.error(error);
        }
    });

    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});

const PORT = process.env.PORT || 3000;

sequelize.authenticate().then(() => {
    console.log('Database connected...');
    server.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}).catch(err => {
    console.log('Error: ' + err);
});
