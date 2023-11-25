import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { addcourseDetails, editCourseDetails, fetchCourseCategories } from "../../../../../services/operations/courseDetailsAPI";
import { HiOutlineCurrencyRupee } from "react-icons/hi";
import TagInput from "./TagInput";
import Upload from "./Upload";
import Requirement from "./Requirement";
import { setCourse, setStep } from "../../../../../slices/courseSlice";
import IconBtn from "../../../../comman/iconBtn"
import { MdNavigateNext } from "react-icons/md";
import { toast } from "react-hot-toast";
import { COURSE_STATUS } from "../../../../../utils/constanst";
import { useNavigate } from "react-router-dom";
const CourseInformationForm = () => {

    const {
        register,
        handleSubmit,
        setValue,
        getValues,
        formState: { errors },
    } = useForm();

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { token } = useSelector((state) => state.auth);
    const { course, editCourse } = useSelector((state) => state.course);
    // for spinner
    const [loading, setLoading] = useState(false);
    // for category store
    const [courseCategories, setCourseCategories] = useState([]);
    const getCategories = async () => {
        setLoading(true);
        const categories = await fetchCourseCategories();
        if (categories.length > 0) {
            setCourseCategories(categories);
        }
        setLoading(false);
    }
    useEffect(() => {

        if (editCourse) {
            // console.log("COURSE: ",course)
            setValue("courseTitle", course.courseName);
            setValue("courseShortDesc", course.courseDescription)
            setValue("coursePrice", course.price)
            setValue("courseTags", course.tag)
            setValue("courseBenefits", course.whatYouWillLearn)
            setValue("courseCategory", course.category)
            setValue("courseRequirements", course.instructions)
            setValue("courseImage", course.thumbnail)

        }
        getCategories();
    }, [])

    // is formUpdated function
    const isFormUpdated = () => {
        const currentValues = getValues();
        if (currentValues.courseTitle !== course.courseName ||
            currentValues.courseShortDesc !== course.courseDescription ||
            currentValues.coursePrice !== course.price ||
            currentValues.courseTags.toString() !== course.tag.toString() ||
            currentValues.courseBenefits !== course.whatYouWillLearn ||
            currentValues.courseCategory._id !== course.category._id ||
            currentValues.courseImage !== course.thumbnail ||
            currentValues.courseRequirements.toString() !== course.instructions.toString()
        ) {
            return true;
        } else {
            return false;
        }
    }

    // handle the next button
    const submitHandler = async (data) => {
        console.log("The dat for course form", data);
        // Do cases ho sakte hai edit karne aaya hu ya new course so ye sab depend karega edit course pe
        if (editCourse) {
            // for edit course
            if (isFormUpdated()) {
                const currentValues = getValues();
                const formData = new FormData();

                formData.append("courseId", course._id);
                if (currentValues.courseTitle !== course.courseName) {
                    formData.append("courseName", data.courseTitle);
                }
                if (currentValues.courseShortDesc !== course.courseDescription) {
                    formData.append("courseDescription", data.courseShortDesc);
                }
                if (currentValues.coursePrice !== course.price) {
                    formData.append("price", data.coursePrice);
                }
                if (currentValues.courseTags.toString() !== course.tag.toString()) {
                    formData.append("tag", JSON.stringify(data.courseTags))
                }
                if (currentValues.courseBenefits !== course.whatYouWillLearn) {
                    formData.append("whatYouWillLearn", data.courseBenefits);
                }
                if (currentValues.courseCategory._id !== course.category._id) {
                    formData.append("category", data.courseCategory);
                }
                if (currentValues.courseImage !== course.thumbnail) {
                    formData.append("thumbnailImage", data.courseImage);
                }
                if (currentValues.courseRequirements.toString() !== course.instructions.toString()) {
                    formData.append("instructions", JSON.stringify(data.courseRequirements))
                }
                setLoading(true);
                const result = await editCourseDetails(formData, token, dispatch, navigate);
                setLoading(false);
                if(result){
                    dispatch(setStep(2));
                    dispatch(setCourse(result));
                }
            } else {
                toast.error("No Changes Made to course");
            }
            return;
        }

        // create new course
        const formData = new FormData();
        formData.append("courseName", data.courseTitle)
        formData.append("courseDescription", data.courseShortDesc)
        formData.append("price", data.coursePrice)
        // formData.append("tag", data.courseTags)
        formData.append("tag", JSON.stringify(data.courseTags))
        formData.append("whatYouWillLearn", data.courseBenefits)
        formData.append("category", data.courseCategory)
        formData.append("instructions", JSON.stringify(data.courseRequirements))
        formData.append("thumbnailImage", data.courseImage)
        formData.append("status", COURSE_STATUS.DRAFT)
        console.log("The from DATA is after append", formData);
        setLoading(true);
        const result = await addcourseDetails(token, formData, dispatch, navigate);
        if (result) {
            dispatch(setStep(2));
            dispatch(setCourse(result));
            console.log("The result Data for the call", result);
        }
        setLoading(false);
    }
    return (
        <form onSubmit={handleSubmit(submitHandler)} className="space-y-8 rounded-lg border-2 border-richblack-600 bg-richblack-800 p-6 text-richblack-5">
            {/* Course Title */}
            <div className="flex flex-col space-y-2">
                <label htmlFor="courseTitle" className="text-richblack-5">Course Title<sup className="text-pink-200">*</sup></label>
                <input
                    type="text"
                    id="courseTitle"
                    placeholder="Enter Course Title"
                    {...register("courseTitle", { required: true })}
                    className="bg-richblack-600 rounded-xl text-richblack-5 p-3 border-richblack-300 border-b-[1px] w-full"
                />
                {
                    errors.courseTitle && (
                        <span className="ml-2 text-xs tracking-wide text-pink-200">
                            Course title is Required
                        </span>
                    )
                }
            </div>
            <div className="flex flex-col space-y-2">
                <label htmlFor="courseShortDesc" className="text-richblack-5">Course Short Description<sup className="text-pink-200">*</sup></label>
                <textarea
                    name="courseShortDesc"
                    id="courseShortDesc"
                    cols="20"
                    rows="3"
                    placeholder="Enter Short Description"
                    {...register("courseShortDesc", { required: true })}
                    className="bg-richblack-600 rounded-xl text-richblack-5 p-3 border-richblack-300 border-b-[1px] w-full"
                />
                {
                    errors.courseShortDesc && (
                        <span className="ml-2 text-xs tracking-wide text-pink-200">
                            Course Short Description is Required
                        </span>
                    )
                }
            </div>
            <div className="flex flex-col space-y-2">
                <label htmlFor="coursePrice" className="text-richblack-5">Course Price<sup className="text-pink-200">*</sup></label>
                <div className="relative">
                    <input
                        id="coursePrice"
                        name="coursePrice"
                        placeholder="Enter Course Price"
                        {...register("coursePrice", {
                            required: true,
                            valueAsNumber: true,
                        })}
                        className="bg-richblack-600 rounded-xl text-richblack-5 p-3 border-richblack-300 border-b-[1px] w-full !pl-12"
                    />
                    <HiOutlineCurrencyRupee className="text-3xl text-richblack-200 inline-block absolute left-3 top-[10px]" />
                </div>
                {
                    errors.coursePrice && (
                        <span className="ml-2 text-xs tracking-wide text-pink-200">
                            Course Price is required
                        </span>
                    )
                }
            </div>
            {/* course Category */}
            <div className="flex flex-col space-y-2">
                <label htmlFor="courseCategory" className="text-richblack-5">Course Category<sup className="text-pink-200">*</sup></label>
                <select
                    name="courseCategory"
                    id="courseCategory"
                    className="bg-richblack-600 rounded-xl text-richblack-5 p-3 border-richblack-300 border-b-[1px] w-full"
                    defaultValue=""
                    {...register("courseCategory", { required: true })}
                >
                    <option value="" disabled>
                        Choose a Category
                    </option>
                    {
                        !loading && courseCategories.map((category, index) => (
                            <option key={index} value={category?._id}>
                                {category?.name}
                            </option>
                        ))
                    }
                </select>
                {
                    errors.courseCategory && (
                        <span className="ml-2 text-xs tracking-wide text-pink-200">
                            Course Category is required
                        </span>
                    )
                }
            </div>
            {/* tag => we need to make a custom component */}
            <TagInput
                name="courseTags"
                label="Tags"
                placeholder="Enter the Tag"
                register={register}
                errors={errors}
                setvalue={setValue}
            />
            {/* Upload thumbnail */}
            <Upload
                name="courseImage"
                label="Course Thumbnail"
                register={register}
                setValue={setValue}
                errors={errors}
                editData={editCourse ? course?.thumbnail : null}
            />
            {/* benifit of the course  */}
            <div className="flex flex-col space-y-2">
                <label htmlFor="courseBenefits" className="text-richblack-5">Benefits of Course<sup className="text-pink-200">*</sup></label>
                <textarea
                    name="courseBenefits"
                    id="courseBenefits"
                    placeholder="Enter Benefits of the Course"
                    {...register("courseBenefits", { required: true })}
                    className="min-h-[130px] w-full bg-richblack-600 rounded-xl text-richblack-5 p-3 border-richblack-300 border-b-[1px]"
                />{
                    errors.courseBenefits && (
                        <span className="ml-2 text-xs tracking-wide text-pink-200">
                            Course Benefits is required
                        </span>
                    )
                }
            </div>

            {/* Requirements/ instruction of the course */}
            <Requirement
                name="courseRequirements"
                label="Requirements/Instructions"
                register={register}
                setValue={setValue}
                errors={errors}
                getValues={getValues}
            />
            <div className="flex gap-x-2 justify-end">
                {
                    editCourse && (
                        <button
                            onClick={() => dispatch(setStep(2))}
                            disabled={loading}
                            className={`flex cursor-pointer items-center gap-x-2 rounded-md bg-richblack-300 py-[8px] px-[20px] font-semibold text-richblack-900`}
                        >
                            Continue Without Saving
                        </button>
                    )
                }
                <IconBtn
                    text={!editCourse ? "Next" : "Save Changes"}
                    disabled={loading}>
                    <MdNavigateNext />
                </IconBtn>
            </div>
        </form>
    );
}

export default CourseInformationForm;