import React, { useState } from "react";
import { MdDelete, MdEdit } from "react-icons/md";
import { RxDropdownMenu } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import ConfirmationModal from "../../../../comman/ConfirmationModal";
import { BsFillArrowDownCircleFill } from "react-icons/bs";
import { AiOutlinePlus } from "react-icons/ai";
import SubSectionModal from "./SubSectionModal";
import { deleteSection, deleteSubSection } from "../../../../../services/operations/courseDetailsAPI";
import { setCourse } from "../../../../../slices/courseSlice";

const NestedView = ({ handleChangeEditSectionName }) => {
    const { course } = useSelector((state) => state.course);
    const { token } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    // FLAGS
    const [addSubSection, setAddSubSection] = useState(null);
    const [editSubSection, setEditSubSection] = useState(null);
    const [viewSubSection, setViewSubSection] = useState(null);
    const [confirmationModal, setConfirmationModal] = useState(null);

    // handle for section
    const handleDeleteSection = async (sectionId) => {
        const result = await deleteSection({
            sectionId,
            courseId: course._id,
            token
        })

        if (result) {
            dispatch(setCourse(result));
        }
        setConfirmationModal(null);
    }

    // TO delete a subSection
    const handleDeleteSubSection = async (subSectionId, sectionId) => {
        const result = await deleteSubSection(
            {
                subSectionId, sectionId, token
            }
        );

        if (result) {
            // karana hai isko
            const updatedCourseContent = course.courseContent.map((section) => section._id === sectionId ? result : section)

            const updatedCourse = { ...course, courseContent: updatedCourseContent }
            dispatch(setCourse(updatedCourse));
        }
        setConfirmationModal(null);
    }
    return (
        <div>
            <div className="rounded-lg bg-richblack-700 p-6 px-8">
                {course?.courseContent?.map((section) => (
                    <details key={section._id} open>
                        <summary className='flex cursor-pointer items-center justify-between border-b-2 border-b-richblack-500 py-2'>
                            <div className='flex items-center gap-x-3'>
                                <RxDropdownMenu className="text-richblack-50 text-2xl" />
                                <p className="font-semibold text-richblack-50">
                                    {section.sectionName}
                                </p>
                            </div>
                            <div className="flex items-center gap-x-3">
                                <button onClick={() => handleChangeEditSectionName(section._id, section.sectionName)}>
                                    <MdEdit className="text-xl text-richblack-300" />
                                </button>
                                <button onClick={() => {
                                    setConfirmationModal({
                                        text1: "Delete this Section?",
                                        text2: "All the lectures in this section will be deleted",
                                        btn1Text: "Delete",
                                        btn2Text: "Cancel",
                                        btn1Handler: () => handleDeleteSection(section._id),
                                        btn2Handler: () => setConfirmationModal(null)
                                    })
                                }}>
                                    <MdDelete className="text-xl text-richblack-300" />
                                </button>
                                <span className="font-medium text-richblack-300">|</span>
                                <BsFillArrowDownCircleFill className="text-xl text-richblack-300" />
                            </div>
                        </summary>
                        <div className="px-6 pb-4">
                            {
                                section.subSection.map((data) => (
                                    <div key={data?._id}
                                        onClick={() => setViewSubSection(data)}
                                        className="flex cursor-pointer items-center justify-between gap-x-3 border-b-2 border-b-richblack-500 py-2"
                                    >
                                        <div className="flex items-center gap-x-3">
                                            <RxDropdownMenu className="text-2xl text-richblack-50" />
                                            <p className="font-semibold text-richblack-50">
                                                {data.title}
                                            </p>
                                        </div>
                                        <div className="flex items-center gap-x-3"
                                            onClick={(e) => e.stopPropagation()}
                                        >
                                            <button onClick={() => setEditSubSection({ ...data, sectionId: section._id })}>
                                                <MdEdit className="text-xl text-richblack-300" />
                                            </button>
                                            <button onClick={() => {
                                                setConfirmationModal({
                                                    text1: "Delete this Lecture?",
                                                    text2: "The lectures will be deleted",
                                                    btn1Text: "Delete",
                                                    btn2Text: "Cancel",
                                                    btn1Handler: () => handleDeleteSubSection(data._id, section._id),
                                                    btn2Handler: () => setConfirmationModal(null)
                                                })
                                            }}>
                                                <MdDelete className="text-xl text-richblack-300" />
                                            </button>
                                        </div>
                                    </div>
                                ))
                            }
                            <button
                                onClick={() => setAddSubSection(section._id)}
                                className="mt-3 flex items-center gap-x-2 text-yellow-25"
                            >
                                <AiOutlinePlus className="text-lg" />
                                Add Lecture
                            </button>
                        </div>
                    </details>
                ))}
            </div>
            {/* Konsa subSection Ka modal render hoga vo check karene ke liye  */}
            {
                addSubSection ? (
                    <SubSectionModal
                        modalData={addSubSection}
                        setModalData={setAddSubSection}
                        add={true}
                    />
                ) : viewSubSection ? (
                    <SubSectionModal
                        modalData={viewSubSection}
                        setModalData={setViewSubSection}
                        view={true}
                    />
                ) : editSubSection ? (
                    <SubSectionModal
                        modalData={editSubSection}
                        setModalData={setEditSubSection}
                        edit={true}
                    />
                ) : (
                    <div></div>
                )
            }

            {/* for delete confirmation modal */}
            {confirmationModal ? (
                <ConfirmationModal modalData={confirmationModal} />
            ) : (
                <div></div>
            )
            }
        </div>
    );
}

export default NestedView;