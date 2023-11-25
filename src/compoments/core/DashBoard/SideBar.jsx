import React, { useState } from "react";
import { sidebarLinks } from "../../..//data/dashboard-links";
import { logout } from "../../../services/operations/authAPI";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import SidebarLink from "./SideBarLinks";
import { BiLogOutCircle } from "react-icons/bi";
import ConfirmationModal from "../../comman/ConfirmationModal";
import Spinner from "../../comman/Spinner";
import { toast } from "react-hot-toast";

const SideBar = () => {

    const { user, loading: profileLoading } = useSelector((state) => state.profile);
    const { loading: authLoading } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    // state variable for confirmation Modal
    const [confirmationModal, setConfirmationModal] = useState(null);
    if (profileLoading || authLoading) {
        return (
            <div className="mt-10 flex h-[100vh] justify-center items-center">
                <Spinner />
            </div>
        );
    }
    return (
        <div>
            <div className="flex min-w-[220px] flex-col border-r-[1px] border-richblack-700 h-[calc(100vh-3.5rem)] bg-richblack-800 py-10">
                <div className="flex flex-col">
                    {
                        sidebarLinks.map((link) => {
                            if (link.type && user?.accountType !== link.type) return null;
                            return (
                                <SidebarLink key={link.id} link={link} iconName={link.icon} />
                            )
                        })
                    }
                </div>
                {/* horizontal line */}
                <div className="mx-auto mt-6 mb-6 h-[1px] w-10/12 bg-richblack-600">
                </div>
                {/* /setting and logout part */}
                <div className="flex flex-col">
                    <SidebarLink link={{ name: "Settings", path: "dashboard/settings" }} iconName="VscSettings" />

                    <button onClick={() => setConfirmationModal({
                        text1: "Are You Sure ?",
                        text2: "You will be logged out",
                        btn1Text: "Logout",
                        btn2Text: "Cancel",
                        btn1Handler: () => dispatch(logout(navigate)),
                        btn2Handler: () => {
                            setConfirmationModal(null);
                            toast.dismiss("you didn't logged out");
                        },
                    })} className="text-base font-medium text-richblack-100 py-2 px-8">
                        <div className="flex items-center gap-x-2">
                            <BiLogOutCircle className="text-lg" />
                            <span>Logout</span>
                        </div>
                    </button>
                </div>
            </div>
            {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
        </div>
    );
}

export default SideBar;