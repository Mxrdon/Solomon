const mongoose = require('mongoose');
const good= require('./good')

const shopSchema = mongoose.Schema({
    title: String,
    location: String,
    description:String,
    categories:{
        type: String,
        lowercase:true,
        enum:['food&pastery', 'clothing','householdappliances','technology']
    },
    goods:[{
      type:mongoose.Schema.Types.ObjectId,
      ref:'Good'
    }],
   
})


module.exports= mongoose.model('Shop',shopSchema);