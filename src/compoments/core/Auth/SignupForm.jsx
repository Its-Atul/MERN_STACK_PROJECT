import React, { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import Tab from "../../comman/Tab";
import { ACCOUNT_TYPE } from "../../../utils/constanst";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toast } from "react-hot-toast";
import { setSignupData } from "../../../slices/authSlice";
import { sendOTP } from "../../../services/operations/authAPI";


const SignupForm = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [formData, setFormData] = useState({
        firstName:"",
        lastName:"",
        email:"",
        password:"",
        confirmPassword:"",
    })
    // student or Instructor
    const [accountType, setAccountType] = useState(ACCOUNT_TYPE.STUDENT);

    const tabData = [
        {
            id:1,
            tabName:"Student",
            type:ACCOUNT_TYPE.STUDENT,
        },{
            id:2,
            tabName:"Instructor",
            type:ACCOUNT_TYPE.INSTRUCTOR,
        }
    ]
    // /on submition
    function submitHandler(e) {
        e.preventDefault();

        if(formData.password !== formData.confirmPassword){
            toast.error("Password doestn't Match");
            return ;
        }
        const signupData ={
            ...formData,
            accountType,
        }
        // to set up to the data to state for email verification
        dispatch(setSignupData(signupData))
        // send otp to user for verification
        dispatch(sendOTP(formData.email, navigate))
        
        // Reset 
        setFormData({
            firstName:"",
            lastName:"",
            email:"",
            password:"",
            confirmPassword:"",
        });
        setAccountType(ACCOUNT_TYPE.STUDENT);
    }

    function changeHandler(e) {
        setFormData((prevData) =>({
            ...prevData,
            [e.target.name]: e.target.value,
        }))
    }

    return (
        <div className="w-11/12 font-inter max-w-[1160px] flex flex-col gap-y-4 mt-4">
            <Tab tabData={tabData} field={accountType} setField={setAccountType}/>
            {/* form for Signup */}
            <form onSubmit={submitHandler}>
                <div className="flex gap-x-4">
                    <label>
                        <p className="text-lg text-richblack-5 mt-4">First Name<sub className=" text-pink-300">*</sub></p>
                        <input
                            type="text"
                            required
                            placeholder="First Name"
                            className="bg-richblack-800 rounded-xl text-richblack-5 w-full p-[12px] border-richblack-700 border-b-[1px]"
                            onChange={changeHandler}
                            value={formData.firstName}
                            name="firstName"
                        />
                    </label>
                    <label>
                        <p className="text-lg text-richblack-5 mt-4">Last Name<sub className=" text-pink-300">*</sub></p>
                        <input
                            type="text"
                            name="lastName"
                            value={formData.lastName}
                            onChange={changeHandler}
                            required
                            placeholder="Last Name"
                            className="bg-richblack-800 rounded-xl text-richblack-5 w-full p-[12px] border-richblack-700 border-b-[1px]"
                        />
                    </label>
                </div>
                {/* email */}
                <label>
                    <p className="text-lg text-richblack-5 mt-4">Email<sub className=" text-pink-300">*</sub></p>
                    <input
                        required
                        type="email"
                        name="email"
                        value={formData.email}
                        placeholder="Enter Your Email"
                        onChange={changeHandler}
                        className="bg-richblack-800 rounded-xl text-richblack-5 w-full p-[12px] border-richblack-700 border-b-[1px]"
                    />
                </label>
                <div className="flex gap-x-4">
                    <label className="relative">
                        <p className="text-lg text-richblack-5 mt-4">Create Password<sup className=" text-pink-300">*</sup></p>
                        <input
                            required
                            type={showPassword ? "text" : "password"}
                            name="password"
                            value={formData.password}
                            onChange={changeHandler}
                            placeholder="Create Password"
                            className="bg-richblack-800 rounded-xl text-richblack-5 w-full p-[12px] border-richblack-700 border-b-[1px]"
                        />
                        <span onClick={() => setShowPassword((prev) => !prev)}
                        className=" absolute right-3 top-[56px]"
                        >
                            {
                                showPassword ? (<AiOutlineEyeInvisible fontSize={26} fill="#AFB2BF" />) : (<AiOutlineEye fontSize={26} fill="#AFB2BF" />)
                            }
                        </span>
                    </label>
                    {/* confirm password */}
                    <label className="relative">
                        <p className="text-lg text-richblack-5 mt-4">Confirm Password<sub className=" text-pink-300">*</sub></p>
                        <input
                            required
                            placeholder="Confirm Password"
                            value={formData.confirmPassword}
                            onChange={changeHandler}
                            type={showConfirmPassword ? "text" : "password"}
                            name="confirmPassword"
                            className="bg-richblack-800 rounded-xl text-richblack-5 w-full p-[12px] border-richblack-700 border-b-[1px]"
                        />
                        <span onClick={() => setShowConfirmPassword((prev) => !prev)}
                            className=" absolute top-[56px] right-3"
                        >
                            {
                                showConfirmPassword ? (<AiOutlineEyeInvisible fontSize={26} fill="#AFB2BF" />) : (<AiOutlineEye fontSize={26} fill="#AFB2BF" />)
                            }
                        </span>
                    </label>
                </div>
                <button type="submit" className="w-full bg-yellow-50 font-semibold rounded-lg px-[12px] py-[8px] mt-6 border-[2px] text-lg border-black hover:scale-105 transition-all duration-400">
                    Create Account
                </button>
            </form>
        </div>
    );
}

export default SignupForm;