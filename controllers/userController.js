
const Userdb = require('../models/users');

//To get all users in the manage users list
exports.userController = async (req, res) => {
    if (req.session.user) {
        res.set('Cache-Control', 'no-store')

        const userslist = await Userdb.find();

        if (!userslist) {
            res.render('/admin/dashboard');
        } else {

            res.render('adminviews/manageusers', { Allusers: userslist });
        }
    }
    else {
        res.redirect('/login')
    }
}






//create and save new user
exports.create = (req, res) => {//all the details of the form is stored in the req.body
    if (req.session.user) {
        if (!req.body) {//user making post request with an empty body
            res.status(400).send({ message: 'content cannot be empty' });
            return;
        }
        //new user
        if(req.body.mobile.length===10){
        const user = new Userdb({//creating a new instance of userdb model
            firstname: req.body.fname,
            lastname: req.body.lname,
            email: req.body.email,
            mobile: req.body.mobile,
            password: req.body.fname,
          
        })

      
        //save user in the database
        user//utilising chaining method
            .save(user)//save will save the user data in the mongodb database
            .then(data => { //callback function
                // res.send(data);
                res.render('adminviews/manageusers');
            })
            .catch(err => {//catch the method using catch method 
                res.status(500).send({
                    message: err.message || 'some error occured while creating a create operation'
                });
            })
        }else{
            res.render('adminviews/addusers',{'message':"Mobile number should be 10 digits"});
        }
    }
      
    }


//To retrieve all users/retrieve a single user
exports.find = (req, res) => {
    if (req.session.user) {

        if (req.query.searchdata) {
            var query = {
                firstname: req.query.searchdata
            };
            Userdb.find(query)
                .then(data => {
                    if (!data) {
                        res.status(404).send({ message: 'Not found user with Firstname' + query })
                    } else {
                        res.render('adminviews/manageusers', { Allusers: data });
                    }
                })
                .catch(err => {
                    console.log(err.message);
                })
        } else

            Userdb.find()
                .then(user => {
                    res.redirect('/admin/manage-users');
                })
                .catch(err => {
                    console.log(err.message);
                })
    }
}




//To get data to the edit-user form
exports.getdata = async (req, res) => {
    if (req.session.user) {
        const data = await Userdb.findOne({ _id: req.params.id }).exec();

        res.render('adminviews/editusers', { data: data });
    }
}





//Update a new identified user by user id
exports.update = async (req, res) => {
    if (req.session.user) {

        if (!req.body) {
            return res.send({ message: "Data to update can not be empty" })
        }
        const id = req.params.id;

        const doc = await Userdb.findOneAndUpdate({
            _id: req.body._id
        }, {

            firstname: req.body.fname,
            lastname: req.body.lname,
            email: req.body.email,
            mobile: req.body.mobile

        }, { upsert: true, useFindAndModify: false });
   
        const User = await Userdb.find();
        if (!User) return res.status(204).json({ 'message': 'No User found.' });
        res.redirect('/admin/manage-users');
}
}



//Delete a user with specified user id in the request
exports.delete = async (req, res) => {
    if (req.session.user) {
      console.log(req.params.id);
        const result = await Userdb.deleteOne({ _id: req.params.id });
        const User = await Userdb.find();
        if (!User) return res.status(204).json({ 'message': 'Could not delete user' });
        res.redirect('/admin/manage-users');
    }
}






