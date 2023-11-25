const section = require("../models/section");
const subSection = require("../models/subSection");
const {uploadFileToCloudinary} = require("../utils/imageUploader");
require("dotenv").config();


exports.createSubSection = async(req, res) =>{
    try {
        // data fetch 
        const {title, description, timeDuration, sectionId, videoFile} = req.body;
        // extract video file 
        const video = req?.files?.videoFile;
        console.log("Drop wali video", video);

        if(video && videoFile){
            return res.status(404).json({
                success: false,
                message: "Both file are not required"
            })
        }
        if(videoFile){
            if(!timeDuration){
                return res.status(404).json({
                    success:false,
                    message:"Time Duration id Compulsary with link video file "
                })
            }
        }
        // data validation
        if(!title || !description || !sectionId){
            return res.status(404).json({
                success:false,
                message:"all field are required",
            });
        }

        let newSubSection;
        if(videoFile){
            newSubSection = await subSection.create({
                title: title,
                timeDuration: timeDuration,
                description: description,
                videoUrl: videoFile,
            });
        }else{
            // upload video to cloudinary if local video is present not link 
            const uploadVideoDetails = await uploadFileToCloudinary(video, process.env.FOLDER_NAME);
            console.log("Uploaded video details", uploadVideoDetails);
            // now create subSection
            const modifiedSubSection = await subSection.create({
                title:title,
                timeDuration: uploadVideoDetails.duration,
                description: description,
                videoUrl: uploadVideoDetails.secure_url,
            })

            newSubSection = modifiedSubSection;
        }
        // upload image to cloudinary
        // const uploadDetails = await uploadFileToCloudinary(video, process.env.FOLDER_NAME);
        // console.log("The uploaded video/ image", uploadDetails);
        // // create sub-section
        // const subSectionDetails = await subSection.create({
        //     title:title,
        //     timeDuration: uploadDetails.duration,
        //     description:description,
        //     videoUrl:uploadDetails.secure_url,
        // });


        // update the section
        const updateSection = await section.findByIdAndUpdate(
            {_id:sectionId},
            {
                $push:{
                    subSection: newSubSection._id,
                }
            },
            {
                new:true
            }
        ).populate("subSection").exec();
        // printing the updated section
        console.log("the updated section would be ", updateSection);
        // return the response
        return res.status(200).json({
            success:true,
            message:"the subsection has been created successfully",
            data:updateSection,
        });
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"something wents wrong with create subSection",
            error:error.message,
        });
    }
}

// update the subsection
exports.updateSubSection = async(req, res) =>{
    try {
        // fetch the data
        const { title,timeDuration, description, subSectionId, sectionId} = req.body;
        // validation of th data of seubsection
        if(!subSectionId){
            return res.status(400).json({
                success:false,
                message:"all field are required",
            });
        }
        const subSectionDetails = await subSection.findById(subSectionId)
        if(title !== undefined){
            subSectionDetails.title = title
        }
        if(description !== undefined){
            subSectionDetails.description = description
        }
        if(req.files && req.files.videoFile !== undefined){
            const video = req.files.videoFile
            const uploadDetails = await uploadFileToCloudinary(video, process.env.FOLDER_NAME);
            subSectionDetails.videoUrl = uploadDetails.secure_url
            subSectionDetails.timeDuration = `${uploadDetails.duration}`
        }
        if(timeDuration !== undefined){
            subSectionDetails.timeDuration = timeDuration
        }

        await subSectionDetails.save();

        console.log("The updated SubSection Details", subSectionDetails);
        // update the subSection
        const updatedSecion = await section.findById(sectionId).populate("subSection");
        console.log("The updated Section is", updatedSecion);
        // return response
        return res.status(200).json({
            success:true,
            data: updatedSecion,
            message:"subSection has been updated successfull",
        });

    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"something wents wrong with update subSection",
            error: error.message,
        });
    }
}

// delete update subsection 
exports.deleteSubSection = async(req, res) =>{
    try {
        // fetch the data
        const {subSectionId, sectionId} = req.body;
        // delete the subsection
        await subSection.findByIdAndDelete({_id: subSectionId});
        // delete the file from cloudinary

        // the section will be
        const updatedSecion = await section.findByIdAndUpdate(
            {_id: sectionId},
            {
                $pull:{
                    subSection:subSectionId,
                }
            },
            {new:true},
        ).populate("subSection").exec();
        // return response
        return res.status(200).json({
            success:true,
            message:"The sub section has been deleted successfully",
            data:updatedSecion,
        })
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"something wents erong with delete controller of subsection",
            error:error.message,
        })
    }
}