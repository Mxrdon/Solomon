const express = require('express');
const mongoose = require('mongoose');
const path= require('path')
const methodoverride= require('method-override')
const Shop= require('./model/shop')
const Good = require('./model/good')
const Cart = require('./model/cart')




mongoose.connect('mongodb://127.0.0.1/shop',{
    useNewUrlParser:true,
    //useCreateIndex:true,
    useUnifiedTopology:true
});

const db= mongoose.connection;
db.on("error",console.error.bind(console,"connection error"));
db.once("open",()=>{
    console.log("Database connected");
});

const app= express();

const ejsmate= require('ejs-mate');
const shop = require('./model/shop');
const { findByIdAndUpdate } = require('./model/good');


app.set('view engine', 'ejs');
app.set('views',path.join(__dirname,'views'));
app.engine('ejs',ejsmate);


app.use(express.static(path.join(__dirname,'public')))
app.use(methodoverride('_method'))
app.use(express.urlencoded({extended:true})) 


//app.use(express.static(path.join(__dirname,'image')))

const categories=['food&pastery', 'clothing','householdappliances','technology'];




app.get('/home',(req,res)=>{
    res.render('home/home')
})

// app.get('/shop/order',(req,res)=>{
//     res.render('shop/order')
// })
app.get('/shop/cart',(req,res)=>{
    res.render('shop/cart')
})



app.get('/shop/shops',async(req,res)=>{
const stores = await Shop.find({});
res.render('shop/shops' ,{stores})
})

app.get('/shop/new',(req,res)=>{

    res.render('shop/new',{categories})
})

app.post('/shop/shops', async(req,res)=>{
    const shop = await Shop(req.body.shop);
    console.log(shop);
    await shop.save();
    res.redirect(`/shop/${shop._id}`)
})


app.get('/shop/:id', async (req,res)=>{
    const {id}= req.params
    const shop = await Shop.findById(id).populate('goods')
    
    res.render('shop/show',{shop})
})

app.get('/shop/order/:id',async(req,res)=>{
     const good = await Good.findById(req.params.id).populate('shops')
     const shop= await Shop.find().populate('goods').where(good);
     
     //console.log(shop);
   
     //console.log(good);
    //  await cart.save()
    //   await  good.save()
     console.log(shop);
     
    //  console.log(shop);
    //  console.log(cart);
     res.send(shop)
  // res.render('shop/order',{net})
 })



app.post('/shop/:id/item',async(req,res)=>{
const shopp= await Shop.findById(req.params.id);
const item= new Good( req.body.good);
shopp.goods.push(item);
await item.save();
await shopp.save();
console.log(shopp);

res.redirect(`/shop/${shopp._id}`)
})
1

app.post('/shop/good/:id',async(req,res)=>{
 const {id}= req.params;
    
    const good = await Good.findById(id).populate('shops')
   // console.log(good);
   


res.redirect(`/shop/order/${good._id}`)
    })














app.listen(3000,()=>{
    console.log('lets go !!');
})

