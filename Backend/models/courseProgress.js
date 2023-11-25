const mongoose = require("mongoose");
const courseProgressSchema = new mongoose.Schema({
    courseID:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"course",
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user",
    },
    completedVideos:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"subSection",
    }],
});

module.exports = mongoose.model("courseProgress", courseProgressSchema);