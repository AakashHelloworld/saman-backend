const Shop = require("../RouteModule/shopModule");
const catchasynchandler = require("../middleware/CatchasyncError");

exports.getAllShops = catchasynchandler(async(req,res)=>{
    const ShopAll =await Shop.find().populate({path:'products'});
    res.status(200).json({
        status: "success",
        results: ShopAll.length,
        data:{
            ShopAll
        }
    }) 
}) 


exports.getShop = catchasynchandler( async (req, res) => {
    console.log("get products details")
  const shop = await Shop.findById(req.params.shopId).populate({path:'products'}).populate('reviews');
  res.status(200).json({
    status: 'success',
    data: {
        shop
    }
  });
  }
  );


  exports.updateShop = catchasynchandler( async(req, res) => {
    const shop = await Shop.findByIdAndUpdate(req.params.shopId, req.body, {
    new: true,
    runValidators: true
    })
      res.status(200).json({
        status: 'success',
        data: {
            shop
        }
      });
    });

exports.deleteShop = catchasynchandler( async(req, res) => {
        await Shop.findByIdAndDelete(req.params.shopId)
          res.status(200).json({
            status: 'success',
            message: 'Deleted!'
          });
        });

exports.createShop = catchasynchandler(async(req,res)=>{
    const newShop = await Shop.create(req.body);
    res.status(201).json({
        status: 'success',
        data:{
            shop: newShop
        }
})
})
