import React from "react";
import CTAButton from "./CTAButton";
import { FiArrowRight } from "react-icons/fi";
import {TypeAnimation } from 'react-type-animation';
const CodeBlocks = ({
    position, heading, subheading, ctabtn1, ctabtn2, codeblock, backgroundGradient, codeColor, location
}) => {
    return (
        <div className={`flex lg:flex-row flex-col gap-10 ${position} my-20 justify-between h-fit`}>

            {/* section a */}
            <div className="lg:w-[50%] w-[100%] flex flex-col gap-8">
                {heading}
                <div className="text-richblack-300 font-bold">
                    {subheading}
                </div>
                {/* button */}
                <div className="flex gap-7 mt-7">
                    {/* btn 1 */}
                    <CTAButton active={ctabtn1.active} linkto={ctabtn1.linkto}>
                        <div className="flex items-center gap-2">
                            {ctabtn1.btnText}
                            <FiArrowRight/>
                        </div>
                    </CTAButton>
                    {/* btn2 */}
                    <CTAButton active={ctabtn2.active} linkto={ctabtn2.linkto}>
                    <div className="flex items-center gap-2">
                            {ctabtn2.btnText}
                            <FiArrowRight/>
                        </div>
                    </CTAButton>
                </div>
            </div>
            {/* section b */}
            <div className=" relative flex h-fit flex-row text-base w-[90%] py-4 border-[1px] border-richblack-600 rounded-lg lg:w-[470px]">
                {/* gradient */}
                <div className={`absolute w-[340px] h-[230px] rounded-full blur-[34px] left-[calc(50% - 372.95px/2 - 76.53px)] top-[calc(50% - 257.05px/2 - 47.47px)] ${location ? "bg-gradient-to-br from-[#8A2BE2] via-[#FFA500] to-[#F8F8FF] opacity-[0.2]" : "bg-gradient-to-br from-[#1FA2FF] via-[#12D8FA] to-[#A6FFCB] opacity-[0.2]"}`}>
                </div>
                <div className="text-center flex flex-col w-[10%] text-richblack-400">
                    <p>1</p>
                    <p>2</p>
                    <p>3</p>
                    <p>4</p>
                    <p>5</p>
                    <p>6</p>
                    <p>7</p>
                    <p>8</p>
                    <p>9</p>
                    <p>10</p>
                    <p>11</p>
                    <p>12</p>
                </div>
                {/* now code part 90% */}
                <div className={`w-[90%] flex flex-col gap-2 font-bold font-mono ${codeColor} pr-2`}>
                    {/* code type animation */}
                    <TypeAnimation 
                    sequence={[codeblock, 2000, ""]}
                    repeat={Infinity}
                    cursor={true}
                    omitDeletionAnimation={true}
                    style={
                        {
                            whiteSpace: "pre-line",
                            display:"block",
                        }
                    }
                    />
                </div>
            </div>
        </div>
    );
}

export default CodeBlocks;