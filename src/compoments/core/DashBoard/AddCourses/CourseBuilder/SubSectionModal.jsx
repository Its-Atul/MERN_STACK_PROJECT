import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { createSubSection, updateSubSection } from "../../../../../services/operations/courseDetailsAPI";
import { setCourse } from "../../../../../slices/courseSlice";
import { RxCross2 } from "react-icons/rx";
import Upload from "../CourseInformation/Upload";
import IconBtn from "../../../../comman/iconBtn";

const SubSectionModal = ({
    modalData,
    setModalData,
    add = false,
    view = false,
    edit = false,
}) => {

    // use Hook form
    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
        getValues
    } = useForm();

    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const { token } = useSelector((state) => state.auth);
    const { course } = useSelector((state) => state.course);
    // Time Duration Input open odr not --- > flag
    const [timedurationOpen, setTimeduartionOpen] = useState(null);
    

    useEffect(() => {
        if (view || edit) {
            setValue("lectureTitle", modalData.title);
            setValue("lectureDesc", modalData.description);
            setValue("lectureVideo", modalData.videoUrl);
            setValue("timeDuration", modalData.timeDuration);
        }
        console.log("The modal data for view and edit subSection", modalData);
    }, []);

    // is Form Updated
    const isFormUpdated = () => {
        const currentValues = getValues();
        if (
            currentValues.lectureTitle !== modalData.title ||
            currentValues.lectureDesc !== modalData.description ||
            currentValues.lectureVideo !== modalData.videoUrl
        ) {
            return true;
        } else {
            return false;
        }
    }

    // edit form handle function
    const handleEditSubSection = async () => {
        const currentValues = getValues();
        console.log("changes after editing form values:", currentValues)
        const formData = new FormData();
        console.log("Values After Editing form values:", currentValues)
        formData.append("sectionId", modalData.sectionId);
        formData.append("subSectionId", modalData._id);

        if (currentValues.lectureTitle !== modalData.title) {
            formData.append("title", currentValues.lectureTitle);
        }

        if (currentValues.lectureDesc !== modalData.description) {
            formData.append("description", currentValues.lectureDesc);
        }
        if (currentValues.lectureVideo !== modalData.videoUrl) {
            formData.append("videoFile", currentValues.lectureVideo);
        }
        if(currentValues.timeDuration !== modalData.timeDuration){
            formData.append("timeDuration", currentValues.timeDuration)
        }
        setLoading(true);
        console.log("The video url will be ", modalData.videoUrl);
        const result = await updateSubSection(formData, token);
        console.log("The updated SubSection", result);
        if (result) {
            // as the api will return the updated Section and we need to dispatch the setCourse
            const updatedCourseContent = course.courseContent.map((section) => section._id === modalData.sectionId ? result : section)
            const updatedCourse = { ...course, courseContent: updatedCourseContent }
            dispatch(setCourse(updatedCourse))
        }
        setModalData(null);
        setLoading(false);
    }

    // submit Handler for the FORM
    const submitHandler = async (data) => {
        console.log("The timeDuration ", timedurationOpen);
        // LOG THE DATA fo the Form subSection
        console.log("Subsection Form DATA", data);
        // Only View
        if (view) {
            return;
        }

        // Edit the Lecture
        if (edit) {
            if (!isFormUpdated) {
                toast.error("You didn't change anything");
            } else {
                // Edit kar do
                handleEditSubSection();
            }
            return;
        }

        // Create kar rahe ho Lecture
        const formData = new FormData()
        formData.append("sectionId", modalData)
        formData.append("title", data.lectureTitle)
        formData.append("description", data.lectureDesc)
        formData.append("videoFile", data.lectureVideo)
        formData.append("timeDuration", data?.timeDuration)

        console.log("Form data of subSection creation", ...formData);
        setLoading(true);

        // printing the section id 
        console.log("The section Id is", modalData);
        // Add subSection Api Call
        const result = await createSubSection(formData, token);
        if (result) {
            // as the api will return the updated Section and we need to dispatch the setCourse
            const updatedSection = course.courseContent.map((section) => section._id === modalData ? result : section)

            const updatedCourse = { ...course, courseContent: updatedSection }
            dispatch(setCourse(updatedCourse))
        }
        setModalData(null)
        setLoading(false);
    }
    return (
        <div className="fixed inset-0 z-30 !mt-0 grid h-screen w-screen place-items-center overflow-auto bg-white bg-opacity-10 backdrop-blur-sm">
            <div className="my-10 w-11/12 max-w-[700px] rounded-xl border-2 border-dashed border-richblack-300 bg-richblack-800">
                {/* Modal Header */}
                <div className="flex items-center justify-between rounded-t-xl bg-richblack-600 p-5">
                    <h2 className="text-xl font-semibold text-richblack-5">
                        {
                            view && "Viewing"
                        }
                        {
                            add && "Adding"
                        }
                        {
                            edit && "Editing"
                        } Lecture
                    </h2>
                    <button onClick={() => (!loading ? setModalData(null) : {})}>
                        <RxCross2 className="text-2xl text-richblack-5" />
                    </button>
                </div>
                {/* Form Section */}
                <form onSubmit={handleSubmit(submitHandler)} className="space-y-8 px-8 py-10">
                    <Upload
                        name="lectureVideo"
                        label="Lecture Video"
                        register={register}
                        setValue={setValue}
                        setTimedurationOpen={setTimeduartionOpen}
                        errors={errors}
                        video={true}
                        modalDataTime={modalData.timeDuration}
                        viewData={view ? modalData.videoUrl : null}
                        editData={edit ? modalData.videoUrl : null}
                    />
                    {
                        timedurationOpen ? (
                            <div className="flex flex-col space-y-2">
                                <label htmlFor="timeDuration" className="text-richblack-5">Lecture Duration<sup className=" text-pink-200">*</sup></label>
                                <input
                                    type="text"
                                    name="timeDuration"
                                    id="timeDuration"
                                    placeholder="Enter the video Duration"
                                    className="bg-richblack-600 rounded-xl text-richblack-5 p-3 border-richblack-300 border-b-[1px] w-full"
                                    {...register("timeDuration", { required: true })}
                                    onClick={() => alert("The total Video Time should be in secs")}
                                />
                                {
                                    errors.timeDuration && (
                                        <span className="ml-2 text-xs tracking-wide text-pink-200">
                                            Time Duration is Required
                                        </span>
                                    )
                                }
                            </div>
                        ) : (
                            <div></div>
                        )
                    }
                    <div className="flex flex-col space-y-2">
                        <label htmlFor="lectureTitle" className="text-richblack-5">Lecture Title<sup className="text-pink-200">*</sup></label>
                        <input
                            type="text"
                            name="lectureTitle"
                            id="lectureTitle"
                            placeholder="Enter Lecture Name"
                            {...register("lectureTitle", { required: true })}
                            className="bg-richblack-600 rounded-xl text-richblack-5 p-3 border-richblack-300 border-b-[1px] w-full"
                        />
                        {
                            errors.lectureTitle && (
                                <span className="ml-2 text-xs tracking-wide text-pink-200">
                                    Lecture Name is Required
                                </span>
                            )
                        }
                    </div>
                    <div className="flex flex-col space-y-2">
                        <label htmlFor="lectureDesc" className="text-richblack-5">Lecture Description<sup className="text-pink-200">*</sup></label>
                        <textarea
                            name="lectureDesc"
                            id="lectureDesc"
                            placeholder="Enter Lecture Description"
                            {...register("lectureDesc", { required: true })}
                            className="min-h-[130px] w-full bg-richblack-600 rounded-xl text-richblack-5 p-3 border-richblack-300 border-b-[1px]"
                        />
                        {
                            errors.lectureDesc && (
                                <span className="ml-2 text-xs tracking-wide text-pink-200">
                                    Lecture Description is Required
                                </span>
                            )
                        }
                    </div>
                    {/* different Button */}
                    {
                        !view && (
                            <div className="flex justify-end">
                                <IconBtn
                                    disabled={loading}
                                    text={loading ? "Loading..." : edit ? "Save Changes" : "Save"}
                                />
                            </div>
                        )
                    }
                </form>
            </div>
        </div>
    );
}

export default SubSectionModal;