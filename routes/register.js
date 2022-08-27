const express = require('express');
const registerHandler = require('../controllers/registerController');
const route = express.Router();
const auth = require('../middleware/auth');

route.get('/', (req,res)=>{
    
    res.render('register');
})

route.post('/', auth.isLogout, registerHandler);

module.exports = route;
