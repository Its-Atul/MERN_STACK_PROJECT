
import React from 'react'
import { AiOutlineVideoCamera } from "react-icons/ai";

export const CourseSubSectionPart = ({ subSec }) => {
    return (
        <div>
            <div className='flex justify-between py-2'>
                <div className='flex items-center gap-2'>
                    <span>
                        <AiOutlineVideoCamera />
                    </span>
                    <p>
                        {subSec?.title}
                    </p>
                </div>
            </div>
        </div>
    )
}
