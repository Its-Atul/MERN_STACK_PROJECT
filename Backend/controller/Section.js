const section = require("../models/section");
const course = require("../models/course");
const SubSectionModal = require("../models/subSection");
// create section handler 
exports.createSection = async (req, res) => {
    try {
        // data fetch
        const { sectionName, courseId } = req.body;
        // data validation 
        if (!sectionName || !courseId) {
            return res.status(400).json({
                success: false,
                message: "all feild's are required",
            })
        }
        // create section 
        const newSection = await section.create(
            { sectionName }
        );
        // update the course schema
        const updatedCourseDetails = await course.findByIdAndUpdate(
            courseId,
            {
                $push: {
                    courseContent: newSection._id,
                }
            },
            {
                new: true
            }
        ).populate({
            path: "courseContent",
            populate: {
                path: "subSection",
            }
        })
            .exec();
        // return response
        res.status(200).json({
            success: true,
            message: "Section creation is successfull",
            updatedCourseDetails,
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "something wents wrong in creation of section",
            error: error.message,
        });
    }
}

// update section handler function 
exports.updateSection = async (req, res) => {
    try {
        // data fetch 
        const { sectionName, sectionId, courseId } = req.body;
        // data validation
        if (!sectionName || !sectionId) {
            return res.status(400).json({
                success: false,
                message: "all fields are required",
            });
        }
        // update the data
        const sectionupdated = await section.findByIdAndUpdate(
            sectionId,
            {
                sectionName: sectionName,
            },
            {
                new: true,
            }
        );
        const updatedCourseDetails = await course.findById(courseId).populate({
            path:"courseContent",
            populate:{
                path:"subSection"
            }
        })
        // printing the section
        console.log("updated section", sectionupdated);
        // reuturn response
        return res.status(200).json({
            success: true,
            message: "section update is successfull",
            data: updatedCourseDetails,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "something wents wrong in updating the section",
            error: error.message,
        });
    }
}

// delete section controller
exports.deteleSection = async (req, res) => {
    try {
        // fetch the data
        const { sectionId, courseId } = req.body;
        // validation of the data
        if (!sectionId || !courseId) {
            return res.status(400).json({
                success: false,
                message: "empty section id",
            });
        }
        // /find that section
        const Section = await section.findById(sectionId);
        console.log("section and course id", sectionId, courseId);
        if(!Section){
            return res.status(404).json({
                success:false,
                meassge:"Section not found"
            })
        }
        // delete from course schema --> require that particular object id 
        // but to we need to do thos externally 
        // delect all the subsection connected with this section
        await SubSectionModal.deleteMany({_id: {$in: Section.subSection}})

        // now delete the section
        await section.findByIdAndDelete(sectionId);

        // now we need to return course in response
        const Course = await course.findByIdAndUpdate(
            {_id: courseId},
            {
                $pull:{
                    courseContent: sectionId,
                }
            },
            {new : true}
        ).populate({
            path:"courseContent",
            populate:{
                path:"subSection"
            }
        }).exec();

        // send the response
        return res.status(200).json({
            success: true,
            meassge: "section has been deleted successfully",
            data:Course,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "something wents wrong in deleting the section",
            error: error.message,
        });
    }
}