import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import IconBtn from "../../comman/iconBtn";
import { FiEdit } from "react-icons/fi";

const MyProfile = () => {


    const { user } = useSelector((state) => state.profile);
    const navigate = useNavigate();
    const DateOfBirth = user?.additionalDetails?.dateOfBirth;
    console.log("type of date fof tbirth", typeof(DateOfBirth));
    console.log("Printting Date of Birth", DateOfBirth);

    const BirthDate = new Date(DateOfBirth);
    console.log("the birth Date", BirthDate);
    // date formatter function
    const formattedDate = BirthDate.toLocaleDateString('en-US',{
        month:"long",
        day:"numeric",
        year:"numeric",
    });
    console.log("formatted date", formattedDate);
    console.log("printing user", user);
    console.log("printing about", user?.additionalDetails?.about);
    return (
        <div className="w-11/12 max-w-[1000px] mx-auto py-10">
            <h2 className="mb-12 text-3xl font-medium text-richblack-5">My Profile</h2>
            {/* part 1 */}
            <div className="flex items-center justify-between rounded-md border-[1px] border-richblack-600 bg-richblack-800 py-8 px-12">
                <div className="flex items-center gap-x-4">
                    <img src={user?.image} alt={`profile- ${user?.firstName}`} className=" aspect-square w-[50px] rounded-full object-cover" />
                    <div className="my-1">
                        <p className="text-lg font-semibold text-richblack-5">
                            {user?.firstName + " " + user?.lastName}
                        </p>
                        <p className="text-sm text-richblack-200">
                            {user?.email}
                        </p>
                    </div>
                </div>
                <IconBtn text="Edit" onClick={() => {
                    navigate("/dashboard/settings")
                }}>
                    <FiEdit />
                </IconBtn>
            </div>
            {/* part 2 */}
            <div className=" my-10 flex flex-col gap-y-10 rounded-md border-[1px] border-richblack-600 bg-richblack-800 py-8 px-12">
                <div className="flex items-center justify-between w-full">
                    <p className="text-lg font-semibold text-richblack-5">About</p>
                    <IconBtn text="Edit" onClick={() => { navigate("/dashboard/settings") }}>
                        <FiEdit />
                    </IconBtn>
                </div>
                <p className={`${user?.additionalDetails?.about ? "text-richblack-25" : "text-richblack-200"} text-sm font-medium`}>
                    {user?.additionalDetails?.about ?? "Write somting about yourself"}
                </p>
            </div>
            {/* part 3 */}
            <div className="my-10 flex flex-col gap-y-10 rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-8 px-12">
                <div className="flex w-full items-center justify-between">
                    <h2 className="text-lg font-semibold text-richblack-5">Personal Details</h2>
                    <IconBtn text="Edit" onClick={() => { navigate("/dashboard/settings") }}>
                        <FiEdit />
                    </IconBtn>
                </div>
                <div className="flex max-w-[500px] justify-between">
                    <div className="flex flex-col gap-y-5">
                        <div>
                            <p className="mb-2 text-sm text-richblack-600">First Name</p>
                            <p className="text-sm font-medium text-richblack-5">
                                {user?.firstName}
                            </p>
                        </div>
                        <div>
                            <p className="mb-2 text-sm text-richblack-600">Email</p>
                            <p className="text-sm font-medium text-richblack-5">
                                {user?.email}
                            </p>
                        </div>
                        <div>
                            <p className="mb-2 text-sm text-richblack-600">Gender</p>
                            <p className="text-sm font-medium text-richblack-5">
                                {user?.additionalDetails?.gender ?? "Add Gender"}
                            </p>
                        </div>
                    </div>
                    <div className="flex flex-col gap-y-5">
                        <div>
                            <p className="mb-2 text-sm text-richblack-600">Last Name</p>
                            <p className="text-sm font-medium text-richblack-5">
                                {user?.lastName}
                            </p>
                        </div>
                        <div>
                            <p className="mb-2 text-sm text-richblack-600">Phone Number</p>
                            <p className="text-sm font-medium text-richblack-5">
                                {user?.additionalDetails?.contactNumber ?? "Add Contact Number"}
                            </p>
                        </div>
                        <div>
                            <p className="mb-2 text-sm text-richblack-600">Date Of Birth</p>
                            <p className="text-sm font-medium text-richblack-5">
                                {formattedDate ??
                                    "Add Date Of Birth"}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MyProfile;