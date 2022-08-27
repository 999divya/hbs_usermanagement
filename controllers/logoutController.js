const Userdb = require('../models/users');

const logoutHandler = async (req, res, next) => {
console.log(req.session.user);
    if (req.session) {
        delete req.session.user;
        res.render('login',{message:'Logout successfully'});
    }
}
module.exports = logoutHandler;


