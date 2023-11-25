import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import IconBtn from "../../../comman/iconBtn";
import { changepassword } from "../../../../services/operations/settingsAPI";

const ChangePassword = () => {
    // taking token for state management
    const { token } = useSelector((state) => state.auth);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    // state variable to show password of not 
    const [showOldPassword, setShowOldPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm();

    const submitPasswordForm = async(data) =>{
        // console.log("Printing the Data of password form", data);
        try {
            dispatch(changepassword(token, data, navigate));
        } catch (error) {
            console.error("Error in change password", error);
        }
    }
    return (
        <div>
            <form onSubmit={handleSubmit(submitPasswordForm)}>
                <div className="flex flex-col gap-y-6 mt-10 mb-5 rounded-lg border-2 border-richblack-600 bg-richblack-800 p-8 px-12 text-richblack-5">
                    <h2 className="text-lg font-semibold text-richblack-5 mb-1">
                        Change Password
                    </h2>
                    <div className="flex flex-col lg:flex-row gap-5">
                        <div className="lg:w-[48%] flex flex-col gap-2 relative">
                            <label htmlFor="oldPassword" className="text-richblack-5">Current Password<sup className=" text-pink-300">*</sup></label>
                            <input
                                type={showOldPassword ? "text" : "password"}
                                name="oldPassword"
                                id="oldPassword"
                                placeholder="Enter Current Password"
                                className="bg-richblack-600 rounded-xl text-richblack-5 p-3 border-richblack-300 border-b-[1px]"
                                {...register("oldPassword", { required: true })}
                            />
                            <span onClick={() => setShowOldPassword((prev) => !prev)} className=" absolute top-11 right-3 cursor-pointer z-10">{
                                showOldPassword ? (
                                    <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
                                ) : (<AiOutlineEye fontSize={24} fill="#AFB2BF" />)
                            }
                            </span>
                            {
                                errors.oldPassword && (
                                    <span className="-mt-1 text-[12px] text-yellow-100">
                                        Please Enter Current Password
                                    </span>
                                )
                            }
                        </div>
                        <div className="lg:w-[48%] flex flex-col gap-2 relative">
                            <label htmlFor="newPasssword" className="text-richblack-5">New Password<sup className="text-pink-300">*</sup></label>
                            <input
                                type={showNewPassword ? "text" : "password"}
                                name="newPassword"
                                id="newPassword"
                                placeholder="Enter New Password"
                                className="bg-richblack-600 rounded-xl text-richblack-5 p-3 border-richblack-300 border-b-[1px]"
                                {...register("newPassword", { required: true })}
                            />
                            <span onClick={() => setShowNewPassword((prev) => !prev)} className=" absolute top-11 right-3 z-10 cursor-pointer">
                                {
                                    showNewPassword ? (
                                        <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
                                    ) : (<AiOutlineEye fontSize={24} fill="#AFB2BF" />)
                                }
                            </span>
                            {
                                errors.newPassword && (
                                    <span className="-mt-1 text-[12px] text-yellow-100">
                                        Please Enter New Password
                                    </span>
                                )
                            }
                        </div>
                    </div>
                </div>
                <div className="flex justify-end gap-3">
                    <button onClick={() => { navigate("/dashboard/my-profile") }} className=" cursor-pointer rounded-md border-b-[1px] border-richblack-400 bg-richblack-700 py-2 px-5 font-semibold text-richblack-25">
                        Cancel
                    </button>
                    <IconBtn type="submit" text="Update" />
                </div>
            </form>
        </div>
    );
}

export default ChangePassword;