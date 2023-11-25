import React from "react";
import { FiTrash } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deleteProfile } from "../../../../services/operations/settingsAPI";

const DeleteAccount = () =>{
    const { token } = useSelector((state) => state.auth);
    const navigate = useNavigate();
    const dispatch = useDispatch();
            
    const handleDeleteAccount = async() =>{
        try {
            dispatch(deleteProfile(token, navigate));
        } catch (error) {
            console.error("Error in deleting Account", error);
        }
    }
    return(
        <div className="flex gap-x-5 rounded-lg my-10 border-2 border-pink-500 bg-pink-700 p-8 px-12 font-inter">
            <div className="flex aspect-square h-16 w-16 items-center justify-center rounded-full bg-pink-400">
                <FiTrash className="text-3xl text-black"/>
            </div>
            <div className="flex flex-col gap-y-2">
                <h2 className="text-xl font-semibold text-richblack-5 mb-1">Delete Account</h2>
                <div className="w-3/5">
                    <p className="text-lg font-medium text-richblack-25">Would you like to delete account?</p>
                    <p className="text-richblack-50">This account may contain Paid Courses. Deleting your account is permanent and will remove all the contain associated with it.</p>
                </div>
                <button type="button" className=" italic w-fit cursor-pointer text-pink-100" onClick={handleDeleteAccount}>
                    I want to delete my Account
                </button>
            </div>
        </div>
    );
}

export default DeleteAccount;