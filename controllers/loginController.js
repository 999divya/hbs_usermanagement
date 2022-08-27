// inside controller we can deals with user requests for resorses from the server.
//the functions in the controller sends resorses from the server to the user.
//the control mediates between model and views, that is what mvc patter is all about
const Userdb = require("../models/users");
// const bcrypt = require('bcrypt');
const loginHandler = async (req, res) => {
  //    if(!req?.body?.email || !req?.body?.pass) return res.status(400).json({'message':'username and password is required'});

  try {
    foundUser = await Userdb.findOne({
      //checking the email and pass

      email: req.body.email,
      //  password:req.body.pass
    });
    if (!foundUser) {
      //session variable
      res.render("login");
    } else {
      foundUser.comparePassword(req.body.pass, (err, success) => {
        if (success) {
          // req.session.userId = data.unique_id;
          req.session.user = foundUser._id;
          req.session.loggedin = true; //creating a new session with the email
          if (req.session.loggedin) {
            if (foundUser.isAdmin) {
              res.render("adminviews/dashboard");
            } else {
            res.set("Cache-Control", "no-store");
              res.render("index", { user: foundUser });
             
            }
          }
        } else {
          res.render("login", { message: "Username or password is incorrect" });
        }
      });
    }

  } catch (err) {
    console.log(err.message);
  }
};

module.exports = loginHandler;
