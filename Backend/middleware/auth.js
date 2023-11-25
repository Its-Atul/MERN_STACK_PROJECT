const jwt = require("jsonwebtoken");
require("dotenv").config();
const user= require("../models/user");

// auth
exports.auth = async (req, res, next) =>{
    try {
        // fetch token from req ki body
        console.log("token though cookie", req.cookies.token);
        console.log("Token body", req.body.token);
        console.log("Token Header: ", req.header("Authorization").replace("Bearer ",""));
        const token = req.cookies.token || req.body.token || req.header("Authorization").replace("Bearer ","");

        // if the token is missing 
        if(!token){
            return res.status(401).json({
                success:false,
                message:"token is missing",
            });
        }

        // verify the token 
        try {
            const decode = jwt.verify(token, process.env.JWT_SECRET);
            console.log("printing the decoded payload", decode);

            req.user = decode;
        } catch (error) {
            console.log("error in verification", error );
            return res.status(401).json({
                success:false,
                message:"token is incorrect",
            })
        }
        next();
    } catch (error) {
        return res.status(501).json({
            success:false,
            message:"auth is unsuccssfull"
        })
    }
}
// isStudent
exports.isStudent = async(req, res, next) =>{
    try {
        console.log("Auth for is Student");
        if(req.user.accountType !== "Student"){
            return res.status(401).json({
                success:false,
                message:"this is a protected route for student",
            })
        }
        next();
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"user role can't be verified.",
        })
    }
}
// isADmin
exports.isAdmin = async(req, res, next) =>{
    try {
        if(req.user.accountType !== "Admin"){
            return res.status(401).json({
                success:false,
                message:"this is a protected route for Admin",
            })
        }
        next();
    } catch (error) {
        console.error("error in is Admin middleware: ", error);
        return res.status(500).json({
            success:false,
            message:"user role can't be verified.",
        })
    }
}
// isInstructor 
exports.isInstructor = async(req, res, next) =>{
    try {
        if(req.user.accountType !== "Instructor"){
            return res.status(401).json({
                success:false,
                message:"this is a protected route for Instructor",
            })
        }
        next();
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"user role can't be verified.",
        })
    }
}