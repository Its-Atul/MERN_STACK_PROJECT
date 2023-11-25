import React from "react";
import HighLightText from "../HomePage/HighLightText";
import CTAButton from "../HomePage/CTAButton";

const LearningGridArray = [
    {
        order: -1,
        heading: "World-Class Learning for",
        highlightText: "Anyone, Anywhere",
        description:
            "Studynotion partners with more than 275+ leading universities and companies to bring flexible, affordable, job-relevant online learning to individuals and organizations worldwide.",
        BtnText: "Learn More",
        BtnLink: "/",
    },
    {
        order: 1,
        heading: "Curriculum Based on Industry Needs",
        description:
            "Save time and money! The Belajar curriculum is made to be easier to understand and in line with industry needs.",
    },
    {
        order: 2,
        heading: "Our Learning Methods",
        description:
            "Studynotion partners with more than 275+ leading universities and companies to bring",
    },
    {
        order: 3,
        heading: "Certification",
        description:
            "Studynotion partners with more than 275+ leading universities and companies to bring",
    },
    {
        order: 4,
        heading: `Rating "Auto-grading"`,
        description:
            "Studynotion partners with more than 275+ leading universities and companies to bring",
    },
    {
        order: 5,
        heading: "Ready to Work",
        description:
            "Studynotion partners with more than 275+ leading universities and companies to bring",
    },
];

const LearningGrid = () => {
    return (
        <div className="grid mx-auto w-[350px] lg:w-fit grid-cols-1 lg:grid-cols-4 mb-12">
            {
                LearningGridArray.map((card, index) => {
                    return (
                        <div key={index} className={`${index === 0 && "lg:col-span-2 bg-transparent"} ${card.order % 2 === 0 && " bg-richblack-800"} 
                        ${card.order === 3 && "lg:col-start-2"} ${card.order === 1 && " bg-richblack-600"} ${card.order === 3 && " bg-richblack-600"} ${card.order === 5 && " bg-richblack-600"}
                        lg:h-[280px] p-5`}>
                            {
                                card.order < 0 ? (
                                    <div className=" lg:w-[90%] flex flex-col gap-3 pb-5">
                                        <h2 className="font-semibold text-4xl">
                                            World-Class Learning for
                                            <HighLightText text={card.highlightText} />
                                        </h2>
                                        <p className=" text-richblack-300 font-medium">{card.description}</p>
                                        <div className="mt-2 w-fit">
                                            <CTAButton active={true} linkto={card.BtnLink}>{card.BtnText}</CTAButton>
                                        </div>

                                    </div>
                                ) : (
                                    <div className="flex flex-col gap-8 p-5">
                                        <h2 className=" text-richblack-5 text-xl">{card.heading}</h2>
                                        <p className=" text-richblack-300 font-medium">
                                            {card.description}
                                        </p>
                                    </div>
                                )
                            }
                        </div>
                    )
                })
            }
        </div>
    );
}

export default LearningGrid;