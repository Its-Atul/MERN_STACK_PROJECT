import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import IconBtn from "../../comman/iconBtn";
import { AiOutlineFileAdd } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { deleteAllInstructorCourses, fetchInstructorCourses } from "../../../services/operations/courseDetailsAPI";
import CourseTable from "./InstructorCourses/CourseInsTable";
import { TiFolderDelete } from "react-icons/ti";
import ConfirmationModal from "../../comman/ConfirmationModal";

const MyCourses = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [courses, setCourses] = useState([]);
    const { token } = useSelector((state) => state.auth);
    const [confirmationModal, setConfirmationModal] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchCousres = async () => {
            const result = await fetchInstructorCourses(token, dispatch, navigate);
            console.log("result", result)
            if (result) {
                setCourses(result);
            }
        }
        fetchCousres();
    }, [])

    const deleteAllInsCourses = async() =>{
        setLoading(true);
        await deleteAllInstructorCourses(token);
        const result = await fetchInstructorCourses(token, dispatch, navigate);
        if(result){
            setCourses(result);
        }
        setConfirmationModal(null);
        setLoading(false);
    }
    return (
        <div className="w-11/12 max-w-[1000px] mx-auto py-10 mt-2 mb-4 flex flex-col">
            <div className="flex justify-between py-2 px-3 mx-auto w-full">
                <h1 className="font-semibold text-3xl text-richblack-5">My Courses </h1>
                {/* add icon btn */}
                <IconBtn
                    text="Add Course"
                    onClick={() => navigate("/dashboard/add-course")}
                    customClasses="font-bold text-lg"
                >
                    <AiOutlineFileAdd fontSize={24} />
                </IconBtn>
            </div>
            <div className="w-full">
                {/* to display the course table */}
                {
                    courses && <CourseTable courses={courses} setCourses={setCourses}/>
                }
            </div>
            <div className="flex flex-row ml-auto mt-4 mr-2">
                {
                    courses?.length !== 0 && (
                        <div className="text-white">
                            <IconBtn 
                                text="Delete All Courses"
                                customClasses="font-bold text-lg italic"
                                disabled={loading}
                                onClick={() =>{
                                    setConfirmationModal({
                                        text1: "ARE YOU SURE U WANT TO DELETE ALL COURSES?",
                                        text2: "All of your Courses will be deleteled permantly",
                                        btn1Text: "Delete",
                                        btn2Text: "Cancel",
                                        btn1Handler: !loading ? (
                                            () => deleteAllInsCourses()
                                        ) : (
                                            {}
                                        ),
                                        btn2Handler:() => setConfirmationModal(null)
                                    })
                                }}
                            >
                                <TiFolderDelete size={24}/>
                            </IconBtn>
                        </div>
                    )
                }
            </div>
            {
                confirmationModal && <ConfirmationModal modalData={confirmationModal} />
            }
        </div>
    )
}

export default MyCourses; 