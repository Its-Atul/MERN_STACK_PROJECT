const User = require("../models/user");
const Profile = require("../models/Profile");
const { uploadFileToCloudinary } = require("../utils/imageUploader");
const Course = require("../models/course");
const courseProgress = require("../models/courseProgress");


exports.updateProfile = async(req, res) =>{
    // console.log("abcdefgh")
    try {
        // get data and userId
        const {dateOfBirth="", about="", contactNumber, gender} = req.body;
        // user id Auth controller se aa rahi hai 
        const id = req.user.id;
        // /data validation
        if( !contactNumber || !gender || !id){
            return res.status(400).json({
                success:false,
                message:"all field are required",
            });
        }
        // find profile 
        // whole user details
        const userDetails = await User.findById(id);
        // now profile id
        const profileId = userDetails.additionalDetails;
        const profileDetails = await Profile.findById(profileId);

        // update profile
        profileDetails.dateOfBirth = dateOfBirth;
        profileDetails.about= about;
        profileDetails.gender = gender;
        profileDetails.contactNumber = contactNumber;
        await profileDetails.save();

        const updatedUserDetails = await User.findById(id).populate("additionalDetails");

        // return res
        return res.status(200).json({
            success:true,
            message:"profile creation is successfull",
            profileDetails,
            updatedUserDetails
        });

    } catch (error) {
        console.log("error in the profile controller", error);
        return res.status(500).json({
            success:false,
            message:"something wents wrong with the profile controller",
        });
    }
}


// delete account function 
// schduling is pending in this code
exports.deleteAccount = async(req, res) =>{
    try {
        // get id
        const id = req.user.id; 
        // valildation of id
        const userDetails = await User.findById(id);
        if(!userDetails){
            return res.status(400).json({
                success:false,
                message:"user not found",
            });
        }

        // delete the profile
        await Profile.findByIdAndDelete({_id:userDetails.additionalDetails});
        // uneroll user from all enrollerd courses
        const coursesDetails = userDetails.courses;
        for( const courseId of coursesDetails){
           await Course.findByIdAndUpdate(courseId , {
            $pull: {
                studentsEnrolled: id,
            }
           });

        }
        // delete user
        await User.findByIdAndDelete({_id:id});
        // return res
        return res.status(200).json({
            success:true,
            message:"account deletion successfull",
        })
    } catch (error) {
        console.log("error in deletion of user account");
        return res.status(500).json({
            success:false,
            message:"some thing wents wrong",
        })
    }
}

// get user details
exports.getAllUserDetails = async(req, res) =>{
    try {
        // fetch the id
        const id=req.user.id;
        // get user Details
        const userDetails = await User.findById(id)
        .populate("additionalDetails").exec();
        console.log(userDetails);
        // return res
        return res.status(200).json({
            success:true,
            message:"user Details fetch successfully",
            data:userDetails,
        });
    } catch (error) {
        console.log("error occured in fetching the data:",error);
        return res.status(500).json({
            success:false,
            message:"something wents erong with get alluser function",
        })
    }
}

// get Enrolled courses
exports.getEnrolledCourses = async(req, res) => {
    try {
        // get the user id
        const userId = req.user.id;
        // get the user details
        let userDetails = await User.findOne(
            {_id: userId},
        ).populate({
            path:"courses",
            populate:{
                path:"courseContent",
                populate:{
                    path:"subSection"
                }
            }
        }).exec();

        // convert the string to object
        userDetails = userDetails.toObject();
        var subSectionLength = 0;
        for(var i= 0; i< userDetails.courses.length; i++){
            subSectionLength = 0;
            for(var j =0; j< userDetails.courses[i].courseContent.length; j++){
                subSectionLength += userDetails.courses[i].courseContent[j].subSection.length;
            }

            let courseProgressCount = await courseProgress.findOne({
                userId: userId,
                courseID: userDetails.courses[i]._id
            });

            courseProgressCount = courseProgressCount?.completedVideos.length;

            if(subSectionLength === 0){
                userDetails.courses[i].progressPercentage = 100
            }else{
                userDetails.courses[i].progressPercentage = Math.round((courseProgressCount/ subSectionLength) * 100);
            }

            // userDetails.courses[i].progressPercentage = Math.round((courseProgressCount/ subSectionLength) * 100);
        }

        // console.log("The sub Section length is: ", subSectionLength);

        // calculate the subSection length 
        // let subsectionLength =0;
        // userDetails.courses.forEach((course) => {
        //     course.courseContent.forEach((section) =>{
        //         subsectionLength += section.subSection.length
        //     })
        // })
        // console.log("The total subSection will be ", subsectionLength);

        if(!userDetails){
            return res.status(404).json({
                success:false,
                message:`no user found with ${userId} USER ID`,
            });
        }
        // if all goes write then return the response
        return res.status(200).json({
            success:true,
            data:userDetails.courses,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success:false,
            message:error.message,
        });
    }
}

// to update the profile picture of the user
exports.updateDisplayPicture = async(req, res) =>{
    try {
        // fetch the file
        const displayPicture = req.files.displayPicture;
        // get the user id
        const userId = req.user.id;
        // upload image to cloudinary 
        const image = await uploadFileToCloudinary(
            displayPicture,
            process.env.FOLDER_NAME,
            1000,
            1000
        );
        console.log(image);
        // update the user 
        const updateProfile = await User.findByIdAndUpdate(
            {_id:userId},
            {image: image.secure_url},
            {new:true},
        )
        // return response
        return res.status(200).json({
            success:true,
            message:"image updated successfully",
            data: updateProfile,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success:false,
            message:error.message,
        });
    }
}

exports.instructorDashboard = async(req, res) =>{
    try {
        const instructorId = req.user.id;
        const coursesDetails  = await Course.find({instructor: instructorId});

        const courseData = coursesDetails.map((course) =>{
            const totalStudentEnrolled = course.studentsEnrolled.length;
            const totalAmountEarned = course.price * totalStudentEnrolled;

            // creat an object to send the value 
            const courseData_withStat = {
                id: course._id,
                courseName : course.courseName,
                courseDescription: course.courseDescription,
                totalAmountEarned,
                totalStudentEnrolled,
            }
            return courseData_withStat;
        })

        res.status(200).json({
            courses : courseData,
        })
    } catch (error) {
        console.log("Something wents wrong: in instructor Dashboard", error);
        return res.status(501).json({
            success: false,
            message: "Internal server Error"
        })  
    }
}