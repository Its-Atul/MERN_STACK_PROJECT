import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "../compoments/comman/Spinner";
import { useLocation, Link, useNavigate } from "react-router-dom";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { BiArrowBack } from "react-icons/bi";
import { resetPassword } from "../services/operations/authAPI";

const UpdatePassword = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();
    const { loading } = useSelector((state) => state.auth);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showNewConfirmPassword, setShowNewConfirmPassword] = useState(false);
    const [formData, setFormData] = useState({
        newPassword: "",
        newConfirmPassword: ""
    });

    const changeHandler = (e) => {
        setFormData((prevData) => (
            {
                ...prevData,
                [e.target.name]: e.target.value,
            }
        ))
    }

    const submitHandler = (event) => {
        event.preventDefault();
        const token = location.pathname.split("/").at(-1);
        dispatch(resetPassword(formData.newPassword, formData.newConfirmPassword, token, navigate));
    }

    return (
        <div className="flex items-center justify-center min-h-[calc(100vh-3.5rem)]">
            {
                loading ? (
                    <Spinner />
                ) : (
                    <div className="max-w-[500px] p-4 lg:p-8">
                        <h2 className=" text-3xl font-semibold text-richblack-5">
                            Choose New Password
                        </h2>
                        <p className="my-4 text-xl text-richblack-100">
                            Almost done. Enter your new password and youre all set.
                        </p>
                        <form onSubmit={submitHandler}>
                            <label className="relative">
                                <p className="mb-1 text-base text-richblack-5">New Password <sup className=" text-pink-200">*</sup></p>
                                <input
                                    type={
                                        showNewPassword ? "text" : "password"
                                    }
                                    required
                                    name="newPassword"
                                    value={formData.newPassword}
                                    onChange={changeHandler}
                                    placeholder="New Password"
                                    className="bg-richblack-800 rounded-xl text-richblack-5 w-full p-[12px] mt-2 border-richblack-700 border-b-[1px]"
                                />
                                <span onClick={() => setShowNewPassword((prev) => !prev)}
                                className="absolute right-4 top-12 z-10 cursor-pointer">
                                    {
                                        showNewPassword ? (<AiOutlineEyeInvisible fontSize={26} fill="#AFB2BF" />) : (<AiOutlineEye fontSize={26} fill="#AFB2BF" />)
                                    }
                                </span>
                            </label>
                            <label className="relative my-4">
                                <p className="mb-1 my-4 text-base text-richblack-5">New Confirm Password <sup className=" text-pink-200">*</sup></p>
                                <input
                                    type={
                                        showNewConfirmPassword ? "text" : "password"
                                    }
                                    required
                                    name="newConfirmPassword"
                                    value={formData.newConfirmPassword}
                                    onChange={changeHandler}
                                    placeholder="New Confirm Password"
                                    className="bg-richblack-800 rounded-xl text-richblack-5 w-full p-[12px] mt-2 border-richblack-700 border-b-[1px]"
                                />
                                <span onClick={() => setShowNewConfirmPassword((prev) => !prev)}
                                className="absolute right-4 top-[100px]">
                                    {
                                        showNewConfirmPassword ? (<AiOutlineEyeInvisible fontSize={26} fill="#AFB2BF" />) : (<AiOutlineEye fontSize={26} fill="#AFB2BF" />)
                                    }
                                </span>
                            </label>
                            <button type="submit" className="w-full mt-6 bg-yellow-50 text-richblack-900 font-semibold border-[0.5px] border-richblack-25 hover:scale-95 hover:bg-richblack-800 hover:text-yellow-25 transition-all duration-300 hover:font-light py-3 rounded-full">
                                Reset Password
                            </button>
                        </form>
                        <Link to="/login"
                            className=" mr-auto mt-4 flex items-center justify-center"
                        >
                            <p className="flex items-center gap-2 text-richblack-5">
                                <BiArrowBack /> Back To Login
                            </p>
                        </Link>
                    </div>
                )
            }
        </div>
    )
};


export default UpdatePassword;