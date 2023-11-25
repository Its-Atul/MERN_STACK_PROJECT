import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Spinner from "../../../comman/Spinner";
import RenderSteps from '../AddCourses/RenderSteps';
import { useEffect } from 'react';
import { getFullDetailCourse } from '../../../../services/operations/courseDetailsAPI';
import { setCourse, setEditCourse } from '../../../../slices/courseSlice';

const EditCourseIns = () => {

    const dispatch = useDispatch();
    const { courseId } = useParams();
    const { course } = useSelector((state) => state.course);
    const [loading, setLoading] = useState(false);
    const { token } = useSelector((state) => state.auth);

    useEffect(() => {
        const populateCourseDetails = async () => {
            setLoading(true);
            const result = await getFullDetailCourse(courseId, token);
            if (result?.courseDetails) {
                dispatch(setEditCourse(true));
                dispatch(setCourse(result?.courseDetails));
            }
            setLoading(false);
        }

        populateCourseDetails();
    }, [])

    if (loading) {
        return (
            <div>
                <Spinner />
            </div>
        )
    }
    return (
        <div className='text-white'>
            <h1 className='mb-14 text-3xl font-medium text-richblack-5'>Edit Course</h1>
            <div>
                {
                    course ? (
                        <div className='mx-auto max-w-[600px]'>
                            <RenderSteps />
                        </div>
                    ) : (
                        <div className='"mt-14 text-center text-3xl font-semibold text-richblack-100'>
                            NO COURSE FOUND
                        </div>
                    )
                }
            </div>
        </div>
    )
}

export default EditCourseIns;
