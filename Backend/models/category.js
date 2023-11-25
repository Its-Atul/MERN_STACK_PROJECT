const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true,
    },
    description:{
        type:String,
        trim:true,
    },
    courses:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"course",
        },
    ],
});

module.exports = mongoose.model("category", categorySchema);