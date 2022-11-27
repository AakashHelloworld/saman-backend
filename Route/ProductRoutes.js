const express = require('express');
const productController = require("../RouteController/productController");
const authController = require("../RouteController/authController")
const reviewRouter = require("./ReviewRoute");


const router = express.Router();

router.use("/:productId/reviews", reviewRouter)

router.route('/').get(  productController.getAllProducts).post( productController.createProduct);

router.route('/topfive').get(productController.topfiveproducts);

router.route('/search/:searchitem').get(productController.searchproducts)






router.route('/:id').get( productController.getProduct).patch(productController.updateProducts).delete(authController.protect, productController.deleteProducts)

 

module.exports = router; 

