import React from "react";
import { Link } from "react-router-dom";

const CTAButton = ({children, active, linkto}) =>{
    return(
        <div className={`text-center text-lg border-l-[0.5px] border-b-[1px]  px-6 py-3 rounded-md font-bold ${active ? "bg-yellow-50 border-richblack-5 text-black" : "bg-richblack-800 text-richblack-300 border-richblack-400" } hover:scale-105 transition-all duration-300 `}>
            <Link to={linkto}>
                <div>
                    {children}
                </div>
            </Link>
        </div>
    );
};

export default CTAButton;