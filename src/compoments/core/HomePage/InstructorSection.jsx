import React from "react";
import Instructor from "../../../assets/Images/Instructor.png"
import HighLightText from "./HighLightText";
import CTAButton from "./CTAButton";
import { FaArrowRight } from "react-icons/fa";
const InstructorSection = () => {
    return (
        <div className=" font-inter">
            <div className="flex lg:flex-row flex-col gap-20 items-center">
                {/* left part  */}
                <div className="lg:w-[50%] w-[70%]">
                    <img src={Instructor}
                        alt="Instructor"
                        className=" object-contain shadow-white shadow-[-20px_-20px_0_0]" />
                </div>
                {/* right part */}
                <div className="lg:w-[50%] w-[90%] mx-auto flex flex-col gap-10">
                    <div className="text-4xl font-semibold w-[50%]">
                        Become an
                        <HighLightText text={"Instructor"} />
                    </div>
                    <p className=" font-medium text-base w-[85%] text-richblack-300 ">
                        Instructors from around the world teach millions of students on StudyNotion. We provide the tools and skills to teach what you love.
                    </p>
                    <div className="w-fit ">
                        <CTAButton active={true} linkto={"/signup"}>
                            <div className="flex flex-row gap-2 items-center">
                                Start Teaching Today
                                <FaArrowRight fontSize={18} />
                            </div>
                        </CTAButton>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default InstructorSection