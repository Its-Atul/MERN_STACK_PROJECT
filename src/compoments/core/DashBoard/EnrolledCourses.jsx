import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getUserEnrolledCourses } from "../../../services/operations/profileAPI";
import ProgressBar from "@ramonak/react-progress-bar";
import Spinner from "../../comman/Spinner";
import { useNavigate } from "react-router-dom";

const EnrolledCourses = () => {
    const { token } = useSelector((state) => state.auth);
    const navigate = useNavigate();
    const [enrolledCourses, setEnrolledCourses] = useState(null);

    const getErolledCourses = async () => {
        try {
            const response = await getUserEnrolledCourses(token);
            setEnrolledCourses(response);
        } catch (error) {
            console.error("Couldn't fetch enrolled courses", error);
        }
    }

    useEffect(() => {
        getErolledCourses();
    }, [])
    return (
        <div className="w-11/12 max-w-[1000px] mx-auto py-10 text-richblack-25">
            <h2 className="mb-12 text-3xl font-medium text-richblack-5">Enrolled Courses</h2>
            {
                !enrolledCourses ? (
                    <div className="flex justify-center items-center">
                        <Spinner />
                    </div>
                ) : !enrolledCourses.length ? (
                    <p className="flex justify-center items-center h-[10vh] text-lg text-richblack-5 font-semibold">
                        You have not Enrolled in Any Course till now
                    </p>
                ) : (
                    <div className="flex flex-col bg-transparent rounded-md gap-2 border-2 border-richblack-700">
                        <div className="flex flex-row rounded-t-md px-4 py-3 bg-richblack-600 text-richblack-300 font-semibold">
                            <h2 className="w-[50%]">Course Name</h2>
                            <h2 className="w-[25%] flex justify-start">Duration</h2>
                            <h2 className="w-[25%] flex justify-start">Progress</h2>
                        </div>
                        {/* to show card */}
                        {
                            enrolledCourses.map((course, index) => (
                                <div key={index} className="flex flex-row bg-transparent border-b-[1px] border-richblack-600 px-4 py-2 w-full">
                                    <div className="w-[50%] flex flex-row gap-x-2 " onClick={() => {
                                        navigate(`/view-course/${course?._id}/section/${course.courseContent[0]?._id}/sub-section/${course.courseContent[0]?.subSection[0]?._id}`)
                                    }}>
                                        <div className=" flex flex-col justify-center items-center lg:w-[15%]">
                                            <img src={course.thumbnail} alt="thumbnail"
                                                className="rounded-lg object-cover aspect-square lg:w-[52px] lg:h-[52px]" />
                                        </div>
                                        <div className="flex flex-col">
                                            <p className="text-richblack-5 font-semibold text-lg">{course.courseName}</p>
                                            <p className=" text-richblack-25 font-normal text-sm">{course.courseDescription.length > 50 ? `${course.courseDescription.slice(0, 50)}...` : course.courseDescription}</p>
                                        </div>
                                    </div>

                                    <div className="w-[25%] text-richblack-25 font-semibold flex justify-start items-center">
                                        {course.totalCourseDuration}
                                    </div>
                                    <div className="w-[25%] flex items-center">
                                        {
                                            course.progressPercentage !== 100 ? (
                                                <div className="w-[100%] gap-1 -mt-4">
                                                    <p>Progess: {course.progressPercentage || 0}%</p>
                                                    <ProgressBar
                                                        maxCompleted={100}
                                                        completed={course.progressPercentage || 0}
                                                        height="8px"
                                                        isLabelVisible={false}
                                                        className=" bg-richblack-700"
                                                    />
                                                </div>
                                            ) : (
                                                <p className="text-lg">Course Completed</p>
                                            )
                                        }
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                )
            }
        </div>
    )
}
export default EnrolledCourses;