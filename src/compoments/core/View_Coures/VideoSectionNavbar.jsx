import React from 'react'
import { useSelector } from 'react-redux'
import IconBtn from '../../comman/iconBtn';
import { AiOutlineArrowLeft, AiOutlineArrowRight } from 'react-icons/ai';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useState } from 'react';
import { useEffect } from 'react';

export const VideoSectionNavbar = ({ handleLectureComplete, loading }) => {

    const { courseEntireData, courseSectionData, completedLectures } = useSelector((state) => state.viewCourse);
    console.log("course Section data golbal", courseSectionData);
    const { courseId, sectionId, subSectionId } = useParams();
    const navigate = useNavigate();
    const location = useLocation();

    const isBeginVideo = () => {
        const currentSectionIndex = courseSectionData.findIndex(
            (data) => data._id === sectionId
        );
        console.log("The course Section Data", courseSectionData);
        const currentSubSectionIndx = courseSectionData[
            currentSectionIndex
        ].subSection.findIndex((data) => data._id === subSectionId)

        if (currentSectionIndex === 0 && currentSubSectionIndx === 0) {
            return true;
        } else {
            return false;
        }
    }
    const isLastVideo = () => {
        const currentSectionIndex = courseSectionData.findIndex(
            (data) => data._id === sectionId
        )
        console.log("The sectio in last video", currentSectionIndex);
        const currentSubSectionIndex = courseSectionData[currentSectionIndex]?.subSection.findIndex(
            (data) => data._id === subSectionId
        )
        console.log("The sub Sectionm in dex in last video", currentSubSectionIndex);

        const noOfSubSection = courseSectionData[currentSectionIndex].subSection.length;
        // console.log("The nuber of subSectrion", noOfSubSection);

        if (currentSectionIndex === courseSectionData.length - 1 && currentSubSectionIndex === noOfSubSection - 1) {
            return true;
        }
        else {
            return false;
        }
    }

    const goToNext = () => {
        const currentSectionIndex = courseSectionData.findIndex(
            (data) => data._id === sectionId
        );
        console.log("the section iNdex in gotonext", currentSectionIndex)
        const noOfSubSection = courseSectionData[currentSectionIndex].subSection.length;
        const currentSubSectionIndex = courseSectionData[currentSectionIndex].subSection.findIndex(
            (data) => data._id === subSectionId
        )

        console.log("The Subsection index in gotonext", currentSubSectionIndex);

        // if there are other lectures in the same section
        if (currentSubSectionIndex !== noOfSubSection - 1) {
            // then to next video of same section 
            const nextSubSectionId = courseSectionData[currentSectionIndex].subSection[currentSubSectionIndex + 1]._id;

            // /so basically navigate on this video 
            navigate(`/view-course/${courseId}/section/${sectionId}/sub-section/${nextSubSectionId}`)
        } else {
            // this means that i am on the last  video of the present section
            const nextSectionId = courseSectionData[currentSectionIndex + 1]._id;
            const nextSubSectionId = courseSectionData[nextSectionId].subSection[0]._id;

            navigate(`/view-course/${courseId}/section/${nextSectionId}/sub-section/${nextSubSectionId}`)
        }
    }

    const goToPrev = () => {
        const currentSectionIndex = courseSectionData.findIndex(
            (data) => data._id === sectionId
        )
        console.log("The Section in prev", currentSectionIndex);
        const noOfSubSection = courseSectionData[currentSectionIndex].subSection.length;
        const currentSubSectionIndex = courseSectionData[currentSectionIndex].subSection.findIndex(
            (data) => data._id === subSectionId
        )
        console.log("The suB sECRION IN PREV", currentSubSectionIndex);

        if (currentSubSectionIndex !== 0) {
            // then same section prev video 
            const prevSubSectionId = courseSectionData[currentSectionIndex].subSection[currentSubSectionIndex - 1]._id;

            navigate(`/view-course/${courseId}/section/${sectionId}/sub-section/${prevSubSectionId}`)
        }
        else {
            const prevSectionId = courseSectionData[currentSectionIndex - 1]._id;
            // the last video 
            const prevSubSectionLenght = courseSectionData[prevSectionId].subSection.length;
            const prevSubSectionId = courseSectionData[prevSectionId].subSection[prevSubSectionLenght - 1]._id;

            // now navigate w
            navigate(`/view-course/${courseId}/section/${prevSectionId}/sub-section/${prevSubSectionId}`)
        }
    }

    return (
        <div className='w-[96%] h-full flex items-center justify-between p-4 mx-auto'>
            <h1 className=' text-xl font-inter font-semibold italic'>{courseEntireData?.courseName}</h1>
            <div className='flex gap-4 flex-row-reverse'>
                {/* next and mark As read button */}
                <div>
                    {
                        !completedLectures.includes(subSectionId) ? (
                            <IconBtn
                                disabled={loading}
                                onClick={() => handleLectureComplete()}
                                text={!loading ? "Complete And Continue" : "Loading.."}
                                customClasses="text-sm"
                            />
                        ) : (
                            <div>
                                {
                                    !isLastVideo() ? (
                                        <IconBtn
                                            disabled={loading}
                                            onClick={goToNext}
                                            text="Next"
                                            customClasses="text-sm"
                                        >
                                            <AiOutlineArrowRight />
                                        </IconBtn>
                                    ) : (
                                        <div className='flex gap-2 items-center rounded-md py-2 px-5 font-semibold text-richblack-25 blur-[1px] -ml-4'>
                                            <p className=' cursor-default'>
                                                Next
                                            </p>
                                            <AiOutlineArrowRight />
                                        </div>
                                    )
                                }
                            </div>
                        )
                    }
                </div>
                {/* previous button */}
                <div className=''>
                    <IconBtn
                        disabled={loading}
                        onClick={goToPrev}
                        text="Previous"
                        customClasses="flex-row-reverse text-sm"
                    >
                        <AiOutlineArrowLeft />
                    </IconBtn>
                    {/* ) : (
                            <div className='flex gap-2 items-center rounded-md py-2 px-5 font-semibold text-richblack-25 blur-[1px] flex-row-reverse -mr-4'>
                                <p className=' cursor-default'>
                                    Previous
                                </p>
                                <AiOutlineArrowLeft />
                            </div>
                        )
                    } */}
                    {/* {
                        completedLectures && (
                            !isBeginVideo() ? (
                                <IconBtn
                                    disabled={loading}
                                    onClick={goToPrev}
                                    text="Previous"
                                    customClasses="flex-row-reverse text-sm"
                                >
                                    <AiOutlineArrowLeft />
                                </IconBtn>
                            ) : (
                                <div className='flex gap-2 items-center rounded-md py-2 px-5 font-semibold text-richblack-25 blur-[1px] flex-row-reverse -mr-4'>
                                    <p className=' cursor-default'>
                                        Previous
                                    </p>
                                    <AiOutlineArrowLeft />
                                </div>
                            )
                        )
                    } */}
                </div>
            </div>
        </div>
    )
}
