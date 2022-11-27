const Order = require("../RouteModule/orderModule")
const catchasynchandler = require("../middleware/CatchasyncError");

exports.getAllOrders = catchasynchandler(async(req,res)=>{
    let filter ={};
    if(req.user.id) filter={user:req.user.id}
    const AllOrder = await Order.find(filter);
    console.log(AllOrder);
    res.status(200).json({
        status: 'success',
        data: {
            AllOrder 
        }
    })
})


exports.getOrder = catchasynchandler(async(req,res)=>{
    const orderId = req.params.orderId;
    const singleOrder = await Order.findById(orderId);
    res.status(200).json({
        status: 'success',
        data: {
            singleOrder 
        }
    })
})


exports.createOrder = catchasynchandler(async(req,res)=>{
    const userId = req.user.id;
    const orderBody = req.body;
    if(userId){
        const Ordered = {...orderBody, user:userId};
        console.log(Ordered)
        const createOrder = await Order.create(Ordered);
        res.status(200).json({
            statu:"success",
            data:{
                createOrder
            }
        })
    }else{
        res.status(400).status({
            status:'error',
            message: "something wrong from server, authentication problem"
        })
    }
})

exports.updateOrder = catchasynchandler(async(req,res)=>{
        const UpdateOrder = await Order.findByIdAndUpdate(req.params.orderId, req.body,{
            new:true,
            runValidators:true
        })
        res.status(200).json({
            status: 'success',
            data: {
                UpdateOrder
            }
          });
})

exports.deleteOrder = catchasynchandler(async(req,res)=>{
    await Order.findByIdAndDelete(req.params.orderId);
    res.status(200).json({
      status: "success",
      message:"tour deleted"
    })
})