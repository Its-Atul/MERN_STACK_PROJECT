import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "../compoments/comman/Spinner";
import OTPInput from "react-otp-input";
import { Link, useNavigate } from "react-router-dom";
import { sendOTP, signUp } from "../services/operations/authAPI";
import { BiArrowBack } from "react-icons/bi";
import { RxCountdownTimer} from "react-icons/rx";
const VerifyEmail = () => {

    const { loading, signupData } = useSelector((state) => state.auth);
    const [otp, setOtp] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const {
        accountType,
        firstName,
        lastName,
        email,
        password,
        confirmPassword
    } = signupData

    useEffect(() => {
        if (!signupData) {
            navigate("/signup");
        }
    })
    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(signUp(accountType, firstName, lastName, email, password, confirmPassword, otp, navigate));
    }
    return (
        <div className="flex items-center justify-center min-h-[calc(100vh-3.5rem)]">
            {
                loading ? (
                    <Spinner />
                ) : (
                    <div className="max-w-[500px] p-4 lg:p-8">
                        <h2 className="text-3xl font-semibold text-richblack-5">
                            Verify Email
                        </h2>
                        <p className="my-4 text-xl text-richblack-100">
                            A verification code has been sent to you. Enter the code below
                        </p>
                        <form onSubmit={submitHandler}>
                            <OTPInput
                                value={otp}
                                onChange={setOtp}
                                numInputs={6}
                                renderSeparator={<span>-</span>}
                                renderInput={(props) => <input {...props} placeholder="-" style={{
                                    boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                                }}
                                    className="w-[48px] lg:w-[60px] border-0 bg-richblack-800 rounded-xl text-richblack-5 aspect-square text-center focus:border-0 focus:outline-2 focus:outline-yellow-50" />
                                }
                                containerStyle={{
                                    justifyContent:"space-between",
                                    gap:"0 6px"
                                }}
                            />
                            <button type="submit"
                                className="w-full mt-6 bg-yellow-50 text-richblack-900 font-semibold border-[0.5px] border-richblack-25 hover:scale-95 hover:bg-richblack-800 hover:text-yellow-25 transition-all duration-300 hover:font-light py-3 rounded-full mb-4"
                            >
                                Verify Email
                            </button>
                        </form>
                        <div className="flex justify-between items-center mt-2">
                            <Link to="/login">
                                <p className="flex items-center gap-2 text-richblack-5">
                                    <BiArrowBack /> Back To Login
                                </p>
                            </Link>
                            <button onClick={() => dispatch(sendOTP(email, navigate))} className="flex items-center text-blue-200 gap-2">
                                <RxCountdownTimer />
                                Resent it
                            </button>
                        </div>
                    </div>
                )
            }
        </div>
    )
}

export default VerifyEmail;