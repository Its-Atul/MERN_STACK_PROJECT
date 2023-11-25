import React, { useState } from "react";
import { HomePageExplore } from "../../../data/homepage-explore";
import HighLightText from "./HighLightText";
import CourseCard from "../../comman/CourseCard";
const tabName = [
    "Free", "New to coding", "Most popular", "Skill paths", "Career paths"
]
const ExploreMore = () => {

    const [currentTab, setCurrentTab] = useState(tabName[0]);
    const [courses, setCourses] = useState(HomePageExplore[0].courses)
    const [currentCard, setCurrentCard] = useState(HomePageExplore[0].courses[0].heading)

    const setMyCard = (value) => {
        setCurrentTab(value);
        const result = HomePageExplore.filter((course) => course.tag === value);
        setCourses(result[0].courses);
        setCurrentCard(result[0].courses[0].heading);
    }

    return (
        <div className=" font-inter">
            <div className="text-4xl font-semibold text-center">
                Unlock the
                <HighLightText text={"Power of Code"} />
            </div>
            <p className="font-semibold text-richblack-300 text-center -ml-[15px] text-lg mt-1">
                Learn to Build Anything You Can Imagine
            </p>
            {/* Tab component */}
            <div className="lg:flex hidden flex-row rounded-full text-richblack-100 bg-richblack-800 mb-5 border-richblack-300 border-2 py-1 px-2 w-max gap-5 font-inter lg:mt-5 lg:mb-20">
                {
                    tabName.map((ele, i)=>{
                        return(
                            <div 
                            className={`text-base flex items-center gap-3
                                ${currentTab === ele ? " bg-richblack-900 text-richblack-5 font-medium" : " text-richblack-300"}
                                rounded-full transition-all duration-300 cursor-pointer hover:bg-richblack-900 hover:text-richblack-5 px-7 py-[7px]
                            `}
                            key={i}
                            onClick={()=> setMyCard(ele)}
                            >
                                {ele}
                            </div>
                        )
                    })
                }
            </div>
            {/* div */}
            <div className="lg:h-[150px] lg:block hidden"></div>
            {/* Card Component */}
            <div className="lg:absolute flex gap-10 lg:gap-0 justify-center flex-wrap  lg:justify-between w-full lg:bottom-0 lg:left-[50%] lg:translate-x-[-50%] lg:translate-y-[40%] text-black lg:mb-0 mb-7 lg:px-0 px-3">
                {
                    courses.map((ele, i)=>{
                        return(
                            <CourseCard 
                            key={i}
                            cardData = {ele}
                            currentCard = {currentCard}
                            setCurrentCard = {setCurrentCard}
                            />
                        )
                    })
                }
            </div>
        </div>
    );
}

export default ExploreMore;