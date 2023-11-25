import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { apiConnector } from "../../services/apiConnector";
import { contactusEndpoint } from "../../services/apis";
import { toast } from "react-hot-toast";
import CountryCode from "../../data/countrycode.json";
const ContactUsForm = () => {

    const [loading, setLoading] = useState(false);
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitSuccessful }
    } = useForm();

    const {
        CONTACT_US_API
    } = contactusEndpoint

    const submitContact = async (data) => {
        try {
            setLoading(true);
            console.log("logged Data", data);
            const result = await apiConnector("POST", CONTACT_US_API, data);
            console.log("Response by contact api", result);
            setLoading(false);
            toast.success("confirmation Mail sent");
        } catch (error) {
            console.error("error IN contact form", error);
            toast.error("Some thing wenst wrong");
        }
    }
    useEffect(() => {
        if (isSubmitSuccessful) {
            reset({
                email: "",
                firstName: "",
                lastName: "",
                phoneNumber: "",
                message: ""
            })
        }
    }, [isSubmitSuccessful, reset]);

    return (
        <form onSubmit={handleSubmit(submitContact)} className="flex flex-col gap-7">
            <div className="flex flex-col lg:flex-row gap-5">
                <div className="flex flex-col gap-1 lg:w-[48%]">
                    <label htmlFor="firstName" className="text-lg text-richblack-5">First Name <sup className=" text-pink-200">*</sup></label>
                    <input
                        type="text"
                        name="firstName"
                        id="firstName"
                        placeholder="First Name"
                        {...register("firstName", { required: true })}
                        className="bg-richblack-800 rounded-xl text-richblack-5 p-3 border-richblack-700 border-b-[1px]"
                    />
                    {
                        errors.firstName && (
                            <span>Please enter First Name</span>
                        )
                    }
                </div>
                <div className="flex flex-col gap-1 lg:w-[48%]">
                    <label htmlFor="lastName" className="text-lg text-richblack-5">Last Name</label>
                    <input
                        type="text"
                        name="lastName"
                        id="lastName"
                        placeholder="Last Name"
                        {...register("lastName")}
                        className="bg-richblack-800 rounded-xl text-richblack-5 p-3 border-richblack-700 border-b-[1px]"
                    />
                </div>
            </div>
            {/* email */}
            <div>
                <label htmlFor="email" className="text-lg text-richblack-5">Email<sup className=" text-pink-200">*</sup></label>
                <input
                    type="email"
                    name="email"
                    id="email"
                    placeholder="Enter your Email"
                    {...register("email", { required: true })}
                    className="bg-richblack-800 rounded-xl text-richblack-5 p-3 border-richblack-700 border-b-[1px] w-full"
                />
                {
                    errors.email && (
                        <span>Please Enter Your Email Address</span>
                    )
                }
            </div>
            {/* Contact Number */}
            <div className="flex flex-col">
                <label htmlFor="contactNumber" className="text-lg text-richblack-5">Phone Number<sup className="text-pink-200">*</sup></label>
                <div className="flex flex-row gap-5 mt-1">
                    {/* dropdown */}
                    <div className="flex w-[90px] flex-col gap-2">
                        <select name="dropdown" id="dropdown" {...register("countryCode", { required: true })} className="bg-richblack-800 rounded-xl text-richblack-5 p-3 border-richblack-700 border-b-[1px] ">
                            {
                                CountryCode.map((element, index) => {
                                    return (
                                        <option value={element.code} key={index} className=" bg-richblack-700 text-lg rounded-lg w-[100px] text-richblack-5" selected={element.country === "India"}>
                                            {element.code}- {element.country}
                                        </option>
                                    )
                                })
                            }
                        </select>
                    </div>
                    <input
                        name="contactNumber"
                        type="number"
                        id="contactNumber"
                        placeholder="12345 67890"
                        className="bg-richblack-800 rounded-xl text-richblack-5 p-3 border-richblack-700 border-b-[1px] text-center w-full"
                        {...register("contactNumber", { required: { value: true, message: "Please Enter Phone Number" }, maxLength: { value: 10, message: "Invalid Phone Number" }, minLength: { value: 8, message: "Invalid Phone Number" } })}
                    />
                </div>
                {
                    errors.contactNumber &&
                    <span>{errors.contactNumber.message}</span>
                }
            </div>
            {/* message box*/}
            <div>
                <label htmlFor="message" className="text-lg text-richblack-5">Message<sup className=" text-pink-200">*</sup></label>
                <textarea name="message" id="message" cols="30" rows="5" placeholder="Enter your Message" {...register("message", { required: true })} className="bg-richblack-800 rounded-xl text-richblack-5 p-3 border-richblack-700 border-b-[1px] w-full mt-1" />
                {
                    errors.message && (
                        <span>Please Enter Message</span>
                    )
                }
            </div>
            <button type="submit" className="w-[90%] mx-auto bg-yellow-50 text-richblack-900 font-semibold border-[0.5px] border-richblack-25 hover:scale-95 hover:bg-richblack-800 hover:text-yellow-25 transition-all duration-300 hover:font-light py-3 rounded-full">
                Send Message
            </button>
        </form>
    );
}

export default ContactUsForm;