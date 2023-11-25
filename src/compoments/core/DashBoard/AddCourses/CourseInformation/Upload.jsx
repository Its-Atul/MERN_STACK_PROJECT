import React, { useEffect, useRef, useState } from "react";
import { useDropzone } from "react-dropzone";
import { FiUploadCloud } from "react-icons/fi";
import ReactPlayer from 'react-player'
import "video-react/dist/video-react.css"

const Upload = ({
    name, label, register, setValue, errors, modalDataTime, setTimedurationOpen, video = false, viewData = null,
    editData = null
}) => {

    const [selectedFile, setSelectedFile] = useState(null);
    // const [linkvideo, setLinkVideo] = useState(null);
    // const [regTimeDura, setRegisterTimeDura] = useState(null);
    const [previewSource, setPreviewSource] = useState(
        viewData ? viewData : editData ? editData : ""
    )
    // for refrencing the input tag
    const inputRef = useRef(null);

    // onDrop 
    const onDrop = (acceptedFiles) => {
        const file = acceptedFiles[0]
        if (file) {
            setSelectedFile(file);
            previewFile(file);
        }
    }

    // function to preview file
    const previewFile = (file) => {
        console.log("File details", file);
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            setPreviewSource(reader.result);
        }
    }

    // th select file bu using useDropZone
    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        accept: !video ? {
            "image/*": [".jpeg", ".jpg", ".png", ".webp"]
        } : { "video/*": [".mp4", ".mkv"] },
        onDrop,
    })

    useEffect(() => {
        register(name, { required: true })
    }, [register]);

    useEffect(() => {
        setValue(name, selectedFile)
    }, [selectedFile, setValue])

    return (
        <div className="flex flex-col space-y-2">
            <label htmlFor={name}>{label} {!viewData && <sup className="text-pink-200">*</sup>}</label>
            <div className={`${isDragActive ? "bg-richblack-600" : "bg-richblack-700"} flex min-h-[250px] cursor-pointer items-center justify-center rounded-lg border-2 border-richblack-400 border-dotted`}>
                {
                    previewSource ? (
                        <div className="flex flex-col w-full p-6">
                            {
                                !video ? (
                                    <img src={previewSource} alt="thumbnailPreview" className="h-full object-cover w-full rounded-lg" />
                                ) : (
                                    <div>
                                        {
                                            <ReactPlayer url={previewSource} width="auto" controls={true} />
                                            // testing with different things
                                            // linkvideo ? (
                                            //     <div>
                                            //         <ReactPlayer url={previewSource} width="auto" controls={true} />
                                            //         {/* <Player>
                                            //             <source src={previewSource} />
                                            //         </Player> */}
                                            //     </div>
                                            // ) : (
                                            //     <div>
                                            //         <Player aspectRatio="16:9" playsInline src={previewSource} />
                                            //     </div>
                                            // )
                                        }
                                    </div>
                                )
                            }
                            {
                                !viewData && (
                                    <button type="button"
                                        onClick={() => {
                                            setPreviewSource("")
                                            setSelectedFile(null)
                                            setValue(name, null)
                                        }}
                                        className="mt-3 text-richblack-300 underline"
                                    >
                                        Cancel
                                    </button>
                                )
                            }
                        </div>
                    ) : (
                        <div>
                            <div className="flex w-full p-6 flex-col items-center" {...getRootProps()}>
                                <input type="file" {...getInputProps()} ref={inputRef} />
                                <div className="flex aspect-square rounded-full w-14 justify-center items-center bg-pure-greys-800">
                                    <FiUploadCloud className="text-3xl text-yellow-25" />
                                </div>
                                <p className="mt-2 max-w-[200px] text-center text-sm text-richblack-200">
                                    Drag and drop an {!video ? "image" : "video"}, or click to{" "}
                                    <span className="font-semibold text-yellow-50">Browse</span> a
                                    file
                                </p>
                                <ul className="mt-10 flex list-disc justify-between space-x-12 text-center text-xs text-richblack-100">
                                    <li>Aspect ratio 16:9</li>
                                    <li>Recommended size 1024x576</li>
                                </ul>
                            </div>
                        </div>
                    )
                }
            </div>
            <div className="text-center font-semibold text-xl p-2 mt-2">
                OR
            </div>
            <div>
                <div>
                    <input
                        type="url"
                        name="lectureVideo"
                        placeholder="URL"
                        // value={previewSource}
                        className="bg-richblack-600 rounded-xl text-richblack-5 p-3 border-richblack-300 border-b-[1px] w-full text-center"
                        onBlur={(e) => {
                            setPreviewSource(e.target.value);
                            setValue(name, e.target.value);
                        }}
                        onChange={(e) => {
                            setTimedurationOpen(e.target.value)
                        }}
                    />
                </div>
                {
                    errors[name] && (
                        <span className="ml-2 text-xs tracking-wide text-pink-200">
                            {label} is required
                        </span>
                    )
                }
            </div>
            <div>
                {
                    viewData ? (
                        <div className="flex flex-col space-y-2 mt-4">
                            <label htmlFor="timeDuration" className="text-richblack-5 mt-2">Lecture Duration<sup className=" text-pink-200">*</sup></label>
                            <input
                                type="text"
                                name="timeDuration"
                                id="timeDuration"
                                value={modalDataTime}
                                placeholder="Enter the video Duration"
                                className="bg-richblack-600 rounded-xl text-richblack-5 p-3 border-richblack-300 border-b-[1px] w-full"
                            />
                        </div>
                    ) : (
                        <div></div>
                    )
                }
            </div>
            <div>
                {
                    !video ? (
                        <div></div>
                    ) : (
                        editData ? (
                            <div className="flex flex-col space-y-2">
                                <label htmlFor="timeDuration" className="text-richblack-5">Lecture Duration<sup className=" text-pink-200">*</sup></label>
                                <input
                                    type="text"
                                    name="timeDuration"
                                    id="timeDuration"
                                    placeholder="Enter the video Duration"
                                    className="bg-richblack-600 rounded-xl text-richblack-5 p-3 border-richblack-300 border-b-[1px] w-full"
                                    {...register("timeDuration", { required: true })}
                                />
                                {
                                    errors.timeDuration && (
                                        <span className="ml-2 text-xs tracking-wide text-pink-200">
                                            Time Duration is Required
                                        </span>
                                    )
                                }
                            </div>
                        ) : (
                            <div></div>
                        )
                    )
                }
            </div>
        </div >
    )
}

export default Upload;