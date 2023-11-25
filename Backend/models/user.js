// taking the instance of mongoose
const mongoose = require("mongoose");
const { modelName } = require("./ratingAndReview");

const userSchema = new mongoose.Schema({
    firstName:{
        type:String,
        required:true,
        trim:true,
    },
    lastName:{
        type:String,
        required:true,
        trim:true,
    },
    email:{
        type:String,
        required:true,
        trim:true,
    },
    password:{
        type:String,
        required:true,
    },
    accountType:{
        type:String,
        emun:["Admin", "Student", "Instructor"],
        required:true,
    },
    active:{
        type:Boolean,
        default:true,
    },
    approved: {
        type: Boolean,
        default: true,
    },
    additionalDetails:{
        type: mongoose.Schema.Types.ObjectId,
        require:true,
        ref:"profile",
    },
    courses:[
        {
            type:mongoose.Schema.Types.ObjectId,
            require:true,
            ref:"course",
        }
    ],
    image:{
        type:String,
        require:true,
    },
    token:{
        type:String,
    },
    resetPasswordExpires:{
        type:Date,
    },
    courseProgress:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"courseProgress",
    }],
},
{timestamps:true}
);

module.exports = mongoose.model("user", userSchema);