import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import IconBtn from "../../../comman/iconBtn";
import { FiUpload } from "react-icons/fi";
import { updateDisplayPicture } from "../../../../services/operations/settingsAPI";
import { useNavigate } from "react-router-dom";

const ChangeProfilePicture = () =>{
    const { user } = useSelector((state) =>state.profile);
    const { token } = useSelector((state) =>state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const fileInputRef = useRef(null);
    // state variable for loading
    const [loading, setLoading] = useState(false);
    const [imageFile, setImageFile] = useState(null);
    const [previewSource, setPreviewSource] = useState(null);

    
    // for select
    const handleSelectClick =() =>{
        fileInputRef.current.click();
    };

    // to handle change in the input of file 
    const handleFileChange = (e) =>{
        const file = e.target.files[0];
        console.log("printing the file ", file);
        if(file){
            setImageFile(file);
            previewFile(file);
        }
    };

    const previewFile = (file) =>{
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            setPreviewSource(reader.result);
        }
        console.log("Reader", reader);
    }
    // to upload 
    const handleFileUpload = () =>{
        try {
            console.log("uploading....");
            setLoading(true);
            console.log("image file", imageFile);
            const dataimage = {
                key:"displayPicture",
                value:imageFile
            }
            console.log("the key value pair of data image", dataimage);
            let formData = new FormData();
            console.log("formData before", formData);
            formData.append("displayPicture", imageFile);
            console.log("printing the formData", formData);
            dispatch(updateDisplayPicture(token, formData, navigate)).then(() =>{
                setLoading(false);
            })

        } catch (error) {
            console.error("Error in uploading", error);
        }
    }
    
    useEffect( () =>{
        if(imageFile){
            previewFile(imageFile);
        }
    }, [imageFile]);
    return(
        <div className="flex items-center justify-between rounded-lg border-2 border-richblack-600 bg-richblack-800 p-8 px-12 text-richblack-5">
            <div className="flex items-center gap-x-4">
                <img src={previewSource || user?.image} alt={`profile- ${user?.firstName}`} className=" aspect-square rounded-full w-[75px] object-cover"/>
                <div className="space-y-2">
                    <p className="text-lg font-semibold">Change Profile Picture</p>
                    <div className="flex flex-row gap-2">
                        <input 
                        type="file"
                        className="hidden"
                        onChange={handleFileChange}
                        ref={fileInputRef}
                        accept="image/png, image/gif, image/webp, image/jpeg"
                        />
                        <button 
                        onClick={handleSelectClick}
                        disabled={loading}
                        className="cursor-pointer rounded-md bg-richblack-700 py-2 px-5 font-semibold text-richblack-25"
                        >
                            Select
                        </button>
                        <IconBtn
                        text={loading ? "Uploading..." : "Upload"}
                        onClick={handleFileUpload}
                        >
                            {
                                !loading && (
                                    <FiUpload className="text-lg text-richblue-900" />
                                )
                            }
                        </IconBtn>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default ChangeProfilePicture;