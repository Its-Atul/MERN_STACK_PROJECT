const mongoose = require("mongoose");
const subSection = require("../models/subSection");
const courseProgress = require("../models/courseProgress");


exports.CourseProgressVideo = async (req, res) => {
    const { courseId, subSectionId } = req.body;
    const userId = req.user.id;

    try {
        // /check the subSection
        const subSectionDetails = await subSection.findById(subSectionId);
        console.log("The SubSection details", subSectionDetails)
        // /validagte 
        if (!subSectionDetails) {
            return res.status(404).json({
                success: false,
                message: "subSection not found"
            })
        }

        // find the course Progress modal 
        let CourseprogressDetails = await courseProgress.findOne({
            courseID: courseId,
            userId: userId
        })
        console.log("The coursePrgress Data", CourseprogressDetails);

        // if (!CourseprogressDetails) {
        //     // if course Details not found then we have to create a new one 
        //     CourseprogressDetails = await courseProgress.create({
        //         courseID: courseId,
        //         userId: userId,
        //         completedVideos: []
        //     })
        // }

        if (CourseprogressDetails.completedVideos.includes(subSectionId)) {
            return res.status(400).json({
                success: false,
                message: "AlREADy MARK AS READ"
            })
        }

        // /otherwise push the data
        CourseprogressDetails.completedVideos.push(subSectionId);

        // save or updated the course progress
        await CourseprogressDetails.save();


        // updated course progress
        const updatedCoursePr = await courseProgress.findOne({
            courseID: courseId,
            userId: userId,
        })

        // restunr the result 
        return res.status(200).json({
            success: false,
            message: "Video mARKED as READ",
            data: updatedCoursePr,
        })
    } catch (error) {
        console.log("Something wents wrong ", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        })
    }
}