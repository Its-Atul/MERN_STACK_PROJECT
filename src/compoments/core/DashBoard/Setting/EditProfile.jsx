import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import IconBtn from "../../../comman/iconBtn";
import { updateProfile } from "../../../../services/operations/settingsAPI";

const EditProfile = () => {
    const { user } = useSelector((state) => state.profile);
    const { token } = useSelector((state) => state.auth);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const genders = ["Male", "Female", "Non-Binary", "Prefer not to say", "Other"]

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm();

    const submitProfileForm = async (data) =>{
        console.log("Printing form DATA", data);
        try {
            dispatch(updateProfile(token, data, navigate))
            navigate("/dashboard/my-profile");
        } catch (error) {
            console.error("some error occured at updating profile", error);
        }
    }
    return (
        <div>
            {/* form start */}
            <form onSubmit={handleSubmit(submitProfileForm)}>
                <div className="flex flex-col gap-y-6 mt-10 mb-5 rounded-lg border-2 border-richblack-600 bg-richblack-800 p-8 px-12 text-richblack-5">
                    {/* Profile Information */}
                    <h2 className="text-lg font-semibold text-richblack-5 mb-1">
                        Profile Information
                    </h2>
                    {/* fisrt name and last name */}
                    <div className="flex flex-col lg:flex-row gap-5">
                        {/* fisrt name */}
                        <div className="lg:w-[48%] flex flex-col gap-2">
                            <label htmlFor="firstName" className=" text-richblack-5">First Name<sup className=" text-pink-300">*</sup></label>
                            <input
                                type="text"
                                name="firstName"
                                id="firstName"
                                placeholder="Enter First Name"
                                className="bg-richblack-600 rounded-xl text-richblack-5 p-3 border-richblack-300 border-b-[1px]"
                                {...register("firstName", { required: true })}
                                defaultValue={user?.firstName}
                            />
                            {
                                errors.firstName && (
                                    <span className="-mt-1 text-[12px] text-yellow-100">Please Enter Your First Name</span>
                                )
                            }
                        </div>
                        {/* last name */}
                        <div className="lg:w-[48%] flex flex-col gap-2">
                            <label htmlFor="lastName" className=" text-richblack-5">Last Name<sup className=" text-pink-300">*</sup></label>
                            <input
                                type="text"
                                name="lastName"
                                id="lastName"
                                placeholder="Enter last Name"
                                className="bg-richblack-600 rounded-xl text-richblack-5 p-3 border-richblack-300 border-b-[1px]"
                                defaultValue={user?.lastName}
                                {...register("lastName", { required: true })}
                            />
                            {
                                errors.lastName && (
                                    <span className="-mt-1 text-[12px] text-yellow-100">
                                        Please Enter Last Name
                                    </span>
                                )
                            }
                        </div>
                    </div>
                    {/* /dateof birth and gender*/}
                    <div className="flex flex-col lg:flex-row gap-5">
                        {/* /date  */}
                        <div className="lg:w-[48%] flex flex-col gap-2">
                            <label htmlFor="dateOfBirth" className=" text-richblack-5">Date Of Birth<sup className=" text-pink-300">*</sup></label>
                            <input
                                type="date"
                                name="dateOfBirth"
                                id="dateOfBirth"
                                className="bg-richblack-600 rounded-xl text-richblack-5 p-3 border-richblack-300 border-b-[1px]"
                                {...register("dateOfBirth", {
                                    required: {
                                        value: true,
                                        message: "Please enter Date of Birth"
                                    },
                                    max: {
                                        value: new Date().toISOString().split("T")[0],
                                        message: "Date of  Birth can't be in future"
                                    },
                                })}
                                defaultValue={user?.additionalDetails?.dateOfBirth}
                            // defaultChecked={user?.additionalDetails?.dateOfBirth}
                            />
                            {errors.dateOfBirth && (
                                <span className="-mt-1 text-[12px] text-yellow-100">
                                    {errors.dateOfBirth.message}
                                </span>
                            )}
                        </div>
                        {/* /gender */}
                        <div className="lg:w-[48%] flex flex-col gap-2">
                            <label htmlFor="gender" className=" text-richblack-5">Gender<sup className=" text-pink-300">*</sup></label>
                            <select
                                name="gender"
                                id="gender"
                                className="bg-richblack-600 rounded-xl text-richblack-5 p-3 border-richblack-300 border-b-[1px]"
                                {...register("gender", { required: true })}
                                defaultValue={user?.additionalDetails?.gender}
                            >
                                {
                                    genders.map((ele, i) => {
                                        return (
                                            <option value={ele} key={i}>{ele}</option>
                                        )
                                    })
                                }
                            </select>
                            {
                                errors.gender && (
                                    <span className="-mt-1 text-[12px] text-yellow-100">
                                        Please enter your Date of Birth.
                                    </span>
                                )
                            }
                        </div>
                    </div>
                    {/* contact and about part */}
                    <div className="flex flex-col lg:flex-row gap-5">
                        <div className="lg:w-[48%] flex flex-col gap-2">
                            <label htmlFor="contactNumber" className=" text-richblack-5">Phone Number<sup className=" text-pink-300">*</sup></label>
                            <input
                                type="tel"
                                name="contactNumber"
                                id="contactNumber"
                                placeholder="Enter Contact Number"
                                className="bg-richblack-600 rounded-xl text-richblack-5 p-3 border-richblack-300 border-b-[1px]"
                                {...register("contactNumber", {
                                    required: {
                                        value: true,
                                        message: "Please Enter Your Contact Number"
                                    },
                                    maxLength: { value: 12, message: "Invalid Phone Number" },
                                    minLength: { value: 8, message: "Invalid Phone Numner" },
                                })}
                                defaultValue={user?.additionalDetails?.contactNumber}
                            />
                            {errors.contactNumber && (
                                <span className="-mt-1 text-[12px] text-yellow-100">
                                    {errors.contactNumber.message}
                                </span>
                            )}
                        </div>
                        {/* about part  */}
                        <div className="lg:w-[48%] flex flex-col gap-2">
                            <label htmlFor="about" className=" text-richblack-5">About<sup className=" text-pink-300">*</sup></label>
                            <input
                                type="text"
                                name="about"
                                id="about"
                                placeholder="Enter Bio Details"
                                className="bg-richblack-600 rounded-xl text-richblack-5 p-3 border-richblack-300 border-b-[1px]"
                                {...register("about", { required: true })}
                                defaultValue={user?.additionalDetails?.about}
                            />
                            {errors.about && (
                                <span className="-mt-1 text-[12px] text-yellow-100">
                                    Please enter your About.
                                </span>
                            )}
                        </div>
                    </div>
                </div>
                <div className="flex justify-end gap-3 ml-2">
                    <button onClick={() => { navigate("/dashboard/my-profile") }} className=" cursor-pointer rounded-md border-b-[1px] border-richblack-400 bg-richblack-700 py-2 px-5 font-semibold text-richblack-25">
                        Cancel
                    </button>
                    <IconBtn type="submit" text="Save" />
                </div>
            </form>
        </div>
    );
}

export default EditProfile;