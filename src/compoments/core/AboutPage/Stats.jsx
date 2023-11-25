import React from "react";

const StatsData = [
    {count: "5K", label:"Active Student"},
    {count: "10+", label:"Mentors"},
    {count: "200+", label:"Courses"},
    {count: "50+", label:"Awards"},
]
const Stats = () =>{
    return(
        <div className="mx-auto flex flex-col w-11/12 max-w-maxContent justify-between gap-10 text-richblack-500">
            <div className="grid md:grid-cols-4 grid-cols-2 text-center">
                {
                    StatsData.map((data, index) =>{
                        return(
                            <div key={index} className="flex flex-col py-10 items-center justify-between">
                                <h2 className=" text-3xl font-bold text-richblack-5">{data.count}</h2>
                                <p className=" text-lg text-richblack-300 font-semibold">{data.label}</p>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    );
};

export default Stats;