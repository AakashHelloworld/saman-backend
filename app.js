const express = require("express");
const mongoose = require("mongoose");
const dotenv = require('dotenv');
const rateLimit = require('express-rate-limit');
const helment = require('helmet');
const app = express(); 
const products = require("./Route/ProductRoutes");
const users = require("./Route/UserRoutes");
const reviews = require("./Route/ReviewRoute");
const cors = require("cors");
const shop = require("./Route/ShopRoute");
const cart = require("./Route/CartRoute");
const order = require("./Route/orderRoute")
const shopReview = require("./Route/ShopReviewRoute")
const errormiddleware = require("./middleware/Error");
const cookieParser = require("cookie-parser")

dotenv.config({path: './config.env'});
const limiter = rateLimit({
    max:100,
    windowMs: 60 * 60 * 1000,
    message: 'Too many request from this IP, Please try again in an hours!'
})

const DB = process.env.DATABASE.replace('<PASSWORD>', process.env.DATABASE_PASSWORD);

mongoose.connect(DB,{
    useNewUrlParser: true, 
    useUnifiedTopology: true, 
}).then((con)=>{
    console.log("sucessful database") 
});
app.use(helment())
app.use('/api', limiter)

app.use(express.json( {limit: '10kb'} )); 
app.use(cors({
    credentials: true,
    origin: 'http://localhost:3000'
}));
app.use(cookieParser());
app.use('/api/v1/products', products);
app.use('/api/v1/users', users);
app.use('/api/v1/reviews', reviews);
app.use('/api/v1/shops', shop)
app.use('/api/v1/shopreviews', shopReview );
app.use('/api/v1/cart', cart)
app.use('/api/v1/order', order)
// middleware for error
app.use(errormiddleware)



module.exports = app
