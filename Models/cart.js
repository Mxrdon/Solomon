const mongoose= require('mongoose')
const shop= require('./shop')

const cartSchema = mongoose.Schema({
  title: String,
  location: String,
  description:String,
   
})


module.exports= mongoose.model('Cart',cartSchema);