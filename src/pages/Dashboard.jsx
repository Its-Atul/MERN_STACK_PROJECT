import React from "react";
import { useSelector } from "react-redux";
import Spinner from "../compoments/comman/Spinner";
import { Outlet } from "react-router-dom";
import SideBar from "../compoments/core/DashBoard/SideBar";
const Dashboard = () => {

    const { loading: profileLoading } = useSelector((state) => state.profile);
    const { loading: authLoading } = useSelector((state) => state.auth);
    if (profileLoading || authLoading) {
        return (
            <div className="mt-10 flex h-[calc(100vh-3.5rem)] justify-center items-center">
                <Spinner />
            </div>
        );
    }
    return (
        <div className="relative flex min-h-[calc(100vh-3.5rem)]">
            <SideBar />
            <div className="h-[calc(100vh-3.5rem)] flex-1 overflow-auto">
                <div className="mx-auto w-11/12 max-w-[1000px]">
                    <Outlet />
                </div>
            </div>
        </div>
    );
}

export default Dashboard;