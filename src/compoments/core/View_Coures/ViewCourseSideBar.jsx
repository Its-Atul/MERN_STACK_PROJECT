import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react'
import { useSelector } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { IoIosArrowBack } from "react-icons/io"
import IconBtn from '../../comman/iconBtn';
import { AiOutlineDown } from 'react-icons/ai';
export const ViewCourseSideBar = ({ setReviewModel }) => {
    const [activeStatus, setActiveStatus] = useState("");
    const [videoBarActive, setVideoBarActive] = useState("");
    const { sectionId, subSectionId } = useParams();
    const navigate = useNavigate();
    const location = useLocation();

    const {
        courseSectionData,
        courseEntireData,
        totalNoOfLectures,
        completedLectures
    } = useSelector((state) => state.viewCourse);

    // console.log("The completed lecture will be", completedLectures);
    // console.log("The total Number of lectures", totalNoOfLectures);

    useEffect(() => {
        ; (() => {
            if (!courseSectionData.length) {
                return;
            }

            const currentSectionIndex = courseSectionData.findIndex((data) => data._id === sectionId);
            const currentSubSectionIndex = courseSectionData?.[currentSectionIndex]?.subSection.findIndex((data) => data._id === subSectionId)
            const activeSubSectionId = courseSectionData?.[currentSectionIndex]?.subSection?.[currentSubSectionIndex]?._id;

            // settings the current Section or SubSection id which is presently active 
            setActiveStatus(courseSectionData?.[currentSectionIndex]);
            setVideoBarActive(activeSubSectionId);
        })()
    }, [courseSectionData, courseEntireData, location.pathname])
    return (
        <div className='flex h-[calc(100vh - 3.5rem)] w-[350px] max-w-[380px] flex-col border-r-[2px] border-r-richblack-700 bg-richblack-800'>
            {/* top level div */}
            <div className='mx-5 flex flex-col items-start justify-between gap-2 gap-y-3 border-b border-richblack-600 py-5 text-lg font-semibold text-richblack-25'>
                {/* for buttons and heading */}
                <div className='flex w-full items-center justify-between'>
                    {/* back buttons */}
                    <div onClick={() => navigate("dashboard/enrolled-courses")} className='flex items-center'>
                        <IoIosArrowBack size={20} />
                        Back
                    </div>
                    {/* Review Button */}
                    <div>
                        <IconBtn
                            text="Add Review"
                            onClick={() => setReviewModel(true)}
                        />
                    </div>
                </div>
                {/* for heading and title */}
                <div className='flex flex-col'>
                    <p>{courseEntireData?.courseName}</p>
                    <p className='text-sm text-richblack-500'>{completedLectures?.length} / {totalNoOfLectures}</p>
                </div>
            </div>

            {/* for section and subSection Hierachy  */}
            <div className='h-[calc(100vh)] overflow-y-auto'>
                {
                    courseSectionData.map((course, index) => (
                        <div onClick={() => setActiveStatus(course?._id)} key={index} className='mt-2 cursor-pointer text-sm text-richblack-5'>
                            {/* section */}
                            <div className='flex flex-row justify-between bg-richblack-600 px-5 py-4'>
                                <p className='w-[70%] font-semibold'>
                                    {course?.sectionName}
                                </p>
                                <i className={`${activeStatus === course?.sectionName ? "rotate-180" : "rotate-0"} transition-all duration-300`}>
                                    <AiOutlineDown />
                                </i>
                            </div>

                            {/* subSection */}
                            {
                                activeStatus === course?._id && (
                                    <div className=' transition-[height] duration-500 ease-in-out'>
                                        {
                                            course.subSection.map(((topic, i) => {
                                                return (
                                                    <div className={`flex gap-3 px-5 py-2 ${videoBarActive === topic._id ? "bg-yellow-200 font-semibold text-richblack-800" : "hover:bg-richblack-800"
                                                        }`}
                                                        key={i}
                                                        onClick={() => {
                                                            navigate(`/view-course/${courseEntireData._id}/section/${course._id}/sub-section/${topic._id}`)
                                                            setVideoBarActive(topic?._id)
                                                        }}
                                                    >
                                                        <input type="checkbox" 
                                                        checked={completedLectures.includes(topic?._id)}
                                                            onChange={() => {}}
                                                        />
                                                        {
                                                            topic.title
                                                        }
                                                    </div>
                                                )
                                            }))
                                        }
                                    </div>
                                )
                            }
                        </div>
                    ))
                }
            </div>
        </div>
    )
}
