import React from "react";
import Logo1 from "../../../assets/TimeLineLogo/Logo1.svg";
import Logo2 from "../../../assets/TimeLineLogo/Logo2.svg";
import Logo3 from "../../../assets/TimeLineLogo/Logo3.svg";
import Logo4 from "../../../assets/TimeLineLogo/Logo4.svg";
import timeLineImage from "../../../assets/Images/TimelineImage.png";
const timeLine = [
    {
        Logo: Logo1,
        Heading: "Leadership",
        Description: "Fully committed to the success company"
    },
    {
        Logo: Logo2,
        Heading: "Responsibility",
        Description: "Students will always be our top priority"
    },
    {
        Logo: Logo3,
        Heading: "Flexibility",
        Description: "The ability to switch is an important skills"
    },
    {
        Logo: Logo4,
        Heading: "Solve the problem",
        Description: "Code your way to a solution"
    }
]
const TimeLineSection = () => {
    return (
        <div className="flex lg:flex-row flex-col gap-20 mb-20 items-center max-w-maxContent w-11/12 mx-auto mt-4">
            {/* box - 1 */}
            <div className="w-[45%] flex flex-col gap-14 lg:gap-3">
                {
                    timeLine.map((element, index) => {
                        return (
                            <div className="flex flex-row gap-6" key={index}>
                                <div className="w-[52px] h-[52px] bg-white flex items-center justify-center p-2 shadow-[#00000012] rounded-full">
                                    <img src={element.Logo} alt="logo" className=" rounded-full"/>
                                </div>
                                <div>
                                    <h2 className="font-semibold text-base">
                                        {element.Heading}
                                    </h2>
                                    <p className="text-base">
                                        {element.Description}
                                    </p>
                                </div>
                            </div>
                        );
                    })
                }
            </div>
            {/* box -2 */}
            <div className="relative shadow-2xl shadow-blue-200 ">
                <img src={timeLineImage} alt="timeLineImage" className="rounded-md object-cover h-fit" /> 
                <div className="absolute bg-caribbeangreen-700 text-white flex lg:flex-row flex-col uppercase py-10 lg:translate-x-[18%] lg:translate-y-[-50%] top-0">
                    <div className="flex gap-5 items-center lg:border-r lg:border-caribbeangreen-50 lg:px-12 px-6">
                        <h2 className="text-3xl font-bold w-[75px]">10</h2>
                        <p className=" text-sm font-semibold w-[75px] text-caribbeangreen-200">Years Experience</p>
                    </div>
                    <div className="flex gap-5  items-center px-6">
                        <h1 className="text-3xl w-[75px] font-bold">
                            250
                        </h1>
                        <p className=" text-sm font-semibold w-[75px] text-caribbeangreen-200 ">
                            Types of Courses
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TimeLineSection;