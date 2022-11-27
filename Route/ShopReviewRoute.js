const express = require("express");
const shopReviewController = require("../RouteController/reviewShopController");
const authController = require("../RouteController/authController")

const router = express.Router({mergeParams:true});

router.route("/").get(shopReviewController.getShopReviews).post(authController.protect,shopReviewController.createReviews);

router.route('/delete/:shopreviewId/:shopId').delete(authController.protect, shopReviewController.deleteReview)



module.exports = router;