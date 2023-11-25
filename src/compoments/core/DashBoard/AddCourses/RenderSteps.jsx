import React from "react";
import { FaCheck } from "react-icons/fa";
import { useSelector } from "react-redux";
import CourseInformationForm from "./CourseInformation/CourseInformationForm";
import CourseBuilderForm from "./CourseBuilder/CourseBuilderForm";
import PublishCourseForm from "./PublishCourse";

const RenderSteps = () => {

    const { step } = useSelector((state) => state.course);

    const steps = [
        {
            id: 1,
            title: "Course Information"
        },
        {
            id: 2,
            title: "Course Builder",
        },
        {
            id: 3,
            title: "Publish",
        },
    ]
    return (
        <div className="flex-1">
            <div className="mb-2 flex w-full justify-center">
                {
                    steps.map((items) => (
                        <>
                            <div className="flex flex-col items-center" key={items.id}>
                                <button className={`${step === items.id ? "bg-yellow-600 border-yellow-25 text-yellow-5" : " text-richblack-200 bg-richblack-800 border-richblack-700"} flex justify-center items-center aspect-square rounded-full border-[1px] w-[34px] ${step > items.id && " bg-yellow-50"}`}>
                                    {
                                        step > items.id ? (
                                            <FaCheck className="font-bold text-richblack-900" />
                                        ) : (
                                            items.id
                                        )
                                    }
                                </button>
                            </div>
                            {
                                items.id !== steps.length && (
                                    <>
                                        <div className={`h-[calc(34px/2)] w-[33%] border-dashed border-b-2 ${step > items.id ? "border-yellow-50" : "border-richblack-500"}`}>
                                        </div>
                                    </>

                                )
                            }
                        </>
                    ))
                }
            </div>
            {/* write the title */}
            <div className=" relative mb-16 flex w-full select-none justify-between">
                {
                    steps.map((item) => (
                        <div className="flex min-w-[130px] flex-col items-center gap-y-2" key={item.id}>
                            <p className={` text-sm ${step >= item.id ? "text-richblack-5" : "text-richblack-300"}`}>
                                {item.title}
                            </p>
                        </div>
                    ))
                }
            </div>
            {/* now form creation */}
            {
                step === 1 && <CourseInformationForm />
            }
            {
                step === 2 && <CourseBuilderForm />
            }
            {
                step === 3 && <PublishCourseForm />
            }
        </div>
    );
}

export default RenderSteps;