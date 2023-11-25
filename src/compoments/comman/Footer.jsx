import React from "react";
import { FooterLink2 } from "../../data/footer-links";

import Logo from "../../assets/Logo/Logo-Full-Light.png";
import { Link } from "react-router-dom";
import { FaFacebook, FaGoogle, FaYoutube, FaTwitter } from "react-icons/fa";
// import { FontAwesomeIcon } from "font-awesome";

const BottomFooter = ["Privacy Policy", "Cookie Policy", "Terms"];
const Resources = [
    "Articles",
    "Blog",
    "Chart Sheet",
    "Code challenges",
    "Docs",
    "Projects",
    "Videos",
    "Workspaces",
];
const Plans = ["Paid memberships", "For students", "Business solutions"];
const Community = ["Forums", "Chapters", "Events"];

const Footer = () => {
    return (
        <div className=" bg-richblack-800">
            <div className="flex lg:flex-row gap-8 items-center justify-between w-11/12 max-w-maxContent text-richblack-400 leading-6 mx-auto relative py-14">
                <div className="border-b w-[100%] flex flex-col lg:flex-row pb-5 border-richblack-700">
                    {/* Section 1 */}
                    <div className="lg:w-[50%] flex flexx-wrap flex-row justify-between lg:border-r lg:border-richblack-700 pl-3 lg:pr-5 gap-3">
                        <div className="w-[30%] flex flex-col gap-3 lg:w-[30%] mb-7 lg:pl-0">
                            <img src={Logo} alt="Study Notion Logo" />
                            <h2 className="text-richblack-50 font-semibold text-base">
                                Company
                            </h2>
                            <div className="flex flex-col gap-2">
                                {["About", "Careers", "Affiliates"].map((ele, i) => {
                                    return (
                                        <div key={i} className=" text-sm cursor-pointer hover:text-richblack-50 transition-all duration-200">
                                            <Link to={ele.toLowerCase()}>{ele}</Link>
                                        </div>
                                    )
                                })}
                            </div>
                            <div className="flex gap-3 text-lg">
                                <a href="https://www.instagram.com/easygoing_jeet/">
                                    {/* <FontAwesomeIcon icon="fa-brands fa-instagram" /> */}
                                </a>
                                <FaGoogle />
                                <FaTwitter />
                                <FaYoutube />
                            </div>
                        </div>
                        <div className="w-[48%] lg:w-[30%] mb-7 lg:pl-0">
                            {/* Resources */}
                            <h2 className="text-richblack-50 font-semibold text-base">
                                Resources
                            </h2>
                            <div className="flex flex-col gap-2 mt-2">
                                {Resources.map((element, index) => {
                                    return (
                                        <div key={index} className="text-sm cursor-pointer hover:text-richblack-50 transition-all duration-200" >
                                            <Link to={element.split(" ").join("-").toLowerCase()}>{element}</Link>
                                        </div>
                                    )
                                })}
                            </div>
                            {/* support */}
                            <h2 className="text-richblack-50 font-semibold text-base mt-3">
                                Support
                            </h2>
                            <div className="text-sm cursor-pointer hover:text-richblack-50 transition-all duration-200 mt-2">
                                <Link to={"/help-center"}>Help Center</Link>
                            </div>
                        </div>
                        <div className="w-[48%] lg:w-[30%] mb-7 lg:pl-0">
                            {/* Plans */}
                            <h2 className="text-richblack-50 font-semibold text-base">
                                Plans
                            </h2>
                            <div className="flex flex-col gap-2 mt-2">
                                {Plans.map((element, index) => {
                                    return (
                                        <div key={index} className="text-sm cursor-pointer hover:text-richblack-50 transition-all duration-200">
                                            <Link to={element.split(" ").join("-").toLowerCase()}>
                                                {element}
                                            </Link>
                                        </div>
                                    )
                                })}
                            </div>
                            {/* Community */}
                            <h2 className="text-richblack-50 font-semibold text-base mt-3">
                                Community
                            </h2>
                            <div className="flex flex-col gap-2 mt-2">
                                {Community.map((ele, i) => {
                                    return (
                                        <div key={i} className="text-sm cursor-pointer hover:text-richblack-50 transition-all duration-200">
                                            <Link to={ele.split(" ").join("-").toLowerCase()}>{ele}</Link>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                    {/* Section 2 */}
                    <div className="lg:w-[50%] flex flex-wrap flex-row justify-between pl-3 lg:pl-5 gap-3">
                        {FooterLink2.map((ele, i) => {
                            return (
                                <div key={i} className="w-[48%] lg:w-[30%] mb-7 lg:pl-0">
                                    <h2 className="text-richblack-50 font-semibold text-base">
                                        {ele.title}
                                    </h2>
                                    <div className="flex flex-col gap-2 mt-2">
                                        {ele.links.map((link, index) => {
                                            return (
                                                <div key={index} className="text-sm cursor-pointer hover:text-richblack-50 transition-all duration-200">
                                                    <Link to={link.link}>{link.title}</Link>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
            {/* Bottom Part  */}
            <div className="flex flex-row items-center justify-between w-11/12 max-w-maxContent text-richblack-200 mx-auto pb-10 text-sm">
                {/* section 1 */}
                <div className="flex justify-between lg:items-start items-center flex-col lg:flex-row gap-3 w-full">
                    <div className="flex">
                        {BottomFooter.map((element, index) => {
                            return (
                                <div key={index} className={`px-3 ${BottomFooter.length - 1 === index
                                    ? ""
                                    : "border-r border-richblack-700 cursor-pointer hover:text-richblack-50 transition-all duration-200"}`}>
                                    <Link to={element.split(" ").join("-").toLowerCase()}>{element}</Link>
                                </div>
                            );
                        })}
                    </div>
                    {/* copyright */}
                    <div className=" text-center">Made With ❤️ Jatin Sahu © 2023 Studynotion_JS</div>
                </div>
            </div>
        </div >
    )
};

export default Footer;