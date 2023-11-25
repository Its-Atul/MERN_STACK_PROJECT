import React from "react";
import { useSelector } from "react-redux";
import RenderCartCourses from "./cart/RenderCartCourses";
import RenderTotalAmount from "./cart/RenderTotalAmount";

const Cart = () =>{
    const { total, totalItems} = useSelector((state) =>state.cart);
    return(
        <div className="text-richblack-5 w-11/12 max-w-[1000px] mx-auto py-10">
            <h2 className="mb-6 text-3xl font-medium text-richblack-5">My Wishlist</h2>
            <p>{totalItems} course in the Cart</p>
            <hr className="h-[2px] text-richblack-700"/>
            {
                total > 0 ? (
                    <div>
                        <RenderCartCourses />
                        <RenderTotalAmount />
                    </div>
                ) : (
                   <p>Cart is Empty</p> 
                )
            }
        </div>
    );
}

export default Cart;