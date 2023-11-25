// here we need two handler function 
const course = require("../models/course");
const Category = require("../models/category");
const user = require("../models/user");
const { uploadFileToCloudinary } = require("../utils/imageUploader");
const section = require("../models/section");
const subSection = require("../models/subSection");
const { convertSecToDuration } = require("../utils/secToDuration");
const courseProgress = require("../models/courseProgress");
const category = require("../models/category");

require("dotenv").config();

// create course handler function 
exports.createCourse = async (req, res) => {
	try {
		// Get user ID from request object
		const userId = req.user.id;

		// Get all required fields from request body
		console.log("req.body", req.body)
		let {
			courseName,
			courseDescription,
			whatYouWillLearn,
			price,
			tag,
			category,
			status,
			instructions,
			thumbnailImage
		} = req.body;

		// Get thumbnail image from request files
		const thumbnail = req?.files?.thumbnailImage;
		console.log("Data in thumbnail",thumbnail);

		if (thumbnail && thumbnailImage) {
			return res.status(404).json({
				success: false,
				message: "Both thumbnail not allowed"
			})
		}
		// Check if any of the required fields are missing
		if (
			!courseName ||
			!courseDescription ||
			!whatYouWillLearn ||
			!price ||
			!tag ||
			!category
		) {
			return res.status(400).json({
				success: false,
				message: "All Fields are Mandatory",
			});
		}
		if (!status || status === undefined) {
			status = "Draft";
		}
		// Check if the user is an instructor
		const instructorDetails = await user.findById(userId, {
			accountType: "Instructor",
		});

		if (!instructorDetails) {
			return res.status(404).json({
				success: false,
				message: "Instructor Details Not Found",
			});
		}

		// Check if the tag given is valid
		const categoryDetails = await Category.findById(category);
		if (!categoryDetails) {
			return res.status(404).json({
				success: false,
				message: "Category Details Not Found",
			});
		}

		// Create a new course with the given details
		let newCourse;
		if (thumbnailImage) {
			newCourse = await course.create({
				courseName,
				courseDescription,
				instructor: instructorDetails._id,
				whatYouWillLearn: whatYouWillLearn,
				price,
				tag: JSON.parse(tag),
				category: categoryDetails._id,
				thumbnail: thumbnailImage,
				status: status,
				instructions: JSON.parse(instructions),
				totalCourseDuration: null,
			});
		} else {
			newCourse = await course.create({
				courseName,
				courseDescription,
				instructor: instructorDetails._id,
				whatYouWillLearn: whatYouWillLearn,
				price,
				tag: JSON.parse(tag),
				category: categoryDetails._id,
				status: status,
				instructions: JSON.parse(instructions),
				totalCourseDuration: null,
			});
		}

		if (thumbnail) {
			// Upload the Thumbnail to Cloudinary
			const thumbnailImageUrl = await uploadFileToCloudinary(
				thumbnail,
				process.env.FOLDER_NAME
			);
			console.log("thumbnail Image url", thumbnailImageUrl);

			const courseUpdated = await course.findByIdAndUpdate(newCourse._id ,{
				thumbnail: thumbnailImageUrl.secure_url,
			},
			{new: true}
			)
			newCourse = courseUpdated
		}
		
		// Add the new course to the User Schema of the Instructor
		await user.findByIdAndUpdate(
			{
				_id: instructorDetails._id,
			},
			{
				$push: {
					courses: newCourse._id,
				},
			},
			{ new: true }
		);
		// Add the new course to the Categories
		await Category.findByIdAndUpdate(
			{ _id: category },
			{
				$push: {
					courses: newCourse._id,
				},
			},
			{ new: true }
		);
		// Return the new course and a success message
		res.status(200).json({
			success: true,
			data: newCourse,
			message: "Course Created Successfully",
		});
	} catch (error) {
		// Handle any errors that occur during the creation of the course
		console.error(error);
		res.status(500).json({
			success: false,
			message: "Failed to create course",
			error: error.message,
		});
	}
};

// get all courses handler function 
exports.getAllCourses = async (req, res) => {
	try {
		const allCourses = await course.find({}, {
			courseName: true,
			courseDescription: true,
			ratingAndReviw: true,
			studentsEnrolled: true,
			thumbnail: true,
			price: true
		}).populate("instructor").exec();

		// return the response
		return res.status(200).json({
			success: true,
			message: "the dat of all courses fetched",
			data: allCourses,
		})
	} catch (error) {
		console.log("error in get all courses", error);
		return res.status(404).json({
			success: false,
			message: 'something wents wrong',
		});
	}
}

// handler/ controller function for get course detail

exports.getCourseDetail = async (req, res) => {
	try {
		// get course id
		const { courseId } = req.body;
		// find out the course details
		const courseDetails = await course.findOne(
			{ _id: courseId }
		).populate(
			{
				path: "instructor",
				populate: {
					path: "additionalDetails",
				},
			}
		)
			.populate("category")
			.populate("ratingAndReview")
			.populate({
				path: "courseContent",
				populate: {
					path: "subSection",
				}
			}).exec();

		// validation
		if (!courseDetails) {
			return res.status(401).json({
				success: false,
				message: "no course found",
			});
		}
		// console.log(courseDetails);

		// const ContentArray = courseDetails.courseContent;
		// console.log("The type of courseContent ", ContentArray);

		let totalTimeInSecond = 0;
		courseDetails.courseContent.forEach((content) => {
			content.subSection?.forEach((subSection) => {
				const timeDurationInSec = parseInt(subSection.timeDuration)
				totalTimeInSecond += timeDurationInSec
			})
		})
		const totalDuration = convertSecToDuration(totalTimeInSecond);


		// return response
		return res.status(200).json({
			success: true,
			message: "course detail fetched successfull",
			data: courseDetails,
		});
	} catch (error) {
		console.error(error);
		return res.status(500).json({
			success: false,
			message: error.message,
		});
	}
}

//  edit course details controller 
exports.editCourse = async (req, res) => {
	try {
		// fetch the data 
		const {
			courseName,
			courseDescription,
			whatYouWillLearn,
			price,
			tag,
			category,
			status,
			instructions,
			courseId
		} = req.body;

		// validation on the course
		if (!courseId) {
			return res.status(400).json(
				{
					success: false,
					message: "no course found for this id",
				}
			);
		}

		const courseDetails = await course.findById(courseId).populate(
			{
				path: "instructor",
				populate: {
					path: "additionalDetails",
				},
			}
		)
			.populate("category")
			.populate("ratingAndReview")
			.populate({
				path: "courseContent",
				populate: {
					path: "subSection",
				}
			}).exec();

		console.log("The courseDetails", courseDetails);

		if (courseName !== undefined) {
			courseDetails.courseName = courseName
		}
		if (courseDescription !== undefined) {
			courseDetails.courseDescription = courseDescription
		}
		if (whatYouWillLearn !== undefined) {
			courseDetails.whatYouWillLearn = whatYouWillLearn
		}
		if (price !== undefined) {
			courseDetails.price = price
		}
		if (tag !== undefined) {
			courseDetails.tag = JSON.parse(tag)
		}
		// Check if the tag given is valid
		const categoryDetails = await Category.findById(category);
		// continue
		if (category !== undefined) {
			courseDetails.category = categoryDetails._id
		}
		if (instructions !== undefined) {
			courseDetails.instructions = JSON.parse(instructions)
		}

		// if the thumbnail has changed
		if (req.files && req.files.thumbnailImage !== undefined) {
			console.log("thumbnail update");
			const thumbnail = req.files.thumbnailImage;
			const thumbnailImage = await uploadFileToCloudinary(
				thumbnail,
				process.env.FOLDER_NAME
			);
			console.log(thumbnailImage);
		}

		// to make the course publish we need to change the status also 
		if (status !== undefined) {
			courseDetails.status = status
		}
		// to calculate the total duration
		let totalTimeInSecond = 0;
		courseDetails.courseContent.forEach((content) => {
			content.subSection.forEach((subSection) => {
				const timeDurationInSec = parseInt(subSection.timeDuration)
				totalTimeInSecond += timeDurationInSec
			})
		})
		const totalDuration = convertSecToDuration(totalTimeInSecond);

		// update in db 
		courseDetails.totalCourseDuration = totalDuration;

		// finally save the changes
		await courseDetails.save();

		const editedCourse = await course.findById(courseId).populate(
			{
				path: "instructor",
				populate: {
					path: "additionalDetails",
				},
			}
		)
			.populate("category")
			.populate("ratingAndReview")
			.populate({
				path: "courseContent",
				populate: {
					path: "subSection",
				}
			}).exec();

		// return response
		res.status(200).json({
			success: true,
			message: "edit course is successfull",
			data: editedCourse,
		})

	} catch (error) {
		return res.status(500).json({
			success: false,
			message: "Something wents wrong with edit course",
			error: error.message,
		})
	}
}

// get all the instructor courses
exports.getInstructorCourses = async (req, res) => {
	try {
		// fetch the user id
		const instructorId = req.user.id;

		// get instructor details 
		const instructorDetails = await user.findById(instructorId).populate({
			path: "courses",
			populate: {
				path: "courseContent",
				populate: {
					path: "subSection"
				}
			}
		}).exec();

		// all courses
		const allCourses = instructorDetails.courses;
		for (const courseId of allCourses) {
			const courseDetails = await course.findOne(
				{ _id: courseId }
			).populate({
				path: "courseContent",
				populate:{
					path:"subSection"
				}
			}).exec();
			console.log("course Details of Instructor courses", courseDetails);
			// calculate the total duration of the course
			let totalTimeInSecond = 0;
			courseDetails.courseContent.forEach((content) => {
				content.subSection.forEach((subSection) => {
					const timeDurationInSec = parseInt(subSection.timeDuration)
					totalTimeInSecond += timeDurationInSec
				})
			})
			const totalDuration = convertSecToDuration(totalTimeInSecond);

			// update in db 
			courseDetails.totalCourseDuration = totalDuration;

			// finally save the changes
			await courseDetails.save();

		}

		// get the courses in the user model 
		const instructorCourses = await course.find(
			{ instructor: instructorId },
		).sort({ createdAt: -1 }).populate({
			path:"courseContent",
			populate:{
				path:"subSection",
			}
		})

		// return response 
		return res.status(200).json({
			success: true,
			message: "all the instructor courses",
			data: instructorCourses
		})
	} catch (error) {
		return res.status(404).json({
			success: false,
			message: " something wents wrong with get instructor course",
			error: error.message,
		})
	}
}

// delete course controller 
exports.deleteCourse = async (req, res) => {
	try {
		// find the course 
		const { courseId } = req.body;
		const InstructorId = req.user.id;

		// validation on the course 
		const courseDetails = await course.findById(courseId);
		if (!courseDetails) {
			return res.status(400).json({
				success: true,
				massage: " NO course found",
			});
		}

		// unEnroll the enrolled students
		const EnrolledStudents = courseDetails.studentsEnrolled
		for (const studentId of EnrolledStudents) {
			await user.findByIdAndUpdate(studentId, {
				$pull: { courses: courseId },
			})
		}

		// need to delete subsection and section 
		const courseSection = courseDetails.courseContent
		for (const sectionId of courseSection) {
			// fisrtly delete subsection 
			const Section = await section.findById(sectionId);
			if (Section) {
				const SubSection = Section.subSection;
				for (const subSectionId of SubSection) {
					await subSection.findByIdAndDelete(subSectionId);
				}
			}
			// delete the section 
			await section.findByIdAndDelete(sectionId);
		}

		// at last delete the course 
		await course.findByIdAndDelete(courseId);

		// delete the object id from the instructor user also 
		const updatedInstructorDetails = await user.findByIdAndUpdate(
			{ _id: InstructorId },
			{
				$pull: {
					courses: courseId,
				}
			},
			{ new: true }
		)
		// delete object Id from Category 
		const categoryId = courseDetails.category;
		console.log("The category Id is ", categoryId);

		const updatedCategory = await category.findByIdAndUpdate(
			{ _id: categoryId },
			{
				$pull: {
					courses: courseId,
				}
			},
			{
				new: true,
			}
		)
		return res.status(200).json({
			success: true,
			message: "Course deletion successful",
			data: updatedInstructorDetails,
		});
	} catch (error) {
		return res.status(500).json({
			success: false,
			message: "Their is something wrong with th deletion function",
			error: error.message,
		});
	}
}

// delete all courses in My profile 
exports.deleteAllCourses = async (req, res) => {
	// get the instructor id 
	const InstructorId = req.user.id;

	// get the Get the instructor details 
	const instructorDetails = await user.findById(InstructorId).populate({
		path: "courses",
		populate: {
			path: "courseContent",
			populate: {
				path: "subSection"
			}
		}
	}).exec();

	const allCourses = instructorDetails.courses;
	for (const courseId of allCourses) {
		const courseDetails = await course.findById(courseId);
		// console.log("all the courses ", courseDetails);
		if (courseDetails) {
			// need to delete subsection and section 
			const courseSection = courseDetails.courseContent
			for (const sectionId of courseSection) {
				// fisrtly delete subsection 
				const Section = await section.findById(sectionId);
				if (Section) {
					const SubSection = Section.subSection;
					for (const subSectionId of SubSection) {
						await subSection.findByIdAndDelete(subSectionId);
					}
				}
				// delete the section 
				await section.findByIdAndDelete(sectionId);
			}
		}
		// ATlast delete the course
		await course.findByIdAndDelete(courseId);

		// delete the course from category also 
		const categoryId = courseDetails.category;
		// console.log("The category Id is ", categoryId);

		await category.findByIdAndUpdate(
			{ _id: categoryId },
			{
				$pull: {
					courses: courseId,
				}
			},
			{
				new: true,
			}
		)
		// at last the instructor updated will be 
		await user.findByIdAndUpdate(
			{ _id: InstructorId },
			{
				$pull: {
					courses: courseId,
				}
			},
			{ new: true }
		);
		// unEnroll the enrolled students
		const EnrolledStudents = courseDetails.studentsEnrolled
		for (const studentId of EnrolledStudents) {
			await user.findByIdAndUpdate(studentId, {
				$pull: { courses: courseId },
			})
		}
	}
	const updatedInstructorDetails = await user.findById(InstructorId);
	return res.status(200).json({
		success: true,
		message: "All courses deleted Successfully",
		data: updatedInstructorDetails,
	})
}
//  get full course Details 
exports.getFullCourseDetails = async (req, res) => {
	try {
		const { courseId } = req.body;
		const userId = req.user.id;
		const courseDetails = await course.findOne({
			_id: courseId
		}).populate({
			path: "instructor",
			populate: {
				path: "additionalDetails",
			},
		})
			.populate("category")
			.populate("ratingAndReview")
			.populate({
				path: "courseContent",
				populate: {
					path: "subSection",
				}
			}).exec();

		// if course not found 
		if (!courseDetails) {
			return res.status(404).json({
				success: false,
				message: `couldn't need data of the course with course ${courseId}`
			})
		}

		// to calculate the total duration
		let totalTimeInSecond = 0;
		courseDetails.courseContent.forEach((content) => {
			content.subSection.forEach((subSection) => {
				const timeDurationInSec = parseInt(subSection.timeDuration)
				totalTimeInSecond += timeDurationInSec
			})
		})
		const totalDuration = convertSecToDuration(totalTimeInSecond);

		// course prgress 
		let courseProgressCount = await courseProgress.findOne({
			courseID: courseId,
			userId: userId
		})
		// return  response
		return res.status(200).json({
			success: true,
			message: "Get full course details",
			data: {
				courseDetails,
				totalDuration,
				completedVideos: courseProgressCount?.completedVideos
					? courseProgressCount?.completedVideos
					: [],
			}
		})
	} catch (error) {
		return res.status(500).json({
			success: false,
			message: "something wents wrong in get full course controller",
			error: error.message
		})
	}
}