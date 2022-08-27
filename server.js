require('dotenv').config();
const express = require('express');
const path = require('path');
const hbs = require('hbs');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const { v4: uuidv4 } = require('uuid');
const mongoose = require('mongoose');
const connectDB = require('./config/dbConn');
const morgan = require('morgan');
const methodOverride = require('method-override')
const app = express();
const homeRouter = require('./routes/home');
const loginRouter = require('./routes/login');
const registerRouter = require('./routes/register');
const logoutRouter = require('./routes/logout');
const adminRouter = require('./routes/admin/adminroute');


const PORT = process.env.PORT || 5500;// to put the PORT details in the .env file.if variable is not there in the .env file then http server will work on 5500 
// for parsing application/json
//returns a middleware that only parses json
app.use(bodyParser.json());

// for parsing application/xwww-
app.use(bodyParser.urlencoded({ extended: true }))

// override with the X-HTTP-Method-Override header in the request
app.use(methodOverride('_method'));

//To get the cookies inside the browser with this middleware function
app.use(cookieParser())


app.use((req, res, next) => {
    if (!req.user) {
        res.header(
            "cache-control",
            "private,no-cache,no-store, must-revalidate"
        )
        res.header("Expires","-1")
        res.header("Pragma","no-cache")
    }
    next()
})


//form-urlencoded

// app.use(morgan('tiny'));
//connect to the mongodb
connectDB();
app.use('/', express.static(path.join(__dirname, '/public/')));
app.set('views', path.join(__dirname, 'views/'));
const partialsPath = path.join(__dirname, 'views/partials');
hbs.registerPartials(partialsPath);//registering the partials path
// const layoutPath = path.join(__dirname,'views/layouts');
// hbs.registerPartials(layoutPath);//registering the partials path

app.set('view engine', 'hbs');
// app.engine('hbs', hbs({
//   extname: 'hbs',
//   defaultLayout: 'layout',
//   layoutsDir: __dirname + '/views/layout/',
//   partialsDir: __dirname + '/views/partials'
// }))


//session middleware
app.use(
    session({
        secret: uuidv4(),
        resave: false,
        saveUninitialized: true,
        // cookie:{
        //     expires:6000000
        // }
    })
)
// app.use((req, res, next) => {
//     if (req.cookies.user_sid && !req.session.email) {
//         res.clearCookie("user_sid");
//     }
//     next();
//   });



app.use('/', homeRouter);
app.use('/login', loginRouter);
app.use('/register', registerRouter);
app.use('/admin', adminRouter);
app.use('/logout', logoutRouter);

//setting one time connection and lisening for the 'open' event
mongoose.connection.once('open', () => {
    console.log('connected to mongodb');
    app.listen(PORT, () => console.log(`Listening to ${PORT}`));//http server
})
