import React from "react";
import notFound from "../assets/Images/not-found.png"
import { Link } from "react-router-dom";
const ErrorPage = () =>{
    return(
        <div className="w-full h-[100vh] flex flex-col justify-center items-center">
            <img src={notFound} alt="not found" width={400} height={300}/>
            <p className=" text-richblack-5 font-bold text-3xl"> Page not found</p>
            <Link to="/">
                <div className="mt-3 px-5 py-3 border-[1px] border-r-richblack-600 text-richblack-100">
                    <p className=" font-bold">
                        Go To Home
                    </p>
                </div>
            </Link>
        </div>
    );
}

export default ErrorPage;