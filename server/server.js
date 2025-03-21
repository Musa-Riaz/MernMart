const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoute');
const categoryRoutes = require('./routes/categoryRoutes');
const productRoutes = require('./routes/productRoutes');
const path = require('path');
const cors = require('cors');
//configure env
dotenv.config({path : './config.env'});

//database config
connectDB();

//rest object
const app = express();

//middlewares-
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
// app.use(express.static(path.join(__dirname, "./client/build")))

//routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/category', categoryRoutes);
app.use('/api/v1/product', productRoutes);

//rest api
// app.use("*", function(req, res){
//     res.sendFile(path.join(__dirname, "./client/build/index.html"));
// })



const PORT = process.env.PORT || 8080;

//run listen
app.listen(process.env.PORT, ()=>{console.log(`Server runnnig on ${process.env.DEV_MODE} mode on port ${PORT}`)});