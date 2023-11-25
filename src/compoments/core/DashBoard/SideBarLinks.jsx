import React from "react";
import * as Icons from "react-icons/vsc"
import { useLocation, matchPath, NavLink } from "react-router-dom";

const SidebarLink = ({link, iconName}) => {

    const Icon = Icons[iconName]
    const location = useLocation();

    // match route
    const matchRoute = (route) => {
        return matchPath({ path: route }, location.pathname);
    }
    return (
        <NavLink to={link.path} 
        className={`relative px-8 py-2 text-sm font-medium transition-all duration-200 ${matchRoute(link.path) ? " bg-yellow-600 text-yellow-5" : " bg-opacity-0 text-richblack-300"}`}
        >
            <span className={`absolute top-0 left-0 bottom-0 w-[0.2rem] bg-yellow-50 ${matchRoute(link.path) ? "opacity-100" : "opacity-0"}`}></span>

            <div className="flex gap-2 items-center ">
                <Icon className="text-lg"/>
                <span>{link.name}</span>
            </div>
        </NavLink>
    );
}
export default SidebarLink;