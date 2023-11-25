import React from "react";
import {ImTree} from "react-icons/im"
import {HiUsers} from "react-icons/hi"
const CourseCard = ({ cardData, currentCard, setCurrentCard }) => {

    return (
        <div className={`lg:w-[30%] w-[360px] font-inter
            ${currentCard === cardData?.heading ? "bg-white shadow-[12px_12px_0_0] shadow-yellow-50 rounded-lg" : "bg-richblack-800"} text-richblack-25 h-[300px] box-border cursor-pointer
        `}
            onClick={() => setCurrentCard(cardData?.heading)}
        >
            <div className="border-b-2 border-richblack-400 border-dashed h-[80%] p-6 flex flex-col gap-3">
                <div className={`${
                    currentCard === cardData?.heading && "text-richblack-800"
                } font-semibold text-xl`}>
                    {cardData?.heading}
                </div>
                <div className="text-richblack-400">
                    {cardData?.description}
                </div>
            </div>
            <div className={`flex justify-between ${
                currentCard === cardData?.heading ? " text-[#12D8FA] font-bold" : "text-richblack-300"
            } px-6 py-3 font-medium` }>
                {/* level */}
                <div className="flex items-center gap-2 text-base">
                    <HiUsers />
                    <p>{cardData?.level}</p>
                </div>
                {/* lesson Number */}
                <div className="flex items-center gap-2 text-base">
                    <ImTree />
                    <p>{cardData?.lessionNumber} Lessions</p>
                </div>
            </div>
        </div> 
    );
}

export default CourseCard;