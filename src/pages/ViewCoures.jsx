import React, { useState } from 'react'
import { ViewCourseSideBar } from '../compoments/core/View_Coures/ViewCourseSideBar';
import { Outlet, useParams } from 'react-router-dom';
import { CourseReviewModel } from '../compoments/core/View_Coures/CourseReviewModel';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getFullDetailCourse } from '../services/operations/courseDetailsAPI';
import { setCompletedLectures, setCourseSectionData, setEntireCourseData, setTotalNoOfLectures } from '../slices/viewCourseSlice';

export const ViewCoures = () => {
    // state variable for review model 
    const [reviewModal, setReviewModel] = useState(false);
    const { courseId } = useParams();
    const { token } = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    useEffect(() => {
        const setCourseSpeccificDetails = async () => {
            // get the course details 
            const courseData = await getFullDetailCourse(courseId, token);
            dispatch(setCourseSectionData(courseData.courseDetails.courseContent));
            dispatch(setEntireCourseData(courseData.courseDetails));
            dispatch(setCompletedLectures(courseData.completedVideos));
            let lectures = 0;
            courseData?.courseDetails?.courseContent?.forEach((sec) => {
                lectures += sec.subSection.length
            })
            dispatch(setTotalNoOfLectures(lectures));
        }

        setCourseSpeccificDetails();
    }, [])
    return (
        <>
            <div className='relative flex h-[calc(100vh-3.5rem)]'>
                {/* side bar to of the video section */}
                <ViewCourseSideBar setReviewModel={setReviewModel} />
                <div className="h-[calc(100vh-3.5rem)] flex-1 overflow-auto">
                    <div>
                        <Outlet />
                    </div>
                </div>
            </div>
            {
                reviewModal && <CourseReviewModel setReviewModal={setReviewModel} />
            }
        </>
    )
}
