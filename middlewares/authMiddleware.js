const JWT = require("jsonwebtoken");
const userModel = require("../models/userModel");
//Protect routes token base

exports.requireSignIn = async (req, res, next) => {
  try {

    const decode = JWT.verify(req
        .headers
        .authorization,
        process.env.JWT_SECRET
    );
    req.user = decode;
    next();

  } catch (err) {
    console.log(err);
    return res.status(401).json({
      status: "fail",
      message: "Unauthorized",
    });
  }
};


//admin access
exports.isAdmin = async (req,res,next) =>{
    try{
        const user = await userModel.findById(req.user._id);
        console.log(user.role);
        if(user.role !== 1){
            return res.status(401).json({
                status: "fail",
                message: "Unathorized Access",
              });
        }
        else{
            next();
        
        }
    }
    catch(err){
        console.log(err);
        
        return res.status(401).json({
            status: "fail",
            message: "Error in admin middleware",
          });
    }
}