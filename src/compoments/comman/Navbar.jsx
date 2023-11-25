import React, { useEffect, useState } from "react";
import { Link, Outlet, matchPath } from "react-router-dom";
import { NavbarLinks } from "../../data/navbar-links";
import { useLocation } from "react-router-dom";
import Logo from "../../assets/Logo/Logo-Full-Light.png"
import { useSelector } from "react-redux";
import { AiOutlineShoppingCart, AiOutlineDown } from "react-icons/ai";
import ProfileDropDown from "../core/Auth/ProfileDropDown";
import { apiConnector } from "../../services/apiConnector";
import { categories } from "../../services/apis";
import toast from "react-hot-toast";

//for now just as testing
// const subLinks = [
//     {
// title:"python",?
//         link:"/catalog/python"
//     },
//     {
//         title:"Web DeV",
//         link:"/catalog/web-development"
//     }
// ]

const Navbar = () => {
    // fetch all the state from statemangment 
    const { token } = useSelector((state) => state.auth);
    const { user } = useSelector((state) => state.profile);
    const { totalItems } = useSelector((state) => state.cart);
    const Instructor = "Instructor";
    // location hook
    const location = useLocation();
    // api call
    const [subLinks, setSubLinks] = useState([]);
    async function fetchSubLinks() {
        try {
            const result = await apiConnector("GET", categories.CATEGORIES_API);
            console.log("printing sub links results", result);
            // console.log("printing all categories", result?.data?.allCategory);
            setSubLinks(result?.data?.allCategory);
        } catch (error) {
            console.log("not able to fetch the category list");
            toast.error(error.message);
        }
    }
    useEffect(() => {
        fetchSubLinks();
        // console.log("Sublink filter ", subLinks.filter((subLink) => subLink?.courses.length > 0))
    }, [])

    // match route
    const matchRoute = (route) => {
        return matchPath({ path: route }, location.pathname);
    }
    // console.log(matchRoute);
    return (
        <>
            <div className="flex h-14 items-center justify-center border-b-[0.5px] font-inter border-b-richblack-400 bg-richblack-800 ">
                <div className="flex w-11/12 max-w-[1200px] items-center justify-between">
                    {/* image */}
                    <Link to="/">
                        <img src={Logo} alt="logo" loading="lazy" width={160} height={42} />
                    </Link>

                    {/* nav links */}
                    <nav>
                        <ul className="flex gap-x-6 text-richblack-25">
                            {
                                NavbarLinks.map((link, index) => (
                                    <li key={index}>
                                        {
                                            link.title === "Catalog" ? (
                                                <div className="relative flex items-center cursor-pointer group z-10">
                                                    <p className="flex gap-x-2 items-center">{link.title}
                                                        <AiOutlineDown />
                                                    </p>
                                                    <div className=" invisible absolute left-[50%] top-[50%] flex flex-col rounded-md bg-richblack-5 p-4 text-richblack-900 opacity-0 transition-all duration-300 group-hover:visible group-hover:opacity-100 lg:w-[300px] translate-x-[-50%] translate-y-[10%]">
                                                        <div className=" absolute left-[50%] top-0 translate-x-[50%] translate-y-[-45%] h-6 w-6 rotate-45 rounded-md bg-richblack-5 ">
                                                        </div>
                                                        {
                                                            subLinks.length ? (
                                                                <>
                                                                {
                                                                    subLinks.map((subLink, i) => (
                                                                        <Link className="rounded-lg bg-transparent py-2 pl-4 hover:bg-richblack-50" key={i} 
                                                                        to={`/catalog/${subLink.name
                                                                            .split(" ")
                                                                            .join("-")
                                                                            .toLowerCase()}`}>
                                                                            {subLink.name}
                                                                        </Link>
                                                                    ))
                                                                }
                                                                </>
                                                            ) : (<div>No Course Found</div>)
                                                        }
                                                    </div>
                                                </div>
                                            ) : (
                                                <Link to={link?.path}>
                                                    <p className={`${matchRoute(link?.path) ? "text-yellow-25" : " text-richblack-25"}`}>
                                                        {link?.title}
                                                    </p>
                                                </Link>
                                            )
                                        }
                                    </li>
                                ))
                            }
                        </ul>
                    </nav>

                    {/* Login and sign in / Dashboard and cart */}
                    <div className=" flex gap-x-4 items-center">
                        {/* if student is loggedin */}
                        {
                            user && user?.accountType !== Instructor && (
                                <Link to="/dashboard/cart" className="relative">
                                    <AiOutlineShoppingCart className="text-xl text-richblack-5" />{
                                        totalItems > 0 && (
                                            <span className=" absolute -bottom-2 -top-2 left-4 text-yellow-25 text-center text-sm font-bold h-5 w-5 rounded-full">
                                                {totalItems}
                                            </span>
                                        )
                                    }
                                </Link>
                            )
                        }

                        {/* login in botten dikhna hai ki nhi */}
                        {
                            token === null && (
                                <Link to="/login">
                                    <button className="bg-richblack-800 text-richblack-5 py-2 px-5 border border-richblack-700 rounded-lg font-inter hover:bg-white hover:text-richblack-900 transition-all duration-300 scale-110 hover:font-semibold">
                                        Log in
                                    </button>
                                </Link>
                            )
                        }
                        {
                            token === null && (
                                <Link to="/signup">
                                    <button className="bg-richblack-800 text-richblack-5 py-2 px-5 border border-richblack-700 rounded-lg font-inter hover:bg-white hover:text-richblack-900 transition-all duration-300 scale-110 hover:font-semibold">
                                        Sign Up
                                    </button>
                                </Link>
                            )
                        }{
                            token !== null && <ProfileDropDown />
                        }
                    </div>
                </div>
            </div>
            <Outlet />
        </>
    )
}

export default Navbar;