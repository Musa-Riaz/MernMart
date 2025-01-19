const mongoose = require('mongoose');
async function connectDB(){
    try{
        const conn = await mongoose.connect(process.env.MONGO_URL.replace('<password>', process.env.DB_PASSWORD) );
        console.log(`MongoDB connected: ${conn.connection.host}`);

    }catch(err){
        console.log(err);
        process.exit(1);
    }
    
}

module.exports = connectDB;