import React from "react";
import HighLightText from "../HomePage/HighLightText";
import { RiDoubleQuotesL, RiDoubleQuotesR } from "react-icons/ri";
const Quote = () => {
    return (
        <div className=" md:text-4xl font-semibold mx-auto py-5 pb-20 text-center text-richblack-5">
            <sup className=" text-richblack-300"><RiDoubleQuotesL className=" inline"/></sup>We are passionate about revolutionizing the way we learn. Our innovative platform
            <HighLightText text={"combines technology"} />,
            <span className="text-transparent bg-clip-text font-bold bg-gradient-to-b from-[#FF512F] to-[#F09819]">
                {" "}
                experties
            </span>,
            and community to create an
            <span className="text-transparent bg-clip-text font-bold bg-gradient-to-b from-[#E65C00] to-[#F9D423]">
                {" "}
                unparalleled education experience.
            </span>
            <sup className="text-richblack-300"><RiDoubleQuotesR className=" inline"/></sup>
        </div>
    )
}

export default Quote;