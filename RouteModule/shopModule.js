const mongoose = require('mongoose');

const shopSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true, 'shop must have name']
    },
    description:{
        type:String,
        required:[true, 'shop must have description']
    },
    verified:{
        type:Boolean,
    },
    averagerating:{
            type: Number,
            min:1,
            max:5
    },
    numberrating:{
            type:Number,
    }
},
{
    toJSON:{virtuals:true},
    toObject:{virtuals:true}
}
)

shopSchema.virtual('products',{
    ref: 'Product',
    foreignField: 'shop',
    localField: '_id'
});

shopSchema.virtual('reviews',{
    ref: 'ReviewShop',
    foreignField: 'shop',
    localField: '_id'
})


const Shop = mongoose.model('Shop', shopSchema)

module.exports = Shop;