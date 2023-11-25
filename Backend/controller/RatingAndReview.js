const ratingAndReview = require("../models/ratingAndReview");
const course = require("../models/course");
const { default: mongoose } = require("mongoose");

// Create Rating
exports.createRating = async (req, res) => {
    try {
        // get user details 
        const userId = req.user.id;
        // fetch the data from course body
        const { rating, review, courseId } = req.body;
        // check if user is enrollled in the course or not 
        const courseDetails = await course.findOne(
            {
                _id: courseId,
                studentsEnrolled: {
                    $elemMatch: { $eq: userId }
                },
            },
        );

        if (!courseDetails) {
            return res.status(404).json({
                success: false,
                message: "student is not enrolled in course",
            })
        }
        // check if the user has rated or not because only one rating is allowed
        const alreadyReviewed = await ratingAndReview.findOne({
            user: userId,
            course: courseId,
        });
        // if already reviewed then
        if (alreadyReviewed) {
            return res.status(403).json({
                success: false,
                message: "u have already reviewed this course",
            });
        };
        // if all goes right ------> create Rating And Review
        const ratingReview = await ratingAndReview.create({
            rating, review, course: courseId,
            user: userId,
        })
        // update in course model '
        const updateCourseDetails = await course.findByIdAndUpdate(
            { _id: courseId },
            {
                $push: {
                    ratingAndReview: ratingReview._id,
                }
            },
            { new: true },
        );
        console.log("The updated cousre details bu rating and review", updateCourseDetails);
        // return response
        return res.status(200).json({
            success: true,
            message: "Rating and Review successfully",
            ratingReview,
        });
    } catch (error) {
        console.error(error);
        return res.status(400).json({
            success: false,
            message: error.message,
        });
    }
}
// average Rating 
exports.getAverageRating = async (req, res) => {
    try {
        //  get the course ID
        const courseId = req.body.courseId;
        // calculate the average rating : by making the db call and then finding the average of all the rating present in rating and review container
        const result = await ratingAndReview.aggregate([
            {
                $match:{
                    course: new mongoose.Types.ObjectId(courseId),
                }
            },
            {
                $group:{
                    _id: null,
                    averageRating:{
                        $avg: "$rating"
                    }
                }
            }
        ]);

        // return response
        // check if we have found the average rating or not 
        if(result.length >0){
            return res.status(200).json({
                success:true,
                message:"average rating fetched successfully",
                averageRating:result[0].averageRating,
                data: result
            });
        }

        // if not rating review exist means if no one has reted the course
        return res.status(200).json({
            success:true,
            message:"average rating is 0, no rating found till now",
            averageRating: 0,
        })
    } catch (error) {
        console.error(error);
        return res.status(400).json({
            success: false,
            message: error.message,
        });
    }
}


// getallRating
exports.getAllRating = async(req, res) =>{
    try {
        // fetch all the data of rating and review
        // fetching the data based on no category
        const allReview = await ratingAndReview.find(
            {}
        ).sort({rating:"desc"})
        .populate(
            {
                path:"user",
                select:" lastName email image firstName", 
            }
        )
        .populate(
            {
                path:"course",
                select:"courseName",
            }
        ).exec();
    
        // return response 
        return res.status(200).json({
            success:true,
            message:"All reviews fetched successfully",
            data:allReview,
        })
    } catch (error) {
        console.log(error);
        return res.status(400).json({
            success:false,
            message:error.message,
        });
    }
}