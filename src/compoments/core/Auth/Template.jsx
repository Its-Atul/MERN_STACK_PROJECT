import React from "react";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";
import frameImg from "../../../assets/Images/frame.png";
import { Link } from "react-router-dom";
import { BsArrowLeft } from "react-icons/bs";

const Template = ({ title, desc1, desc2, image, formtype }) => {
    return (
        <div className="w-11/12 max-w-[1160px] flex mx-auto justify-between py-12 gap-y-0 gap-x-12 mt-4">
            {/* LEFT part i.e. form part */}
            <div className="flex flex-col w-11/12 max-w-[500px] font-inter">
                <h2 className=" text-richblack-5 font-semibold text-3xl leading-[1.625rem]">
                    {title}
                </h2>
                <p className=" text-lg leading-[1.625rem] font-inter mt-6">
                    <span className=" text-richblack-100 ">{desc1}</span>
                    <br />
                    <span className=" text-blue-200 mt-2"><i>{desc2}</i></span>
                </p>
                {/* form the form type and to render the form login or signup */}
                {
                    formtype === "signup" ? (<SignupForm />) : (<LoginForm />)
                }
                <div className="mt-1 p-2">
                    <Link to="/">
                        <button className="flex items-center gap-2 ml-2 text-richblack-25">
                            <BsArrowLeft size={20}/>
                            <span>Back to Home Page</span>
                        </button>
                    </Link>
                </div>
            </div>
            {/* right part frame and image part */}
            <div className="relative w-11/12 -ml-4 max-w-[450px] mt-4 rounded-lg">
                {/* frame */}
                <img src={frameImg} alt="frame" loading="lazy"
                />
                {/* image inside the frame */}
                <img src={image} alt=""
                    className="absolute -top-4 right-4 object-contain rounded-lg"
                />
            </div>
        </div>
    )
}
export default Template;