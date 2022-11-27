const express = require('express');
const authController = require("../RouteController/authController")
const orderController = require("../RouteController/orderController");

const router = express.Router();

router.route('/').get(authController.protect, orderController.getAllOrders).post(authController.protect, orderController.createOrder)

router.route('/:orderId').get(authController.protect, orderController.getOrder).patch(authController.protect,  orderController.updateOrder).delete(authController.protect, orderController.deleteOrder);

module.exports = router; 