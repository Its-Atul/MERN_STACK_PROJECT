const mongoose = require("mongoose");
const mailSender = require("../utils/mailSender");
const emailTemplate = require("../mail/templates/emailVerificationTemplate");
const otpSchema = new mongoose.Schema({
    email:{
        type:String,
        require:true,
    },
    otp:{
        type:String,
        require:true,
    },
    createdAt:{
        type:Date,
        default:Date.now(),
        expires: 5*60  // The document will be automatically deleted after 5 minutes of its creation time,
    }
});

// code for sending otp through mail
async function sendVerificationEmail(email, otp){
    try {
        const mailResponse = await mailSender(email, "Verification email for the Study Notion app", emailTemplate(otp));
        console.log("email send successfull", mailResponse);
    } catch (error) {
        console.log("error in send otp function", error);
        throw error;
    }
}

otpSchema.pre("save", async function(next){
    console.log("New document saved to database");

	// Only send an email when a new document is created
	if (this.isNew) {
		await sendVerificationEmail(this.email, this.otp);
	}
	next();
})

module.exports = mongoose.model("otp",otpSchema);