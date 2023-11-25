import React from "react";
import IconBtn from "./iconBtn";

const ConfirmationModal = ({modalData}) =>{
    return(
        <div className="fixed inset-0 z-50 !mt-0 flex justify-center items-center overflow-auto bg-white bg-opacity-10 backdrop-blur-sm">
            <div className="w-10/12 max-w-[350px] rounded-lg border-2 border-richblack-300 bg-richblack-800 px-6 py-8 flex justify-center items-center flex-col">
                <p className="text-2xl font-semibold text-richblack-5">
                    {modalData.text1}
                </p>
                <p className="mt-2 mb-5 leading-6 text-richblack-400">
                    {modalData.text2}
                </p>
                <div className="flex items-center gap-x-4">
                    <IconBtn 
                    onClick={modalData?.btn1Handler}
                    text={modalData?.btn1Text}
                    />
                    <button onClick={modalData?.btn2Handler} className=" cursor-pointer rounded-md bg-richblack-200 py-[8px] px-[20px] font-semibold text-caribbeangreen-900">
                        {modalData?.btn2Text}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ConfirmationModal;