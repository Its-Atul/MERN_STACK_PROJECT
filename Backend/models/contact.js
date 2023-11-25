// taking instance of mongooose
const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema({
    firstName:{
        type:String,
        require:true,
    },
    lastName:{
        type:String,
    },
    email:{
        type:String,
        require:true,
        trim:true,
        unique: true,
        index: true,
    },
    contactNumber:{
        type:Number,
        require:true,
    },
    message:{
        require:true,
        type:String,
    }
});

module.exports = mongoose.model("contact", contactSchema);