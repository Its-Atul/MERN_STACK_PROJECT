import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";

const initailState = {
    totalItems: localStorage.getItem("totalItems") ? JSON.parse(localStorage.getItem("totalItems")) : 0,
    cart: localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : [],
    total: localStorage.getItem("toatal") ? JSON.parse(localStorage.getItem("total")) : 0,
}
export const cartSlice = createSlice({
    name: "cart",
    initialState: initailState,
    reducers: {
        // add to cart 
        addToCart: (state, action) => {
            const course = action.payload;
            // const index = state.cart.findIndex((item) => item._id === course._id);
            const index = state.cart?.findIndex((item) => item._id === course._id);

            if (index >= 0) {
                // if course is already present in the cart
                toast.error("Course is Already in Cart");
                return;
            }

            // if course is not in the cart then add it 
            state.cart.push(course);
            // and update the quantity
            state.totalItems++
            // and price also
            state.total += course.price

            // Update to localStorage
            localStorage.setItem("cart", JSON.stringify(state.cart));
            localStorage.setItem("total", JSON.stringify(state.total));
            localStorage.setItem("totalItems", JSON.stringify(state.totalItems));
            // show success toast 
            toast.success("course added to cart");
        },
        // remove from cart
        removeFromCart: (state, action) => {
            const courseId = action.payload;
            const index = state.cart.findIndex((item) => item._id === courseId);

            if (index >= 0) {
                // if the course is in the cart 
                state.totalItems--
                state.total -= state.cart[index].price;
                state.cart.splice(index, 1)
                // update to localStorage
                localStorage.setItem("cart", JSON.stringify(state.cart));
                localStorage.setItem("total", JSON.stringify(state.total));
                localStorage.setItem("totalItems", JSON.stringify(state.totalItems));
                // toast success
                toast.success("Course removed from Cart");
            }
        },
        // reset cart
        resetCart: (state) => {
            state.cart = [];
            state.total = 0;
            state.totalItems = 0;
            // update to localStorage
            localStorage.removeItem("cart")
            localStorage.removeItem("total")
            localStorage.removeItem("totalItems")
        },
    },
});

export const { addToCart, resetCart, removeFromCart } = cartSlice.actions;
export default cartSlice.reducer;