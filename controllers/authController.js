const userModel = require('../models/userModel');
const {comparePassword,hashPassword} = require('../utils/authHelper');
const JWT = require('jsonwebtoken');
exports.registerController = async (req, res) => {
 
    try{
        const {name, email, password, phone, address} = req.body;
        //validation
        if(!name){
            return res.status(400).json({
                status: 'fail',
                message: 'Please provide a name'
            })
        }
        if(!email){
            return res.status(400).json({
                status: 'fail',
                message: 'Please provide a email'
            })
        }
        if(!password){
            return res.status(400).json({
                status: 'fail',
                message: 'Please provide a password'
            })
        }
        if(!phone){
            return res.status(400).json({
                status: 'fail',
                message: 'Please provide a phone number'
            })
        }
        if(!address){
            return res.status(400).json({
                status: 'fail',
                message: 'Please provide a address'
            })
        }

        //check if the user already exists
        const existingUser = await userModel.findOne({email: email});
        if(existingUser){
            res.status(400).json({
                status: 'fail',
                message: 'User already exists'
            })
        }

        //register user
        const hashedPassword = await hashPassword(password);

        //save user
        const user = await new userModel({name, email, phone, address, password: hashedPassword}).save();

        res.status(201).json({
            status: 'success',
            message: 'User registered successfully',
            user
        })
    }
    catch(error){
        res.status(500).json({
            status: 'fail',
            message: 'Error in registration',
            error
        })
    }
}

//POST LOGIN

exports.loginController = async (req, res) =>{
    try{

        const {email, password} = req.body;
        //validation
        if(!email || !password){
            return res.status(400).json({
                status: 'fail',
                message: 'Invalid email or password'
            })
        }
        //check user
        const user = await userModel.findOne({email});
        if(!user){
            return res.status(404).json({
                status: 'fail',
                message: 'Email is not registered'
            })
        }
        const match = await comparePassword(password, user.password); //we are using user.password because we are getting the user from the database and in the database the password is hashed
        if(!match){
            return res.status(200).json({
                status: 'fail',
                message: 'Invalid password'
            })
        }
        //generate token
        const token =  JWT.sign({id: user._id}, process.env.JWT_SECRET, {expiresIn:'7d'});

        res.status(200).json({
            status: 'success',
            message: 'User logged in successfully',
            token,
            user:{
                name : user.name,
                email : user.email, 
                phone : user.phone,
                address : user.address
            }
        })
    }catch(err){
        console.log(error);
        res.status(500).json({
            status: 'fail',
            message: 'Error in login',
            error
        })
    }
}

//test controller
exports.testController = async (req, res)=>{
    console.log("protected route")
}