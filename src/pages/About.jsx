import React from "react";
import HighLightText from "../compoments/core/HomePage/HighLightText";
import Banner1 from "../assets/Images/aboutus1.webp";
import Banner2 from "../assets/Images/aboutus2.webp";
import Banner3 from "../assets/Images/aboutus3.webp";
import Quote from "../compoments/core/AboutPage/Quote";
import FoundingStory from "../assets/Images/FoundingStory.png";
import Stats from "../compoments/core/AboutPage/Stats";
import LearningGrid from "../compoments/core/AboutPage/LearningGrid";
import ContactFormSection from "../compoments/core/AboutPage/ContactFormSection";
import Footer from "../compoments/comman/Footer";
import { ReviewComponent } from "../compoments/comman/ReviewComponent";

const About = () => {
    return (
        <div className=" font-inter">
            {/* section 1 */}
            <section className=" bg-richblack-700">
                <div className="relative mx-auto flex flex-col w-11/12 max-w-maxContent justify-between gap-10 text-center text-richblack-5">
                    <header className="mx-auto py-20 text-4xl font-semibold lg:w-[65%]">
                        Driving Innovation in Online Education for a
                        <HighLightText text={"Brighter Future"} />
                        <p className="mx-auto mt-3 text-center text-base font-medium text-richblack-300 w-[97%]">
                            Studynotion is at the forefront of driving innovation in online education. We're passionate about creating a brighter future by offering cutting-edge courses, leveraging emerging technologies, and nurturing a vibrant learning community.
                        </p>
                    </header>
                    <div className=" lg:h-[160px]"></div>
                    <div className=" absolute flex gap-10 bottom-0 w-[100%] translate-y-[30%]">
                        <img src={Banner1} alt="aboutus1" className=" rounded-lg" />
                        <img src={Banner2} alt="aboutus2" className=" rounded-lg" />
                        <img src={Banner3} alt="aboutus3" className=" rounded-lg" />
                    </div>
                </div>
            </section>

            {/* Section 2 */}
            <section className="border-b-4 border-richblack-700">
                <div className="mx-auto flex w-11/12 max-w-maxContent flex-col justify-between gap-10 text-richblack-500">
                    <div className="h-[100px]"></div>
                    <Quote />
                </div>
            </section>

            {/* section 3 */}
            <section className="mx-auto flex flex-col w-11/12 max-w-maxContent justify-between gap-10 text-richblack-500">
                {/* part 1 */}
                <div className=" flex flex-col lg:flex-row items-center gap-10 justify-between">
                    <div className=" lg:w-[50%] flex flex-col my-24 gap-10">
                        <h2 className=" bg-gradient-to-br from-[#833AB4] via-[#FD1D1D] to-[#FCB045] bg-clip-text text-transparent text-4xl font-semibold lg:w-[70%]">
                            Our Founding Story
                        </h2>
                        <p className="text-base font-medium text-richblack-300 lg:w-[90%]">
                            Our e-learning platform was born out of a shared vision and passion for transforming education. It all began with a group of educators, technologists, and lifelong learners who recognized the need for accessible, flexible, and high-quality learning opportunities in a rapidly evolving digital world.
                        </p>
                        <p className="text-base font-medium text-richblack-300 lg:w-[90%]">
                            As experienced educators ourselves, we witnessed firsthand the limitations and challenges of traditional education systems. We believed that education should not be confined to the walls of a classroom or restricted by geographical boundaries. We envisioned a platform that could bridge these gaps and empower individuals from all walks of life to unlock their full potential.
                        </p>
                    </div>
                    <div className="">
                        <img src={FoundingStory} alt="foundingStory" className=" rounded-2xl shadow-[0_0_20px_5px] shadow-[#FC6767]" />
                    </div>
                </div>
                {/* part 2 */}
                <div className="flex flex-col lg:flex-row items-center lg:gap-10 justify-between">
                    <div className=" my-16 flex lg:w-[40%] flex-col gap-10">
                        <h2 className=" bg-gradient-to-t from-[#FF512F] to-[#F09819] bg-clip-text text-transparent text-4xl font-semibold lg:w-[70%]">Our Vision</h2>
                        <p className="text-base text-richblack-300 font-medium lg:w-[90%]">With this vision in mind, we set out on a journey to create an e-learning platform that would revolutionize the way people learn. Our team of dedicated experts worked tirelessly to develop a robust and intuitive platform that combines cutting-edge technology with engaging content, fostering a dynamic and interactive learning experience.</p>
                    </div>
                    <div className="my-16 flex lg:w-[40%] flex-col gap-10">
                        <h2 className=" bg-gradient-to-b from-[#1FA2FF] via-[#12D8FA] to-[#A6FFCB] bg-clip-text text-transparent text-4xl font-semibold lg:w-[70%]">Our Mission</h2>
                        <p className="text-base text-richblack-300 font-medium lg:w-[90%]">our mission goes beyond just delivering courses online. We wanted to create a vibrant community of learners, where individuals can connect, collaborate, and learn from one another. We believe that knowledge thrives in an environment of sharing and dialogue, and we foster this spirit of collaboration through forums, live sessions, and networking opportunities.</p>
                    </div>
                </div>
            </section>

            {/* section 4 */}
            <section className=" bg-richblack-700">
                <Stats />
            </section>
            {/* section 5 */}
            <section className="mx-auto flex flex-col w-11/12 max-w-maxContent justify-between gap-10 mt-20 text-richblack-5">
                <LearningGrid />
            </section>
            {/* section 6 */}
            <section className="mx-auto flex flex-col w-11/12 max-w-maxContent justify-between gap-10 mt-20 text-richblack-5">
                <ContactFormSection />
            </section>
            {/* section 7 */}
            <div className="mb-6 mt-10">
                <h2 className="text-center text-richblack-5 text-4xl font-semibold">Reviews from other learners</h2>
                <ReviewComponent />
            </div>
            {/* footer section */}
            <Footer />
        </div>
    )
};

export default About;