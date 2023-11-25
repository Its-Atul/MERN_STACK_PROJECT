import React from "react";
import ChangeProfilePicture from "./Setting/ChangeProfilePicture";
import EditProfile from "./Setting/EditProfile";
import ChangePassword from "./Setting/ChangePassword";
import DeleteAccount from "./Setting/DeleteAccount";

const Settings = () =>{
    return(
        <div className="w-11/12 max-w-[1000px] mx-auto py-10 mt-10 font-inter">
            <h2 className="mb-12 text-3xl font-medium text-richblack-5">Edit Profile</h2>
            {/* profile picture part */}
            <ChangeProfilePicture />
            {/* profile information part */}
            <EditProfile />
            {/* Change Password Section */}
            <ChangePassword />
            {/* delete Section */}
            <DeleteAccount />
        </div>
    );
}

export default Settings;