const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        //trying to connect the mongoose
        await mongoose.connect(process.env.DATABASE_URI, {
            useUnifiedTopology : true
        })
    } catch (err) {
        console.log(err);
    }

}
module.exports = connectDB;