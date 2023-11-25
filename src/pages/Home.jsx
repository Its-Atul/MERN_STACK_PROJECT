import React from "react";
import { Link } from "react-router-dom";
import { FiArrowRight } from "react-icons/fi";
import HighLightText from "../compoments/core/HomePage/HighLightText";
import CTAButton from "../compoments/core/HomePage/CTAButton";
import Banner from "../assets/Images/banner.mp4";
import CodeBlocks from "../compoments/core/HomePage/CodeBlocks";
import TimeLineSection from "../compoments/core/HomePage/TimeLineSection";
import LearningLanguageSection from "../compoments/core/HomePage/LearningLanguageSection";
import Footer from "../compoments/comman/Footer";
import InstructorSection from "../compoments/core/HomePage/InstructorSection";
import ExploreMore from "../compoments/core/HomePage/ExploreMore";
import { ReviewComponent } from "../compoments/comman/ReviewComponent";

const Home = () => {
    return (
        <div>
            {/* Creation of secion 1 */}
            <div className="relative mx-auto flex flex-col w-11/12 items-center h-fit text-white justify-between max-w-maxContent ">
                {/* button for Become a instructor */}
                <Link to={"/signup"}>
                    <div className="mt-16 flex flex-row font-medium text-base font-inter justify-center items-center gap-x-[0.75rem] bg-richblack-800 py-4 px-8 rounded-[500px] border-b-[1px] border-richblack-25 text-richblack-50 hover:scale-105 hover:font-bold hover:text-richblack-900 hover:bg-richblack-5 transition-all duration-500">
                        <p>Become an Instructor </p>
                        <FiArrowRight fontSize={18} />
                    </div>
                </Link>
                <div className="text-center text-4xl font-semibold mt-7">
                    Empower Your Future with
                    <HighLightText text={"Coding Skills"} />
                </div>
                <div className="w-[90%] text-center text-lg text-richblack-300 mt-4 ">
                    With our online coding courses, you can learn at your own pace, from anywhere in the world, and get access to a wealth of resources, including hands-on projects, quizzes, and personalized feedback from instructors.
                </div>
                {/* button Creation */}
                <div className="flex flex-row gap-7 mt-8">
                    <CTAButton active={true} linkto={"/signup"}>Lrean More</CTAButton>
                    <CTAButton active={false} linkto={"/login"}>Book a Demo</CTAButton>
                </div>

                <div className="mx-3 my-12 max-w-[90%] shadow-[10px_-5px_50px_-5px] shadow-blue-200 rounded-xl ">
                    {/* <div className=" absolute w-[115%] h-[115%] bg-blue-200 blur-md"></div> */}
                    <div>
                        <video muted loop autoPlay className="rounded-xl shadow-[20px_20px_0_0] shadow-white">
                            <source src={Banner} type="video/mp4" />
                        </video>
                    </div>
                </div>

                {/* code section */}
                <div className="w-[95%] mx-auto ">
                    <CodeBlocks
                        position={"lg:flex-row md:flex-col"}
                        location={true}
                        heading={
                            <div className="text-4xl font-semibold">
                                Unlock your
                                <HighLightText text={"coding potentail "} />
                                with our online courses.
                            </div>
                        }
                        subheading={
                            "Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you."
                        }
                        ctabtn1={
                            {
                                btnText: "Try it Yourself",
                                active: true,
                                linkto: "/signup",
                            }
                        }
                        ctabtn2={
                            {
                                btnText: "Learn More",
                                active: false,
                                linkto: "/login",
                            }
                        }
                        codeblock={
                            `<!DOCTYPE html>
                        <html lang="en">
                        <head><title>Document</title></head>
                        <body>
                        <h1><a href="/">Header</a>
                        </h1>
                        <nav><a href="one/">One</a><a href="two/">Two</a><a href="three/">Three</a>
                        </nav>
                        </body>
                        </html>`
                        }
                        codeColor={"text-yellow-50"}

                    />
                </div>
                {/* code Section 2 */}
                <div className="w-[95%] mx-auto ">
                    <CodeBlocks
                        position={"lg:flex-row-reverse"}
                        location={false}
                        heading={
                            <div className="text-4xl font-semibold">
                                Start
                                <HighLightText text={
                                    `coding
                                in seconds`
                                } />
                            </div>
                        }
                        subheading={
                            "Go ahead, give it a try. Our hands-on learning environment means you'll be writing real code from your very first lesson."
                        }
                        ctabtn1={
                            {
                                btnText: "Continue Lesson    ",
                                active: true,
                                linkto: "/signup",
                            }
                        }
                        ctabtn2={
                            {
                                btnText: "Learn More",
                                active: false,
                                linkto: "/login",
                            }
                        }
                        codeblock={
                            `<!DOCTYPE html>
                        <html lang="en">
                        <head><title>Document</title></head>
                        <body>
                        <h1><a href="/">Header</a>
                        </h1>
                        <nav><a href="one/">One</a><a href="two/">Two</a><a href="three/">Three</a>
                        </nav>
                        </body>
                        </html>`
                        }
                        codeColor={"text-white"}
                    />
                </div>
                {/* Unlock the power wala section */}
                <ExploreMore />
            </div>
            {/* Section 2 */}
            <div className=" text-richblack-700 bg-pure-greys-5">
                <div className="homepage_bg h-[310px]">
                    <div className="w-11/12 max-w-maxContent flex flex-col gap-5 justify-center items-center mx-auto mt-10">
                        <div className="flex flex-row gap-7 items-center justify-center text-white mt-36">
                            <CTAButton active={true} linkto={"/signup"}>
                                <div className="flex items-center gap-2">
                                    Explore full Catalog
                                    <FiArrowRight />
                                </div>
                            </CTAButton>
                            <CTAButton active={false} linkto={"/login"} >
                                <div>
                                    Learn More
                                </div>
                            </CTAButton>
                        </div>
                    </div>
                </div>
                {/* part 2  */}
                <div className="w-11/12 mx-auto max-w-maxContent flex flex-col items-center justify-center gap-10 bg-pure-greys-5">
                    <div className="flex lg:flex-row flex-col gap-5 ml-4 mb-10 mt-[90px] justify-between">
                        <div className="text-4xl font-semibold lg:w-[45%] w-[100%]">
                            Get the skills you need for a
                            <HighLightText text={"job that is in demand."} />
                        </div>
                        <div className="flex flex-col gap-10 lg:w-[45%] w-[100%] items-start ">
                            <div className="text-richblack-700 text-[16px]">
                                The modern StudyNotion is the dictates its own terms. Today, to be a competitive specialist requires more than professional skills.
                            </div>
                            <CTAButton active={true} linkto={"/login"}>
                                <div className="">
                                    Learn More
                                </div>
                            </CTAButton>
                        </div>
                    </div>
                </div>

                {/* part 3 */}
                <TimeLineSection />

                {/* part 4 */}
                <LearningLanguageSection />
            </div>
            {/* Section 3 */}
            <div className="w-11/12 max-w-maxContent mx-auto flex-col items-center justify-between gap-8 bg-richblack-900 text-white">
                {/* part:1 */}
                <InstructorSection />
                {/* part 2 */}
                <h2 className="text-center text-4xl font-semibold mt-10 ">
                    Reviews from other learners
                </h2>
                {/* Review Slider */}
                <div className="mb-6">
                    <ReviewComponent />
                </div>
            </div>
            {/* Section 4 : That's the footer section */}
            <Footer />
        </div>
    );
}

export default Home;