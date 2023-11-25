import React, { useState } from "react";
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../../../services/operations/authAPI";

const LoginForm = () => {

    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    // form data
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    function submitHandler(event) {
        event.preventDefault();
        dispatch(login(formData.email, formData.password, navigate));
    }
    function changeHandler(event) {
        setFormData((prevData) => (
            {
                ...prevData,
                [event.target.name]: event.target.value
            }
        ))
    }
    return (
        <div className="flex flex-col w-full mt-6 gap-y-4 ">
            <form onSubmit={submitHandler}>
                <label className="w-full">
                    <p className="text-lg text-richblack-5 mt-4">Email Address<sup className=" text-pink-300">*</sup></p>
                    <input
                        required
                        type="email"
                        value={formData.email}
                        onChange={changeHandler}
                        placeholder="Enter your Email"
                        name="email"
                        className="bg-richblack-800 rounded-xl text-richblack-5 w-full p-[12px] border-richblack-700 border-b-[1px]"
                    />
                </label>
                {/* password */}
                <label className="w-full relative mt-8">
                    <p className="text-lg mt-6 text-richblack-5 ">
                        Password<sup className="text-pink-200">*</sup>
                    </p>
                    <input
                        required
                        type={showPassword ? ("text") : ("password")}
                        value={formData.password}
                        onChange={changeHandler}
                        placeholder="Enter your password"
                        name="password"
                        className="bg-richblack-800 rounded-xl text-richblack-5 w-full p-[12px] border-richblack-700 border-b-[1px]"
                    />

                    <span onClick={() => setShowPassword((prev) => !prev)} className="absolute right-5 top-[100px] cursor-pointer text-richblack-25" >
                        {
                            showPassword ? (<AiOutlineEyeInvisible fontSize={26} fill="#AFB2BF" />) : (<AiOutlineEye fontSize={26} fill="#AFB2BF" />)
                        }
                    </span>

                    <Link to="/forgot-password">
                        <p className="text-blue-100 font-medium text-xs mt-1 max-w-max ml-auto">Forgot Password</p>
                    </Link>
                </label>

                {/* sign in button */}

                <button type="submit" className="w-full bg-yellow-50 rounded-lg px-[12px] py-[8px] mt-6 border-[2px] text-lg border-black hover:scale-105 transition-all duration-400">
                    Login
                </button>

            </form>
        </div>
    );
}

export default LoginForm;