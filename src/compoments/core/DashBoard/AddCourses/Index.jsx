import React from "react";
import RenderSteps from "./RenderSteps";

export default function AddCourse() {
    return (
        <>
            <div className="w-11/12 max-w-[1000px] mx-auto py-10 text-richblack-25 flex mt-4 font-inter gap-x-6 justify-between flex-row"> 
                <div className="flex flex-col w-[58%]">
                    <h1 className="text-3xl mb-14 font-medium text-richblack-5">Add Course</h1>
                    <div>
                        <RenderSteps />
                    </div>
                </div>
                <div className="w-[42%] p-6 max-w-[400px] rounded-md border-richblack-600 bg-richblack-800 border-2 h-fit">
                    <h2 className="mb-8 text-lg text-richblack-5">⚡Course Upload Tips</h2>
                    <ul className="ml-5 list-item list-disc space-y-3 text-xs text-richblack-5">
                        <li>Set the Course Price option or make it free.</li>
                        <li>Standard size for the course thumbnail is 1024x576.</li>
                        <li>Video section controls the course overview video.</li>
                        <li>Course Builder is where you create & organize a course.</li>
                        <li>Add Topics in the Course Builder section to create lessons, quizzes, and assignments.</li>
                        <li>Information from the Additional Data section shows up on the course single page.</li>
                        <li>Make Announcements to notify any important</li>
                        <li>Notes to all enrolled students at once.</li>
                    </ul>
                </div>
            </div>
        </>
    )
}