import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { getInstructorDashboardData } from '../../../../services/operations/profileAPI';
import { useDispatch, useSelector } from 'react-redux';
import { fetchInstructorCourses } from '../../../../services/operations/courseDetailsAPI';
import { Link, useNavigate } from 'react-router-dom';
import Spinner from '../../../comman/Spinner';
import { InstructorChart } from './InstructorChart';
import { Swiper, SwiperSlide } from 'swiper/react';
import "swiper/css";
import "swiper/css/pagination";
// import required modules
import { Pagination } from "swiper/modules";

export const InstructorDash = () => {

    const { token } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user } = useSelector((state) => state.profile);
    const [loading, setLoading] = useState(false);
    const [instructorData, setIntructorData] = useState(null);
    const [coursesData, setCoursesData] = useState([]);
    useEffect(() => {
        const getCourseData_withStat = async () => {
            setLoading(true);
            const instructorDataApi = await getInstructorDashboardData(token);
            // for all the instructor courses 
            const result = await fetchInstructorCourses(token, dispatch, navigate);
            console.log("the instructor api result : ", instructorDataApi);
            if (instructorDataApi.length) {
                setIntructorData(instructorDataApi);
            }
            if (result) {
                setCoursesData(result);
            }
            setLoading(false);
        }
        getCourseData_withStat();
    }, [])

    const totalAmount = instructorData?.reduce((acc, curr) => acc + curr.totalAmountEarned, 0);
    const totalStudent = instructorData?.reduce((acc, curr) => acc + curr.totalStudentEnrolled, 0);
    return (
        <div className=' text-richblack-5 p-4 py-6'>
            <div className='space-y-2'>
                <h1 className='text-2xl font-semibold'>
                    Hi {user?.firstName} {user?.lastName} 👋
                </h1>
                <p className='font-medium text-richblack-200'>
                    Let's Start Something New !
                </p>
            </div>
            {
                loading ? (
                    <Spinner />
                ) : coursesData.length > 0 ? (
                    <div>
                        <div className='my-4 flex h-[450px] space-x-4'>
                            {/* Render Chart and Stats ==> box 1 */}
                            {totalAmount > 0 || totalStudent > 0 ? (
                                <InstructorChart courses={instructorData} />
                            ) : (
                                <div className='flex-1 rounded-md bg-richblack-800 p-6'>
                                    <p className='text-lg font-bold text-richblack-5'>Visualize</p>
                                    <p className='mt-4 text-xl font-medium text-richblack-50'>Not Enough Data To Visualize</p>
                                </div>
                            )}
                            {/* Total Statistics ===> box 2 */}
                            <div className='flex min-w-[320px] flex-col rounded-md bg-richblack-800 p-6'>
                                <p className='text-lg font-bold text-richblack-25'>
                                    Statistics
                                </p>
                                <div className=''>
                                    <p className='text-lg text-richblack-200'>
                                        Total Courses:
                                    </p>
                                    <p className='text-2xl font-semibold text-richblack-50'>
                                        {coursesData.length}
                                    </p>
                                </div>
                                <div>
                                    <p className='text-lg text-richblack-200'>
                                        Total Enrolled Students:
                                    </p>
                                    <p className='text-2xl font-semibold text-richblack-50'>
                                        {totalStudent}
                                    </p>
                                </div>
                                <div>
                                    <p className='text-lg text-richblack-200'>
                                        Total Income:
                                    </p>
                                    <p className='text-2xl font-semibold text-richblack-50'>
                                        Rs. {totalAmount}.00/-
                                    </p>
                                </div>
                            </div>

                        </div>
                        {/* Render Some of the instructors courses */}
                        <div className='rounded-md bg-richblack-800 p-6'>
                            {/* View All course to move to mY cOURFSES */}
                            <div className='flex items-center justify-between'>
                                <p className='text-lg font-semibold text-richblac-5'>YOUR COURSES</p>
                                <Link to={"/dashboard/my-courses"}>
                                    <p className='text-xs font-semibold text-yellow-50'>View All</p>
                                </Link>
                            </div>
                            {/* Show al the courses */}
                            <div className='my-4 flex items-center space-x-6'>
                                <Swiper
                                    slidesPerView={3}
                                    spaceBetween={50}
                                    loop={true}
                                    grabCursor={true}
                                    breakpoints={{
                                      1024:{
                                        slidesPerView: 3
                                      }
                                    }}
                                    pagination={{
                                      dynamicBullets: true,
                                    }}
                                    modules={[Pagination]}
                                    className="mySwiper"
                                >
                                    {
                                        coursesData.map((course) => (
                                            <SwiperSlide key={course._id} className='w-1/3'>
                                                <img src={course.thumbnail} alt={course.courseName} className='h-[210px] w-full rounded-md object-cover' />
                                                <div className='mt-3 w-full ml-2'>
                                                    <p className='text-sm font-medium text-richblack-50'>
                                                        {course.courseName}
                                                    </p>
                                                    <div className='mt-1 flex items-center space-x-2'>
                                                        <p className="text-xs font-medium text-richblack-300">
                                                            {course.studentsEnrolled.length} students
                                                        </p>
                                                        <p className="text-xs font-medium text-richblack-300">
                                                            |
                                                        </p>
                                                        <p className="text-xs font-medium text-richblack-300">
                                                            Rs. {course.price}
                                                        </p>
                                                    </div>
                                                </div>
                                            </SwiperSlide>
                                        ))
                                    }
                                </Swiper>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className='mt-20 rounded-md bg-richblack-800 py-20'>
                        <p className="text-center text-2xl font-bold text-richblack-5">
                            You have not created any courses yet
                        </p>
                        <Link to="/dashboard/add-course">
                            <p className="mt-1 text-center text-lg font-semibold text-yellow-50">
                                Create a course
                            </p>
                        </Link>
                    </div>
                )
            }
        </div>
    )
}
