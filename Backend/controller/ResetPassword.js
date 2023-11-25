const User = require("../models/user");
const mailSender = require("../utils/mailSender");
const bcrypt = require("bcrypt");
// it is divided into to parts generate aa link which would be a frontend link to reset password
const crypto = require("crypto");

// 1) reset password token
exports.resetPasswordToken = async (req, res) => {
    try {
        // get the email from req body
        const { email } = req.body;
        // validate th email 
        const user = await User.findOne({ email: email });
        if (!user) {
            return res.status(400).json({
                success: false,
                message: "user not found with is mail id",
            });
        }
        // generate token
        const token = crypto.randomUUID();
        // update the user 
        const updateDetails = await User.findOneAndUpdate({ email: email },
            {
                token: token,
                resetPasswordExpires: Date.now() + 5 * 60 * 1000,
            },
            { new: true }
        );
        console.log("DETAILS",updateDetails);
        // create url and send the email containing the url
        const url = `http://localhost:3000/update-password/${token}`;
        // send the mail
        await mailSender(email,
            "password generation link",
            `password generate url: ${url}`
        );
        return res.status(200).json({
            success: true,
            message: "mail has been successfully sent",
            url
        });
    } catch (error) {
        console.log("erroer in sending email for rest password", error)
        return res.status(500).json({
            success: false,
            message: "something wents wrong in reset mail sending",
        })
    }
}

// 2) reset password

exports.resetPassword = async (req, res) => {
    try {
        // data fetch 
        const { password, confirmPassword, token } = req.body;
        // /validation 
        if (password !== confirmPassword) {
            return res.status(400).json({
                success: false,
                message: "password and confirm password doesn't matches",
            });
        }
        // get user details using the token 
        const userDetails = await User.findOne({ token: token });
        // /if no entry found invalid token 
        if (!userDetails) {
            return res.status(401).json({
                success: false,
                message: "the tooken is invalid",
            });
        }
        // time of token expries
        if (userDetails.resetPasswordExpires < Date.now()) {
            return res.status(401).json({
                success: false,
                message: "the time limit is token is expried so please generate a new token",
            });
        }
        // hash the password
        const hashedPassword = await bcrypt.hash(password, 10);
        // update the password in the user schema

        await User.findOneAndUpdate({ token: token },
            { password: hashedPassword },
            { new: true },
        );
        // return the response
        return res.status(200).json({
            success: true,
            message: "user password hass been reset successfully",
        });
    } catch (error) {
        console.log("error in reset password", error);
        return res.status(500).json({
            success: false,
            message: "something wents wrong in reset password",
        });
    }
}