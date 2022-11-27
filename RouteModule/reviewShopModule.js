const mongoose = require('mongoose');
const Shop = require("./shopModule")

const reviewShopSchema = new mongoose.Schema({
    review:{
        type: String,
        required: [true, 'review must have review string']
    },
    rating:{
        type: Number,
        min:1,
        max:5
    },
    user:{
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: [true, 'review must belong to product']
    },
    shop: {
        type: mongoose.Schema.ObjectId,
        ref: 'Shop',
        required: [true, "shop Id must be there"]
    }
},
{
    toJSON:{virtuals:true},
    toObject:{virtuals:true}
});


reviewShopSchema.pre(/^find/, function(next){
    this.populate({
        path:'user',
        select: 'name'
    })
    next();
})

reviewShopSchema.statics.calculateAveragerating = async function(shopId){
    const stats = await this.aggregate([
         {
             $match: {shop: shopId}
         },
         {
             $group:{
                 _id: '$product',
                 numberrating: {$sum:1},
                 averagerating: {$avg: '$rating'}
             }
         }
     ])
     if(stats.length){
    await Shop.findByIdAndUpdate(shopId, {
         averagerating: stats[0].averagerating,
         numberrating:stats[0].numberrating ,
     }).clone();
 }else{
     await Shop.findByIdAndUpdate(shopId, {
         averagerating: 1,
         numberrating:0,
     });
 }
 }
 
 reviewShopSchema.post('save', async function(){
     await this.constructor.calculateAveragerating(this.shop);
 })
 

//  reviewShopSchema.pre(/^findOneAnd/, async function(next) {
//     this.r = await this.findOne();
//     next();
//   });
  
//   reviewShopSchema.post(/^findOneAnd/, async function() {
//     await this.r.constructor.calculateAveragerating(this.r.tour);
//   });

const ReviewShop = mongoose.model('ReviewShop', reviewShopSchema)

module.exports = ReviewShop