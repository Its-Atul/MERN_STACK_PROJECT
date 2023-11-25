import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { MdNavigateBefore } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate} from "react-router-dom"
import IconBtn from "../../../../comman/iconBtn";
import { resetCourseState, setCourse, setStep } from "../../../../../slices/courseSlice";
import { COURSE_STATUS } from "../../../../../utils/constanst";
import { editCourseDetails } from "../../../../../services/operations/courseDetailsAPI";
const PublishCourseForm = () =>{

    const {
        register,
        handleSubmit,
        setValue,
        getValues,
        formState: {errors}
    } = useForm();

    const {course} = useSelector((state) => state.course);
    const dispatch = useDispatch();
    const navigate  = useNavigate();
    const {token} = useSelector((state) => state.auth);
    const [loading, setLoading] = useState(false);

    // ye public kab hoga 
    useEffect( () =>{
        if(course?.status === COURSE_STATUS.PUBLISHED){
            setValue("public", true);
        }
    },[])

    const goToCourses = () =>{
        dispatch(resetCourseState());
        localStorage.removeItem("course");
        navigate("/dashboard/my-courses");
    }
    const handleCoursePublish = async () =>{
        if((course?.status === COURSE_STATUS.PUBLISHED && getValues("public") === true) ||
            (course?.status === COURSE_STATUS.DRAFT && getValues("public") === false)
        ){
            // no updation in form
            // no need to make api call
            goToCourses();
            return ;
        }

        // if form DATA UPDATED
        const formData = new FormData();
        formData.append("courseId", course._id);
        const courseStatus = getValues("public") ? COURSE_STATUS.PUBLISHED : COURSE_STATUS.DRAFT;
        formData.append("status", courseStatus);

        // noew api call of edit course because course ko aab publich karna hai
        setLoading(true);
        const result = await editCourseDetails(formData, token);
        if(result){
            goToCourses();
        }
        
        setLoading(false);
    }

    const submitHandler = () =>{
        handleCoursePublish();
    }

    const goBack = () =>{
        dispatch(setStep(2));
    }

    return(
        <div className="rounded-md border-2 border-richblack-600 bg-richblack-800 p-6">
            <h2 className="text-xl font-semibold text-white">PUBLISH COURSE</h2>
            <form onSubmit={handleSubmit(submitHandler)}>
                <div className="my-6 mb-8">
                    <label htmlFor="public" className="inline-flex items-center text-lg"></label>
                    <input
                        type="checkbox"
                        id="public"
                        {...register("public")}
                        className="border-gray-300 h-4 w-4 rounded bg-richblack-500 text-richblack-400 focus:ring-2 focus:ring-richblack-5"
                    />
                    <span className="ml-2 text-richblack-200">
                        Make this Course Public
                    </span>
                </div>

                {/* next and save changes button */}
                <div className="ml-auto flex max-w-max items-center gap-x-4">
                    <button
                        disabled={loading}
                        type="button"
                        onClick={goBack}
                        className="flex flex-row items-center gap-x-2 rounded-md py-2 px-5 border-richblack-200 border-b-[1px] text-pure-greys-100 bg-richblack-700"
                    >
                        <MdNavigateBefore />
                        Back
                    </button>
                    <IconBtn disabled={loading} text="Save Changes"/>
                </div>
            </form>
        </div>
    );
}

export default PublishCourseForm;