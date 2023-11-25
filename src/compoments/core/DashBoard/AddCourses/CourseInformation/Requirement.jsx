import React, { useEffect, useState } from "react";
import {RxCross2} from "react-icons/rx";
import { useSelector } from "react-redux";

const Requirement = ({ name, label, register, setValue, errors, getValues }) => {

    const {editCourse, course} = useSelector((state) =>state.course);
    const [requirement, setRequirement] = useState("");
    const [requirementList, setRequirementList] = useState([]);

    const addHandler = () => {
        if (requirement) {
            setRequirementList([...requirementList, requirement]);
            setRequirement("");
        }
    }
    const removeHandler = (index) => {
        const updatedRequirementList = [...requirementList ];
        updatedRequirementList.splice(index, 1);
        setRequirementList(updatedRequirementList);
    }
    useEffect( () =>{
        if(editCourse){
            setRequirementList(course?.instructions)
        }
        register(name, {
            required:true,
            validate: (value) => value.length > 0
        })
    }, []);

    useEffect( () =>{
        setValue(name, requirementList)
    },[requirementList, setValue])

    return (
        <div className="flex flex-col space-y-2 ">
            <label htmlFor={name} className="text-richblack-5">{label}<sup className="text-pink-200">*</sup></label>
            <div className="flex flex-col items-start space-y-2 w-full">
            <input
                type="text"
                name={name}
                value={requirement}
                placeholder="Enter the Requirements"
                onChange={(e) => setRequirement(e.target.value)}
                className="w-full bg-richblack-600 rounded-xl text-richblack-5 p-3 border-richblack-300 border-b-[1px]"
            />
            <button type="button" onClick={addHandler} className=" ml-1 text-semibold text-yellow-25">Add</button>
            </div>
            {
                requirementList.length > 0 && (
                    <ul className="mt-2 list-inside list-disc">
                        {requirementList.map((item , index) =>  {
                            return(
                                <li key={index} className="flex items-center text-richblack-5">
                                    <span>{item}</span>
                                    <button
                                    type="button"
                                    className="ml-2 text-xs text-pure-greys-200 flex gap-x-1 items-center"
                                    onClick={() => removeHandler(index)}
                                    >
                                        Clear
                                        <RxCross2 className="text-xs"/>
                                    </button>
                                </li>
                            )
                        })}
                    </ul>
                )
            }
            {
                errors[name] && (
                    <span className="ml-2 text-xs tracking-wide text-pink-200">
                        {label} is required
                    </span>
                )
            }
        </div>
    );
}

export default Requirement;