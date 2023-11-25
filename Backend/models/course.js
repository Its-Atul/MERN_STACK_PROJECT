const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
    courseName: {
        type: String,
        required: true,
        trim: true,
    },
    courseDescription: {
        type: String,
        trim: true,
    },
    instructor: {
        type: mongoose.Schema.Types.ObjectId,
        required:true,
        ref: "user",
    },
    whatYouWillLearn: {
        type: String,
    },
    courseContent: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref:"section",
        }
    ],
    ratingAndReview: [
        {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "ratingAndReview",
        }
    ],
    price: {
        type: Number,
        require: true,
    },
    thumbnail: {
        type: String,
    },
    tag:{
        type:[String],
        required:true,
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "category",
    },
    studentsEnrolled: [
        {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "user",
        }
    ],
    instructions: {
		type: [String],
	},
	status: {
		type: String,
		enum: ["Draft", "Published"],
	},
    totalCourseDuration:{
        type: String,
    },
},
{timestamps:true},
);

module.exports = mongoose.model("course", courseSchema);