import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { BiArrowBack } from "react-icons/bi";
import { resetPasswordToken } from "../services/operations/authAPI";
import Spinner from "../compoments/comman/Spinner";

const ForgotPassword = () => {
    // make make for either the emails is sent or not
    const [emailSent, setEmailSent] = useState(false);
    const [email, setEmail] = useState("");
    const { loading } = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    const submitHandler = (e) =>{
        e.preventDefault();
        dispatch(resetPasswordToken(email, setEmailSent));
    }

    return (
        <div className="w-10/12 mx-auto flex items-center min-h-[calc(100vh-3.5rem)]">
            {
                loading ? (
                    <div className="flex items-center justify-center">
                        <Spinner />
                    </div>
                ) : (
                    <div className="max-w-[500px] flex flex-col justify-center items-center p-4 lg:p-8 mx-auto">
                        <h2 className="mr-auto text-3xl font-semibold text-richblack-5">
                            {
                                !emailSent ? "Reset your password" : "Check Email"
                            }
                        </h2>
                        <p className="my-4 text-xl leading-6 text-richblack-100">
                            {
                                !emailSent ? "Have no fear. We'll email you instructions to reset your password. If you dont have access to your email we can try account recovery" : `We have sent Reset Email to ${email}`
                            }
                        </p>
                        <form onSubmit={submitHandler}>
                            {
                                !emailSent && (
                                    <label className="w-full mb-1 text-base font-semibold text-richblack-5 mr-auto">
                                        Email Address<sup className=" text-pink-100">*</sup>
                                        <input
                                            type="email"
                                            name="email"
                                            required
                                            onChange={(e) => setEmail(e.target.value)}
                                            value={email}
                                            placeholder="Enter registered Email"
                                            className="bg-richblack-800 rounded-xl text-richblack-5 w-full p-[12px] mt-2 border-richblack-700 border-b-[1px]"
                                        />
                                    </label>
                                )
                            }

                            <button type="submit"
                                className=" w-full mr-auto text-center border-l-[0.5px] border-b-[1px] px-6 py-3 rounded-md font-bold hover:scale-95 hover:font-medium transition-all duration-300 bg-yellow-50 border-richblack-5 text-black mt-6"
                            >
                                {
                                    !emailSent ? "Reset Password" : "Resend Email"
                                }
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
    );
}

export default ForgotPassword;