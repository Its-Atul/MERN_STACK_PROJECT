const { contactEmailTemplate } = require("../mail/templates/contactEmailTemplate");
const contact = require("../models/contact");
const mailSender = require("../utils/mailSender");

exports.Contact = async (req, res) => {
    try {
        // get the data
        const { email, firstName, lastName, contactNumber, message } = req.body;
        // validation 
        if (!email || !firstName || !contactNumber || !message) {
            return res.status(400).json({
                success: false,
                message: "Star field are required"
            });
        }

        const checkemailpresent = await contact.findOne({ email });
        if (checkemailpresent) {
            await contact.findOneAndUpdate({ email },
                {
                    $set: {
                        message: message,
                        firstName: firstName,
                        contactNumber: contactNumber,
                        lastName: lastName
                    }
                }, { new: true })
        }
        else {
            const contactEntry = await contact.create(
                {
                    firstName,
                    lastName,
                    email,
                    contactNumber,
                    message,
                }
            );
            console.log("Entry in contact Db look like", contactEntry);
        }
        // send mail to the person
        try {
            const mailResponse = await mailSender(email, "Received your message", contactEmailTemplate(firstName, lastName));
            console.log("Contact Confirmation Email Response", mailResponse);
        } catch (error) {
            console.error("Error occurred while sending email:", error);
            return res.status(500).json({
                success: false,
                message: "Error occurred while sending email",
                error: error.message,
            });
        }
        // return 
        return res.status(200).json({
            success: true,
            message: "Contact us entry made Successfull"
        })
    } catch (error) {
        console.error("Error occured in Contact Controller", error);
        return res.status(404).json({
            success: false,
            message: "Something wents wrong with Contact Controller",
        })
    }
}