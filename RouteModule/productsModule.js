const mongoose = require('mongoose');

const productschema = new mongoose.Schema({
    name:{
        type: String,
        required: [true, 'a tour must have a name'],
        unique: true,
        trim: true,
    },
    price:{
        type: Number,
        required: [true, 'a tour must have a name']
    },
    averagerating:{
        type: Number,
        min:1,
        max:5,
        default:1
    },
    numberrating:{
         type:Number
    },
    description:{
        type: String,
        trim: true
    },
    stock:{
        type:Number,
        min:1,
        max:5
        },
    discount:{
        type:Number
        },
    shop:{
        type: mongoose.Schema.ObjectId,
        ref: 'Shop',
        required: [true, 'a product must be belong to shop']
    },
    image:{
        type: String,
        required: [true, 'a product must be belong to shop']
    },
    category:{
        type:String,
        require: [true, "Product must be belong to some category"]

    }
},
{
    toJSON:{virtuals:true},
    toObject:{virtuals:true}
}
)

// virtual Populate
productschema.virtual('reviews',{
    ref: 'Review',
    foreignField: 'product',
    localField: '_id'
});


productschema.pre(/^find/, function(next){
    this.populate({
        path: 'shop',
        select: 'name'
    })
    next();
})

const Product = mongoose.model('Product', productschema)
module.exports = Product;