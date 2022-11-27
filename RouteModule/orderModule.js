const mongoose = require("mongoose");

const orderschema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.ObjectId,
        required:[true, "cart product must have user"]
    },
    orderedItems:Array,
    location:{
            type: "string",
            required: [true, "a location must be there"]
    },
    amount:{
        type: Number,
        required: [true, "Total amount must be there"]

    },
    created: {
        type: Date,
        default: Date.now()
    },
    packaging:{
        type: Boolean,
        default: false
    },
    traveling:{
        type: Boolean,
        default: false
    },
    delivered:{
        type: Boolean,
        default: false
    },
    received:{
        type: Boolean,
        default: false
    }
},
{
    toJSON:{virtuals:true},
    toObject:{virtuals:true}
}
)

orderschema.pre(/^find/, function(next){
   this.populate({
        path: 'orderedItems',
        populate:{
            path: 'productId',
            model: 'Product'
        }
   })
    next();
})


const Order = mongoose.model('Order', orderschema)
// console.log(Product);
module.exports = Order;