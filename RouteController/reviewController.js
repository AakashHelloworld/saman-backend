const Review = require("../RouteModule/reviewModule");
const catchasynchandler = require("../middleware/CatchasyncError");
const APIFeatures = require("../Utils/appFeatures");


exports.getReviews = catchasynchandler(async(req,res)=>{
    let filter = {};
    if(req.params.productId) {product: req.params.productId};
    const ReviewAll =await Review.find(filter);
    res.status(200).json({
        status: "success",
        results: ReviewAll.length,
        data:{
            ReviewAll
        }
    }) 
}) 
 

exports.createReviews = catchasynchandler(async(req,res)=>{
    if(!req.body.product) req.body.product = req.params.productId;
    if(!req.body.user) req.body.user = req.user.id;
    const newReview = await Review.create(req.body);
    const remainingReview = await Review.find({product:req.params.productId})
    res.status(200).json({
        status: "success",
        results: newReview.length,
        data:{
            newReview:remainingReview
        }
    })
})

exports.deleteReview = catchasynchandler(async(req,res)=>{

    console.log(req.params.reviewId);
    await Review.findByIdAndDelete(req.params.reviewId);
    const remainingReview = await Review.find({product: req.params.productId});
    console.log(remainingReview)
    res.status(200).json({
      status: "success",
      message:"review deleted",
      data:{
        data:"hello world"
      }
    })
})

exports.updateReview = catchasynchandler(async(req,res)=>{
    const Updatetour = await Review.findByIdAndUpdate(req.params.id, req.body,{
        new:true,
        runValidators:true
    });
    if(!Updatetour){
        res.status(401).json({
            status: "error"
        })
    }
    res.status(200).json({
        status: 'success',
        data: {
            product
        }
      });
})