import React from "react";
import HighLightText from "./HighLightText";
import KnowYourProgress from "../../../assets/Images/Know_your_progress.png";
import compare_with_others from "../../../assets/Images/Compare_with_others.png";
import Plan_your_lessons from "../../../assets/Images/Plan_your_lessons.png";
import CTAButton from "./CTAButton";
const LearningLanguageSection = () => {
    return (
        <div className="lg:mt-[130px] mb-24 w-11/12 max-w-maxContent mx-auto">
            <div className="flex flex-col mx-auto items-center">
                <div className="text-4xl font-semibold text-center">
                    Your swiss knife for <HighLightText text={"learning any language"} />
                </div>
                <div className="text-center text-richblack-700 text-base mx-auto font-medium lg:w-[65%] leading-6 mt-3 ">
                    Using spin making learning multiple languages easy. with 20+ languages realistic voice-over, progress tracking, custom schedule and more.
                </div>
                {/* card image div */}
                <div className="flex lg:flex-row md:flex-row flex-col justify-center mt-5">
                    <img src={KnowYourProgress}
                        alt="Know progress"
                        className="object-contain lg:-mr-32" />
                    <img src={compare_with_others}
                        alt="compare_with_others"
                        className=" object-contain lg:-mb-10 lg:-mt-0 -mt-12" />
                    <img src={Plan_your_lessons}
                        alt="Plan_your_lessons"
                        className=" object-contain lg:-ml-36 lg:-mt-5 -mt-16" />
                </div>
                <div className=" w-fit mx-auto mt-5 lg:mb-20 mb-8">
                    <CTAButton active={true} linkto={"/signup"}>Learn More</CTAButton>
                </div>
            </div>
        </div>
    );
}

export default LearningLanguageSection;