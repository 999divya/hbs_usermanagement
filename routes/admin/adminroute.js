const express = require('express');
const route = express.Router();
const auth = require('../../middleware/auth');

const userControllers = require('../../controllers/userController');


route.get('/', auth.isLogin, (req, res)=>{
    if(req.session.user){
    res.set('Cache-Control', 'no-store')
    res.render('adminviews/dashboard');
    }
    else{
        res.render('login')
    }
    
});



route.get('/add-users', auth.isLogin, (req,res)=>{
    if(req.session.user){
        res.set('Cache-Control', 'no-store')
        res.render('adminviews/addusers');
    }
    else{
        res.render('login')
    }
    
});

route.get('/edit-users/:id',  userControllers.getdata);


route.get('/manage-users', userControllers.userController);

//creating APIs

route.post('/api/users',userControllers.create);

route.get('/api/users', userControllers.find);

route.put('/api/users/:id', userControllers.update);

route.delete('/api/users/:id', userControllers.delete);

module.exports = route;