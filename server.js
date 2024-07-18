const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoute');
const cors = require('cors');
//configure env
dotenv.config({path : './config.env'});

//database config
connectDB();

//rest object
const app = express();

//middlewares
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

//routes
app.use('/api/v1/auth', authRoutes);

//rest api
app.get('/', (req, res) =>{
    res.send({
        message:"Welcome to the Node.js API"
    })
})

const PORT = process.env.PORT || 8080;

//run listen
app.listen(process.env.PORT, ()=>{console.log(`Server runnnig on ${process.env.DEV_MODE} mode on port ${PORT}`)});