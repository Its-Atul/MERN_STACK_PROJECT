const { default: mongoose } = require("mongoose");
const Course = require("../models/course");
const { instance } = require("../config/razorpay");
const User = require("../models/user");
const { courseEnrollmentEmail } = require("../mail/templates/courseEnrollmentEmail");
const courseProgress = require("../models/courseProgress");
const { paymentSuccessEmail } = require("../mail/templates/paymentSuccessMail");
const crypto = require("crypto");
const mailSender = require("../utils/mailSender");
require("dotenv").config();

exports.capturePayment = async (req, res) => {
    const userId = req.user.id;
    const { courses } = req.body;

    if (courses.length === 0) {
        return res.status(400).json({
            success: false,
            message: "Please provide courses",
        })
    }

    // to calculate the total amount
    let totalAmount = 0;
    for (const courseId of courses) {
        console.log("Printing the course Id in Capture Payment  ", courseId);
        let course;
        try {
            // find course id 
            course = await Course.findById(courseId);

            // if course not found then return the response 
            if (!course) {
                return res.status(400).json({
                    success: false,
                    message: "Course Not Found",
                });
            }

            // Check if the weither the student is enrolled or not 
            const uid = new mongoose.Types.ObjectId(userId);
            console.log("The StudentId is ", uid);
            if (course.studentsEnrolled.includes(uid)) {
                return res.status(200).json({
                    success: false,
                    message: "Student is Already Enrolled "
                })
            }

            totalAmount += course.price;
        } catch (error) {
            console.log(error)
            return res.status(500).json({ success: false, message: error.message })
        }
    }

    // create the options
    const options = {
        amount: totalAmount * 100,
        currency: "INR",
        receipt: Math.random(Date.now()).toString(),
    }

    try {
        // Initailize the payment using Razorapay 
        const paymentResponse = await instance.orders.create(options);
        console.log(paymentResponse);
        res.json({
            success: true,
            data: paymentResponse
        })
    } catch (error) {
        console.log(error)
        res
            .status(500)
            .json({ success: false, message: "Could not initiate order." })
    }
    // console.log("The user Id is : ", userId);

    // return res.status(200).json({
    //     success: true,
    //     message:"hasjkdb aksdhuh"
    // })
}

// verify Payment 
exports.verifyPayment = async (req, res) => {
    const razorpay_order_id = req.body?.razorpay_order_id;
    const razorpay_payment_id = req.body?.razorpay_payment_id;
    const razorpay_signature = req.body?.razorpay_signature;
    const courses = req.body?.courses;

    const userId = req.user.id;

    // validation 
    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature || !courses || !userId) {
        return res.status(200).json({
            success: false,
            message: "Payment Failed",
        })
    }

    let body = razorpay_order_id + "|" + razorpay_payment_id

    const expectedSignature = crypto.createHmac("sha256", process.env.RAZORPAY_SECRET).update(body.toString()).digest("hex");

    if (expectedSignature === razorpay_signature) {
        // then tum student ko enroll kara do 
        await enrollStudent(courses, userId, res);
        return res.status(200).json({
            success: true,
            message: "Payment verified"
        })
    }

    return res.status(200).json({
        success: false,
        message: " Payment Failed",
    })
}

// const student Enroll function 
const enrollStudent = async (courses, userId, res) => {
    if (!courses || !userId) {
        return res
            .status(400)
            .json({ success: false, message: "Please Provide Course ID and User ID" })
    }

    for (const courseId of courses) {
        console.log("Printing the course Id", courseId);
        try {
            // find the courses and add student id 
            const enrolledCourse = await Course.findOneAndUpdate(
                { _id: courseId },
                {
                    $push: {
                        studentsEnrolled: userId
                    }
                },
                { new: true }
            );

            if (!enrolledCourse) {
                return res.status(200).json({
                    success: false,
                    error: "Course NOt found"
                })
            }

            console.log("Updated Courses", enrolledCourse);

            // here we have to create the course progress
            const CourseprogressDetails = await courseProgress.create({
                courseID: courseId,
                userId: userId,
                completedVideos: []
            })

            // find the student and add the course
            const enrolledStudent = await User.findByIdAndUpdate(
                userId,
                {
                    $push: {
                        courses: courseId,
                        courseProgress: CourseprogressDetails._id,
                    }
                },
                { new: true }
            );

            console.log("Updated Student", enrolledStudent);

            // send email verification from course enrollment 
            const emailResponse = await mailSender(enrolledStudent.email, `Successfully Enrolled into ${enrolledCourse.courseName}`, courseEnrollmentEmail(enrolledCourse.courseName, `${enrolledStudent.firstName} ${enrolledStudent.lastName}`));

            console.log("The email response ", emailResponse.response);
        } catch (error) {
            console.log("error in enrollStudent", error);
            return res.status(400).json({ success: false, error: error.message })
        }
    }
}


// Send Payment Success Email
exports.sendPaymentSuccessEmail = async (req, res) => {
    const { orderId, paymentId, amount } = req.body

    const userId = req.user.id

    if (!orderId || !paymentId || !amount || !userId) {
        return res
            .status(400)
            .json({ success: false, message: "Please provide all the details" })
    }

    try {
        const enrolledStudent = await User.findById(userId)

        await mailSender(
            enrolledStudent.email,
            `Payment Received`,
            paymentSuccessEmail(
                `${enrolledStudent.firstName} ${enrolledStudent.lastName}`,
                amount / 100,
                orderId,
                paymentId
            )
        )
    } catch (error) {
        console.log("error in sending mail", error)
        return res
            .status(400)
            .json({ success: false, message: "Could not send email" })
    }
}