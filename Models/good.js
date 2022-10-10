const mongoose = require('mongoose');
const shop= require('./shop')
const cart = require('./cart')

const goodSchema= mongoose.Schema({
    title:String,
    price:Number,
    shops:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Shop'
      }],
      carts:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Cart'
      }]
      
})


module.exports=mongoose.model('Good',goodSchema)