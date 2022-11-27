const express = require("express");
const shopController = require("../RouteController/shopController")
const authController = require("../RouteController/authController")
const ShopReviewRoute = require("./ShopReviewRoute");
const router = express.Router();

router.use("/:shopId/shopreviews", ShopReviewRoute )

router.route("/").get(shopController.getAllShops).post(shopController.createShop)

router.route("/:shopId").get(shopController.getShop).patch(authController.protect, authController.restrictTo('admin'), shopController.updateShop).delete(authController.protect, authController.restrictTo('admin'), shopController.deleteShop)

module.exports = router;