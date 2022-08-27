const express = require('express');
const route = express.Router();
const logoutHandler = require('../controllers/logoutController');
const auth = require('../middleware/auth');


route.get('/', auth.isLogin, logoutHandler);


module.exports=route;