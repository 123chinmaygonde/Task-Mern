const express =require("express")
const router = express.Router()
const Transaction=require('../model/Transaction')

const InitDb = require('../controllers/InitDb')


const filterByMonth =(month,transactions)=>{
    const monthMap={
        January:0,
        February:1,
        March:2,
        April:3,
        May:4,
        June:5,
        July:6,
        August:7,
        September:8,
        October:9,
        November:10,
        December:11,


    };
    return transactions.filter(transaction=>transaction.dateOfSale.getMonth()=== monthMap[month])
};

router.get('/transactions',async(req,res)=>{
    const {month = 'March',page=1,perPage=10,search=''}=req.query;
    let transactions = await Transaction.find()
    transactions = filterByMonth(month,transactions)

    if(search){
        transactions = transactions.filter(transaction=>
            transaction.title.includes(search) ||
            transaction.description.includes(search)||
            transaction.price.toString().includes(search)
        );
    }

    const startIndex = (page-1)*perPage;
    const endIndex = startIndex+perPage;
    const paginatedTransactions = transactions.slice(startIndex,endIndex)

    res.json({
        total:transactions.length,
        transactions:paginatedTransactions
    })


})
router.get('/statistics', async (req, res) => {
    const { month = 'March' } = req.query;
    const transactions = await Transaction.find();
    const filteredTransactions = filterByMonth(month, transactions);

    const totalSaleAmount = filteredTransactions.reduce((acc, curr) => acc + curr.price, 0);
    const totalSoldItems = filteredTransactions.length;
    const totalNotSoldItems = transactions.length - totalSoldItems;

    res.json({
        totalSaleAmount,
        totalSoldItems,
        totalNotSoldItems,
    });
});

// Bar chart data
router.get('/bar-chart', async (req, res) => {
    const { month = 'March' } = req.query;
    const transactions = await Transaction.find();
    const filteredTransactions = filterByMonth(month, transactions);

    const priceRanges = {
        '0-100': 0,
        '101-200': 0,
        '201-300': 0,
        '301-400': 0,
        '401-500': 0,
        '501-600': 0,
        '601-700': 0,
        '701-800': 0,
        '801-900': 0,
        '901-above': 0,
    };

    filteredTransactions.forEach(transaction => {
        if (transaction.price >= 901) {
            priceRanges['901-above']++;
        } else {
            for (let i = 0; i <= 900; i += 100) {
                if (transaction.price >= i && transaction.price < i + 100) {
                    priceRanges[`${i}-${i + 99}`]++;
                    break;
                }
            }
        }
    });

    res.json(priceRanges);
});

// Pie chart data
router.get('/pie-chart', async (req, res) => {
    const { month = 'March' } = req.query;
    const transactions = await Transaction.find();
    const filteredTransactions = filterByMonth(month, transactions);

    const categoryCount = filteredTransactions.reduce((acc, transaction) => {
        acc[transaction.category] = (acc[transaction.category] || 0) + 1;
        return acc;
    }, {});

    res.json(categoryCount);
});

// Combined response
router.get('/combined', async (req, res) => {
    const { month = 'March' } = req.query;
    const transactions = await Transaction.find();
    
    const filteredTransactions = filterByMonth(month, transactions);

    const totalSaleAmount = filteredTransactions.reduce((acc, curr) => acc + curr.price, 0);
    const totalSoldItems = filteredTransactions.length;
    const totalNotSoldItems = transactions.length - totalSoldItems;

    const priceRanges = {
        '0-100': 0,
        '101-200': 0,
        '201-300': 0,
        '301-400': 0,
        '401-500': 0,
        '501-600': 0,
        '601-700': 0,
        '701-800': 0,
        '801-900': 0,
        '901-above': 0,
    };

    filteredTransactions.forEach(transaction => {
        if (transaction.price >= 901) {
            priceRanges['901-above']++;
        } else {
            for (let i = 0; i <= 900; i += 100) {
                if (transaction.price >= i && transaction.price < i + 100) {
                    priceRanges[`${i}-${i + 99}`]++;
                    break;
                }
            }
        }
    });

    const categoryCount = filteredTransactions.reduce((acc, transaction) => {
        acc[transaction.category] = (acc[transaction.category] || 0) + 1;
        return acc;
    }, {});

    res.json({
        totalSaleAmount,
        totalSoldItems,
        totalNotSoldItems,
        priceRanges,
        categoryCount,
    });
});

module.exports = router;