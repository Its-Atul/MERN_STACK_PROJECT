import React, { useState } from "react";
import { useForm } from "react-hook-form";
import IconBtn from "../../../../comman/iconBtn";
import { MdAddCircleOutline, MdNavigateBefore, MdNavigateNext } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import NestedView from "./NestedView";
import { setCourse, setEditCourse, setStep } from "../../../../../slices/courseSlice";
import { toast } from "react-hot-toast";
import { createSection, updateSection } from "../../../../../services/operations/courseDetailsAPI";

const CourseBuilderForm = () => {
    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors }
    } = useForm();

    // edit section name
    const [editSectionName, setEditSectionName] = useState(null);
    const { course } = useSelector((state) => state.course);
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const { token } = useSelector((state) => state.auth);

    // on submit
    const submitHandler = async (data) => {
        setLoading(false);
        let result;
        console.log("The data of the Form", data);
        const CourseId = course._id;
        console.log("the course Id will be", CourseId);
        if (editSectionName) {
            // we are Editing the section name
            result = await updateSection(
                {
                    sectionName: data.sectionName,
                    sectionId: editSectionName,
                    courseId: CourseId,
                }, token
            )
        } else {
            // we are creating the section
            result = await createSection({
                sectionName: data.sectionName,
                courseId: CourseId,
            }, token)
        }

        // update the values
        if (result) {
            console.log("The Updated course will be", result)
            dispatch(setCourse(result));
            setEditSectionName(null);
            setValue("sectionName", "")
        }
        setLoading(false);
    }
    // cancel edit function
    const cancelEditSection = () => {
        setEditSectionName(null);
        setValue("sectionName", "")
    }
    // Go Back to course Information form
    const goBack = () => {
        dispatch(setStep(1));
        dispatch(setEditCourse(true));
    }

    // go on Next Page
    const goToNext = () => {
        // atleast aak section created hona chahiy
        if (course?.courseContent?.length === 0) {
            toast.error("Please Atleat one Section");
            return;
        }
        if (course.courseContent.some((section) => section.subSection.length === 0)) {
            toast.error("Please Add one Lecture atleast");
            return;
        }

        // i every thing is good
        dispatch(setStep(3));
    }

    const handleChangeEditSectionName = (sectionId, sectionName) => {
        if (editSectionName === sectionId) {
            cancelEditSection();
            return;
        }
        setEditSectionName(sectionId);
        setValue("sectionName", sectionName);
    }
    return (
        <div className="space-y-8 rounded-lg border-2 border-richblack-600 bg-richblack-800 p-6">
            <h2 className="text-xl font-semibold text-white">COURSE BUILDER</h2>
            <form onSubmit={handleSubmit(submitHandler)}>
                <div className="flex flex-col space-y-2">
                    <label htmlFor="sectionName" className="text-richblack-5">Section Name<sup className="text-pink-200">*</sup></label>
                    <input
                        type="text"
                        id="sectionName"
                        name="sectionName"
                        placeholder="Add Section Name"
                        {...register("sectionName", { required: true })}
                        className="bg-richblack-600 rounded-xl text-richblack-5 p-3 border-richblack-300 border-b-[1px] w-full"
                    />
                    {
                        errors.sectionName && (
                            <span className="ml-2 text-xs tracking-wide text-pink-200">
                                Section Name is Required
                            </span>
                        )
                    }
                </div>
                {/* add section button */}
                <div className="flex w-full gap-x-3 items-baseline">
                    <IconBtn
                        type="submit"
                        text={editSectionName ? "Edit Section Name" : "Create Section"}
                        outline={true}
                        customClasses={"mt-4"}
                    >
                        <MdAddCircleOutline className="text-yellow-25" size={20} />
                    </IconBtn>
                    {
                        editSectionName && (
                            <button
                                type="button"
                                onClick={cancelEditSection}
                                className="text-sm text-pure-greys-300 underline"
                            >
                                Cancel Edit
                            </button>
                        )
                    }
                </div>
            </form>

            {/* create the nested view */}
            <div>
                {
                    course?.courseContent?.length > 0 && (
                        <NestedView handleChangeEditSectionName={handleChangeEditSectionName} />
                    )
                }
            </div>
            <div className="flex justify-end gap-x-3 mt-10">
                <button onClick={goBack} className="flex flex-row items-center gap-x-2 rounded-md py-2 px-5 border-richblack-200 border-b-[1px] text-pure-greys-100 bg-richblack-700">
                    <MdNavigateBefore />
                    Back
                </button>
                <IconBtn
                    text="Next"
                    onClick={goToNext}
                >
                    <MdNavigateNext />
                </IconBtn>
            </div>
        </div>
    )
}

export default CourseBuilderForm;