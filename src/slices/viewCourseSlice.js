import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    courseSectionData: localStorage.getItem("courseSectionData") ? JSON.parse(localStorage.getItem("courseSectionData")) : [],
    courseEntireData: localStorage.getItem("courseEntireData") ? JSON.parse(localStorage.getItem("courseEntireData")) : [],
    completedLectures: [],
    totalNoOfLectures: 0,
}

export const viewCourseSlice = createSlice({
    name:"viewCourse",
    initialState,
    reducers:{
        setCourseSectionData: (state, action) =>{
            state.courseSectionData = action.payload
        },
        setEntireCourseData: (state, action) =>{
            state.courseEntireData = action.payload
        },
        setTotalNoOfLectures: (state, action) =>{
            state.totalNoOfLectures = action.payload
        },
        setCompletedLectures: (state, action) =>{
            state.completedLectures = action.payload
        },
        updateCompletedLectures: (state, action) => {
            state.completedLectures = [...state.completedLectures, action.payload]
        },
    },
});

export const {
    setCompletedLectures,
    setCourseSectionData,
    setEntireCourseData,
    setTotalNoOfLectures,
    updateCompletedLectures
} = viewCourseSlice.actions;

export default viewCourseSlice.reducer;