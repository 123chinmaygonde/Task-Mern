const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();
const transactionRoutes = require('./routes/transactions');

const app = express();
app.use(cors());
app.use(express.json());
const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("MongoDB connected");
    })
    .catch(err => console.log(err));

app.use('/api', transactionRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
});

