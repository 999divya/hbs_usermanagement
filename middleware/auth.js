

const isLogin = async (req, res, next) => {
    try {
        if (req.session.user) {}
        else {
           res.redirect('/login');
        }
        next();
    } catch (error) {
        console.log(error.message);

    }
}
const isLogout = async (req, res, next) => {
    try {
        if (req.session.user) {
            if (foundUser.isAdmin) {

                res.redirect('/admin');
            }
            else {

                res.redirect('/');
            }
        }
        next();
    } catch (error) {
        console.log(error.message);
    }
}


module.exports = { 
    isLogin,
    isLogout
}