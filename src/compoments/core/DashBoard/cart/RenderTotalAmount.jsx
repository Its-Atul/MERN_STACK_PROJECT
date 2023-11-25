import React from "react";
import { useDispatch, useSelector } from "react-redux";
import IconBtn from "../../../comman/iconBtn";
import { buyCourse } from "../../../../services/operations/studentFeatureAPI";
import { useNavigate } from "react-router-dom";

const RenderTotalAmount = () =>{
    const { total, cart} = useSelector((state) => state.cart);
    const { token } = useSelector((state) => state.auth);
    const { user } = useSelector((state) => state.profile);
    const navigate = useNavigate();
    const dispatch = useDispatch();


    const handlebuyCourse = () =>{
        const courses = cart.map((course) => course._id);
        console.log("Bought this courses", courses);
        buyCourse(token, courses, user, navigate, dispatch);
    }
    return(
        <div className="min-w-[280px] rounded-md border-[1px] border-richblack-700 p-3 mt-2">
            <h2 className="mb-1 text-sm font-medium text-richblack-5">Total:</h2>
            <p className="mb-6 text-3xl font-medium text-yellow-100">Rs. {total}</p>
            <IconBtn text="BUY NOW" onClick={handlebuyCourse} customClasses={" w-full justify-center"}/>
        </div>
    );
}

export default RenderTotalAmount;