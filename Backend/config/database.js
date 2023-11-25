// taking the instance of mangoose
const mongoose = require("mongoose");
// importing the url of mongo db from 
require("dotenv").config();

exports.connectdb = () =>{
    mongoose.connect(process.env.DATABASE_URL,{
        useNewUrlParser:true,
        useUnifiedTopology:true,
    }).then(() => {
        console.log("db connection successfull");
    }).catch((error)=>{
        console.log("issue in db connection");
        console.error(error);
        process.exit(1);
    })
}