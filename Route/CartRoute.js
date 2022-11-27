const express = require('express');
const authController = require("../RouteController/authController")
const cartController = require("../RouteController/CartController");


const router = express.Router();

router.route('/').get(authController.protect, authController.restrictTo('user'), cartController.getAllCart  ).post(authController.protect, authController.restrictTo('user'), cartController.createCart).patch(authController.protect, authController.restrictTo('user'), cartController.updateCart)

router.route('/delete/:CartId').post(authController.protect, cartController.deleteCart)

module.exports = router;