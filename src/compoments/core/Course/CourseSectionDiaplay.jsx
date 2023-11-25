import React, { useEffect, useRef, useState } from 'react'
import { AiOutlineDown } from 'react-icons/ai'
import { CourseSubSectionPart } from './CourseSubSectionPart'

export const CourseSectionDiaplay = ({ sec, isActive, handleIsActive }) => {

    // use ref hook 
    const openSection = useRef();

    // state of open or close
    const [active, setActive] = useState(false);
    useEffect(() => {
        setActive(isActive?.includes(sec._id))
    }, [isActive])
    const [sectionHeight, setSectionHeight] = useState(0)
    useEffect(() => {
        setSectionHeight(active ? openSection.current.scrollHeight : 0)
    }, [active])
    return (
        <div className='overflow-hidden border border-solid border-richblack-600 bg-richblack-700 text-richblack-5'>
            <div className='flex cursor-pointer items-start justify-between bg-opacity-20 px-7  py-6 transition-[0.3s]' onClick={() => { handleIsActive(sec._id) }}>
                <div className='flex items-center gap-2'>
                    <i className={isActive.includes(sec._id) ? "rotate-180" : "rotate-0"}>
                        <AiOutlineDown />
                    </i>
                    <p>
                        {sec?.sectionName}
                    </p>
                </div>
                <div className='space-x-4'>
                    <span className=' text-yellow-25'>
                        {`${sec.subSection.length || 0} lecture(s)`}
                    </span>
                </div>
            </div>
            <div
                ref={openSection}
                className='relative h-0 overflow-hidden bg-richblack-900 transition-[height] duration-500 ease-in-out'
                style={{
                    height: sectionHeight,
                }}
            >
                <div className='text-textHead flex flex-col gap-2 px-7 py-6 font-semibold'>
                    {
                        sec?.subSection?.map((subSec, i) => {
                            return (
                                <CourseSubSectionPart subSec={subSec} />
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}
