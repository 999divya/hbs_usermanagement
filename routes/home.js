const express = require('express');
const route = express.Router()


route.get('/', (req,res)=>{
    res.render('index',{title:'ShopGrid-The uptimate shopping website'})
});


module.exports = route;