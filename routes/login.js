const express = require('express');
const route = express.Router();
const auth = require('../middleware/auth');
const loginHandler = require('../controllers/loginController');

route.get('/',  (req,res)=>{
    if(!req.session.user){
    res.render('login');
    }
});

console.log('Hello...hey...');

route.post('/', auth.isLogout, loginHandler);




module.exports = route;

