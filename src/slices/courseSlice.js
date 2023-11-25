import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    step:1,
    course: localStorage.getItem("course") ? JSON.parse(localStorage.getItem("course")) : null,
    editCourse:false,
    paymentLoading:false,
}

 export const courseSlice = createSlice({
    name:"course",
    initialState,
    reducers:{
        setStep:(state, action) =>{
            state.step = action.payload
        },
        setCourse: (state, action) =>{
            state.course = action.payload
            localStorage.setItem("course", JSON.stringify(state.course))
        },
        setEditCourse: (state, action) =>{
            state.editCourse = action.payload
            localStorage.setItem("editcourse", JSON.stringify(state.editCourse))
        },
        setPaymentLoading:(state, action) =>{
            state.paymentLoading = action.payload
        },
        resetCourseState: (state) =>{
            state.step = 1 
            state.course = null
            state.editCourse = false
        },
    },
});

export const {
    setStep, setCourse,
    setEditCourse, 
    setPaymentLoading,
    resetCourseState
} = courseSlice.actions;

export default courseSlice.reducer;