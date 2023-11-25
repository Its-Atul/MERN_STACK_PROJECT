// otp handler
const User = require("../models/user");
const OTP = require("../models/otp");
const otpGenerator = require("otp-generator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Profile = require("../models/Profile");
const mailSender = require("../utils/mailSender");
const { passwordUpdate } = require("../mail/templates/passwordUpdate");
require("dotenv").config();

// creating send otp function
// here the generate otp code is written with bad practice in industry me use other already made things
exports.sendOTP = async (req, res) => {
    try {
        // fetch email from body
        const { email } = req.body;

        // if user already exist then send him to login
        const checkExistingUser = await User.findOne({ email });

        // if user already exists;
        if (checkExistingUser) {
            return res.status(401).json({
                success: false,
                message: "please go to login page",
            });
        }

        // if user not exists the generate otp 
        var otp = otpGenerator.generate(6, {
            upperCaseAlphabets: false,
            lowerCaseAlphabets: false,
            specialChars: false,
        });

        console.log("printing the otp generated", otp);

        // now we have to make sure that the otp is unique \
        // so we first need to check otp 
        const result = await OTP.findOne({ otp: otp });
        console.log("Result is Generate OTP Func");
        console.log("OTP", otp);
        console.log("Result", result);
        // is we got the same otp then we will generate new otp
        while (result) {
            otp = otpGenerator.generate(6, {
                upperCaseAlphabets: false,
                lowerCaseAlphabets: false,
                specialChars: false,
            });
            result = await OTP.findOne({ otp: otp });
        }

        // create oject of otp / payload
        otpPayload = { email, otp }

        // create an entry in db 
        const otpBody = await OTP.create(otpPayload);
        console.log("the otp body will look like in db", otpBody);

        // at last return the response\
        return res.status(200).json({
            success: true,
            message: "otp send is successfull",
            data: otp,
        })
    } catch (error) {
        console.log("Error in send otp :", error)
        return res.status(400).json({
            success: false,
            message: "something wents wrong in sending otp",
        })
    }
}

// Sign up handler
exports.signUp = async (req, res) => {
    try {
        // data fetch from request body
        const {
            firstName,
            lastName,
            email,
            password,
            confirmPassword,
            accountType,
            contantNumber,
            otp
        } = req.body;
        // validation of the data 
        if (!firstName || !lastName || !email || !password || !confirmPassword || !otp) {
            return res.status(403).json({
                success: false,
                message: "please first fill all the details",
            })
        }
        // dono password ko match karo 
        if (password !== confirmPassword) {
            return res.status(401).json({
                success: false,
                message: "password doesn't match",
            });
        }
        // check the user already exsist or not 
        const checkExistingUser = await User.findOne({ email });
        if (checkExistingUser) {
            return res.status(400).json({
                success: false,
                message: "the user already exist! please go to login page",
            })
        }
        // find the most recent otp 
        const recentOtp = await OTP.find({ email }).sort({ createdAt: -1 }).limit(1);
        console.log("printing the recent otp", recentOtp);
        // validate the otp 
        if (recentOtp.length === 0) {
            return res.status(400).json({
                success: false,
                message: "otp not found",
            })
        } else if (otp !== recentOtp[0].otp) {
            return res.status(400).json({
                success: false,
                message: "Invalid otp "
            })
        }
        // hash the password
        let hashedPassword;
        try {
            hashedPassword = await bcrypt.hash(password, 10);
        }
        catch (err) {
            return res.status(500).json({
                success: false,
                message: 'Error in hashing Password',
            })
        }
        // create the user 
        let approved = "";
        approved === "Instructor" ? (approved = false) : (approved = true);
        // then create entry in th db 
        // we need to create profile details to create entry in user 
        const profileDetails = await Profile.create({
            gender: null,
            dateOfBirth: null,
            about: null,
            contantNumber: null,
        })
        // creatin entry in user 
        const user = await User.create({
            firstName,
            lastName,
            email,
            accountType,
            password: hashedPassword,
            contantNumber,
            additionalDetails: profileDetails._id,
            image: `https://api.dicebear.com/6.x/initials/svg?seed=${firstName} ${lastName}`,
        })
        // res 
        return res.status(200).json({
            success: true,
            message: "sign up is successfull",
            user,
        })
    } catch (error) {
        console.log("error in sign up", error);
        return res.status(400).json({
            success: false,
            message: "something wents wrong in sign up"
        })
    }
}
// login handler
exports.login = async (req, res) => {
    try {
        // fetch data from the req body 
        const { email, password } = req.body;
        // validation of email and password
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "please fill all the details",
            });
        }
        // check user user exist or not 
        const user = await User.findOne({ email }).populate("additionalDetails");
        // if user not found
        if (!user) {
            return res.status(401).json({
                success: false,
                message: "please first register yourself",
            });
        }
        // check either password is correct
        if (await bcrypt.compare(password, user.password)) {
            // /make the payload
            const payload = {
                email: user.email,
                id: user._id,
                accountType: user.accountType,
            }
            const token = jwt.sign(payload, process.env.JWT_SECRET, {
                expiresIn: "3d"
            });

            user.token = token;
            // undefine the password
            user.password = undefined;
            //  creating options for cookie
            const options = {
                expires: new Date(Date.now() + 3 * 24 * 60 * 60),
                httpOnly: true,
            }
            // create the cookie
            res.cookie("token", token, options).status(200).json({
                success: true,
                token,
                user,
                message: "cookie has been successfully created, login is successfull",
            })
        } else {
            return res.status(401).json({
                success: false,
                message: "password is incorrect",
            })
        }
    } catch (error) {
        console.log("error occured in login", error);
        return res.status(400).json({
            success: false,
            message: "something wents wrong in login",
        })
    }
}
// change password handler
exports.changePassword = async (req, res) => {

    try {
        // fetch data from req, body
        const { oldPassword, newPassword } = req.body;
        const userId = req.user.id;
        console.log("user id", userId);

        // find the user from
        const user = await User.findById(userId);

        // check either the current password matches with the user's current password
        const isPasswordCorrect = await bcrypt.compare(
            oldPassword, user.password
        );
        if (!isPasswordCorrect) {
            return res.status(401).json({
                success: false,
                message: "Invalid Password",
            });
        };
        // Mathc the new password
        // if(newPassword !== confirmNewPassword){
        //     return res.status(400).json({
        //         success:false,
        //         message:"please match both the passwords",
        //     })
        // };
        // now if all fine then hash the new password 
        let hashPassword;
        try {
            hashPassword = await bcrypt.hash(newPassword, 10);
        } catch (error) {
            console.log("error in hashing password in change password", error);
            return res.status(400).json({
                success: false,
                message: "error in hasshing password in change password",
            });
        }
        // update the new password to the db
        const updatedUserDetails = await User.findOneAndUpdate(
            { _id: userId },
            { password: hashPassword },
            { new: true },
        );
        // send notification email
        try {
            const emailResponse = await mailSender(
                updatedUserDetails.email,
                "Passowrd Change Confirmation Mail",
                passwordUpdate(
                    updatedUserDetails.email,
                    `Password updated successfully for ${updatedUserDetails.firstName} ${updatedUserDetails.lastName}`
                )
            );
            console.log("Email sent successfully:", emailResponse.response);
        } catch (error) {
            // If there's an error sending the email, log the error and return a 500 (Internal Server Error) error
            console.error("Error occurred while sending email:", error);
            return res.status(500).json({
                success: false,
                message: "Error occurred while sending email",
                error: error.message,
            });
        }
        // return response 
        return res.status(200).json({
            success: true,
            message: "the password has been updated sccussfully",
        });
    } catch (error) {
        console.log("error in th change password controller", error);
        return res.status(500).json({
            success: false,
            message: "something wents wrong with the change password controller",
        });
    }
}