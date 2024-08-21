const axios = require("axios");
const Transaction =require('../model/Transaction')

const InitDb = async () => {
    try {
        const response = await axios.get('https://s3.amazonaws.com/roxiler.com/product_transaction.json');
        await Transaction.deleteMany();
        const transactions = response.data.map(item => ({
            title: item.title,
            description: item.description,
            price: item.price,
            dateOfSale: new Date(item.dateOfSale),
            category: item.category,
        }));
        await Transaction.insertMany(transactions);
        console.log('Database initialized with seed data');
    } catch (error) {
        console.log('Error initializing database', error);
    }
}

module.exports = InitDb;
