import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Table, Tbody, Th, Td, Tr, Thead } from "react-super-responsive-table";
import { COURSE_STATUS } from "../../../../utils/constanst";
import { AiOutlineClockCircle } from "react-icons/ai";
import { MdOutlineDoneAll } from "react-icons/md";
import { FiEdit } from "react-icons/fi";
import { RiDeleteBin6Line } from "react-icons/ri";
import ConfirmationModal from "../../../comman/ConfirmationModal";
import { deleteCourse, fetchInstructorCourses } from "../../../../services/operations/courseDetailsAPI";
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';
import { formatDate } from "../../../../services/formatDate";

const CourseTable = ({ courses, setCourses }) =>{
    const { token } = useSelector((state) => state.auth);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const [confirmationModal, setConfirmationModal] = useState(null);
    const SHOWDESCLENGTH = 30;

    const deleteCourseHandler = async (courseId) => {
        setLoading(true);
        await deleteCourse({courseId: courseId}, token);
        const result = await fetchInstructorCourses(token, dispatch, navigate);
        if (result) {
            setCourses(result);
        }
        setConfirmationModal(null);
        setLoading(false);
    }
    return (
        <div className="mt-8">
            <Table className=" border-2 border-richblack-800">
                <Thead className=" font-semibold">
                    <Tr className="flex gap-x-10 rounded-t-md border-b border-richblack-800 px-6 py-2">
                        <Th className="flex-1 text-left font-medium uppercase text-richblack-100">
                            COURSES
                        </Th>
                        <Th className="text-left font-medium uppercase text-richblack-100">
                            DURATION
                        </Th>
                        <Th className=" text-left font-medium uppercase text-richblack-100 ">
                            PRICE
                        </Th>
                        <Th className=" text-left font-medium uppercase text-richblack-100">
                            ACTIONS
                        </Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {
                        courses?.length === 0 ? (
                            <Tr>
                                <Td className="py-10 text-center text-2xl font-medium text-richblack-100">
                                    NO COURSE FOUND !!
                                    Please first add courses
                                </Td>
                            </Tr>
                        ) : (
                            courses?.map((course) => {
                                return (
                                    <Tr key={course._id} className="flex flex-row border-b border-richblack-800 gap-x-10 px-6 py-4">
                                        <Td className="flex flex-1 gap-x-4">
                                            <img src={course?.thumbnail} alt="course thumbnail" width={220} className=" rounded-lg object-cover h-[160px]" />
                                            <div className="flex flex-col justify-between h-[80%]">
                                                <p className="text-lg font-semibold text-richblack-5">{course.courseName}</p>
                                                <p className=" text-sm font-medium text-richblack-50">
                                                    {
                                                        course.courseDescription.split(" ").length > SHOWDESCLENGTH ? course.courseDescription.split(" ").slice(0, SHOWDESCLENGTH).join(" ") + "...." : course.courseDescription
                                                    }
                                                </p>
                                                <p className="text-white text-sm"> <span className="font-semibold">Created At :</span> {formatDate(course.createdAt)}</p>
                                                {/* to show the status of the course we need to do the conditional rendering  */}
                                                {
                                                    course.status === COURSE_STATUS.DRAFT ? (
                                                        <p className="flex w-fit flex-row justify-between items-center gap-2 rounded-full bg-richblack-600 px-2 py-[2px] text-sm font-medium text-pink-100">
                                                            <AiOutlineClockCircle size={14} />
                                                            DRAFTED
                                                        </p>
                                                    ) : (
                                                        <p className="flex w-fit flex-row justify-between items-center gap-2 rounded-full bg-richblack-600 px-2 py-[2px] text-sm font-medium text-yellow-50">
                                                            <MdOutlineDoneAll size={14} />
                                                            PUBLISHED
                                                        </p>
                                                    )
                                                }
                                            </div>
                                        </Td>
                                        <Td>
                                            <p className=" text-left text-sm font-medium text-richblack-100">{course?.totalCourseDuration}</p>
                                        </Td>
                                        <Td>
                                            <p className=" text-left text-sm font-medium text-richblack-100">
                                                ₹{course?.price}
                                            </p>
                                        </Td>
                                        <Td className="text-sm font-medium text-richblack-100">
                                            <button
                                                disabled={loading}
                                                onClick={() => navigate(`/dashboard/edit-course/${course._id}`)}
                                                className="px-2 transition-all duration-200 hover:scale-105 hover:text-caribbeangreen-100"
                                                title="Edit"
                                            >
                                                <FiEdit size={20}/>
                                            </button>
                                            <button
                                                disabled={loading}
                                                onClick={() => {
                                                    setConfirmationModal({
                                                        text1: "Do you want to delete this course?",
                                                        text2: "All the data related to this course will be deleted",
                                                        btn1Text: "Delete",
                                                        btn2Text: "Cancel",
                                                        btn1Handler: !loading ? (
                                                            () => deleteCourseHandler(course._id)
                                                        ) : (
                                                            {}
                                                        ),
                                                        btn2Handler:() => setConfirmationModal(null)
                                                    })
                                                }}
                                                className="px-2 transition-all duration-200 hover:scale-105 hover:text-[#ff0000]"
                                                title="Delete"
                                            >
                                                <RiDeleteBin6Line size={20}/>
                                            </button>
                                        </Td>
                                    </Tr>
                                )
                            })
                        )
                    }
                </Tbody>
            </Table>
            {
                confirmationModal && <ConfirmationModal modalData={confirmationModal} />
            }
        </div>
    );
}

export default CourseTable;