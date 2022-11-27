const mongoose = require('mongoose');
const Product = require("./productsModule")

const reviewSchema = new mongoose.Schema({
    review:{
        type: String,
        required: [true, 'review must have review string']
    },
    rating:{
        type: Number,
        min:1,
        max:5
    },
    product:{
        type: mongoose.Schema.ObjectId,
        ref: 'Product',
        required:[true, 'review must be belong to product']
        },
    user:{
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: [true, 'review must belong to product']
    }
},
{
    toJSON:{virtuals:true},
    toObject:{virtuals:true}
}
)

reviewSchema.pre(/^find/, function(next){
    this.populate({
        path: 'user',
        select: 'Username'
    })
    next();
})  


reviewSchema.statics.calculateAveragerating = async function(productId){
 console.log(productId)
    const stats = await this.aggregate([
        {
            $match: {product: productId}
        },
        {
            $group:{
                _id: '$product',
                numberrating: {$sum:1},
                averagerating: {$avg: '$rating'}
            }
        }
    ])
    console.log(stats)
    if(stats.length){
   await Product.findByIdAndUpdate(productId, {
        averagerating: stats[0].averagerating,
        numberrating:stats[0].numberrating ,
    })
}else{
    await Product.findByIdAndUpdate(productId, {
        averagerating: 0,
        numberrating:1,
    })
}
}


reviewSchema.post('save', function(){
    console.log(this.constructor, "hello world")
    this.constructor.calculateAveragerating(this.product);
})

// reviewSchema.pre(/^findOneAnd/, async function(next){
//     this.r = await this.findOne({});
//     console.log(this.r, "hello worl")
//     next();
// })

// reviewSchema.post(/^findOneAnd/, async function(){
//     console.log("hello world post wallah")
//     await this.r.constructor.calculateAveragerating(this.r.product)
// })


const Review = mongoose.model('Review', reviewSchema)

module.exports = Review;