const sequelize = require('./config/database');
const User = require('./models/User');
const Item = require('./models/Item');
const Bid = require('./models/Bid');
const Notification = require('./models/Notification');

const syncDatabase = async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
        await sequelize.sync({ force: true });
        console.log('All models were synchronized successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    } finally {
        await sequelize.close();
    }
};

syncDatabase();
