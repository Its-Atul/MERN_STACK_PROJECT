import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { MdClose } from "react-icons/md";

const TagInput = ({
    // props 
    label, name, placeholder, register, errors, setvalue
}) => {

    const { editCourse, course } = useSelector((state) => state.course);
    // JO uper yellow color me dikhega
    const [chips, setChips] = useState([]);

    useEffect(() => {
        if (editCourse) {
            console.log("course", course);
            setChips(course?.tag)
        }
        register(name, { required: true, validate: (value) => value.length > 0 });
    }, []);

    useEffect(() => {
        setvalue(name, chips)
    }, [chips]);

    // function to handle the input of tags
    const handleKeyDown = (e) =>{
        // check which is is pressed
        if(e.key === "Enter" || e.key === ","){
            e.preventDefault();
            // get the input an place it in the chips
            const chipValue = e.target.value.trim()
            // check if the chip already present
            if(chipValue && !chips.includes(chipValue)){
                const newChips = [...chips, chipValue]
                setChips(newChips);
                e.target.value = ""
            }
        }
    }

    // /to remove the tag 
    const handleDeleteChip = (tagIndex) => {
        const newChip = chips.filter((_, index) => index !== tagIndex);
        setChips(newChip);
    }

    return (
        <div className="flex flex-col space-y-2">
            <label htmlFor={name} className="text-richblack-5">{label}<sup className="text-pink-200">*</sup></label>
            {/* issme chips and input dono aalege */}
            <div className="flex flex-wrap w-full gap-x-2">
                {
                    chips.map((chip, index) => (
                        <div key={index} className="mt-1 mb-1 flex items-center rounded-full bg-yellow-300 px-2 py-1 text-sm text-richblack-5">
                            {/* value of tag */}
                            {chip}
                            {/* aak button aayega jo remove kar raha hoga us tag ko */}
                            <button type="button" onClick={() => handleDeleteChip(index)} className="ml-2">
                                <MdClose className="text-sm" />
                            </button>
                        </div>
                    ))
                }
                {/* input of tags */}
                <input
                    type="text"
                    id={name}
                    name={name}
                    placeholder={placeholder}
                    onKeyDown={handleKeyDown}
                    className="bg-richblack-600 rounded-xl text-richblack-5 p-3 border-richblack-300 border-b-[1px] w-full"
                />
                {
                    errors[name] && (
                        <span className="ml-2 text-xs tracking-wide text-pink-200">
                            {label} is required
                        </span>
                    )
                }
            </div>
        </div>
    )
}

export default TagInput;