const Userdb = require('../models/users');


const registerHandler = async (req, res) => {
    // res.status(200).send("ok")

    const { fname, lname, email, mobile, pass, repass, isAdmin } = req.body;
    
    if (pass.length > 7 && mobile.length==10) {

    if (fname && lname && email && mobile) {

            if (req.body.pass === req.body.repass) {
                //checking for duplicate user in the database
                const duplicate = await Userdb.findOne({ email: req.body.email }).exec();
                console.log(duplicate);

                if (duplicate) {
                    res.render('register', { message: 'Duplicate user found' })
                } else {

                    try {

                        const result = await Userdb.create({
                            "firstname": fname,
                            "lastname": lname,
                            "email": email,
                            "mobile": mobile,
                            "password": pass,
                            "isAdmin":true 
                        })
                        await result.save();
                        res.redirect('/login');
                    


                    } catch (err) {
                        console.log(err.message)
                    }
                }
            }
    }
}else{
    res.render('register',{message:'Password length prefered 7 or mobile number should be 10'});
}

}

module.exports = registerHandler;