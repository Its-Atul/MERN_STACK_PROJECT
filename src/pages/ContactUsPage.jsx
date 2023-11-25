import React from "react";
import Footer from "../compoments/comman/Footer";
import ContactUsForm from "../compoments/comman/ContactUsForm";
import { ReviewComponent } from "../compoments/comman/ReviewComponent";

const ContactUsPage = () => {
    const contactPageData = [
        {
            logo: "💬",
            title: "Chat on us",
            desc: "Our friendly team is here to help.",
            address: "studynotion0999@gmail.com",
        },
        {
            logo: "🌍",
            title: "Visit Us",
            desc: "Come and say hello at our office HQ.",
            address: "Here is the location/ address",
        },
        {
            logo: "📞",
            title: "Call Us",
            desc: "Mon - Fri From 9am to 5pm",
            address: "+91 9303311160",
        }
    ];
    console.log("printing", contactPageData);
    return (
        <div className=" bg-richblack-900">
            {/* section 1 */}
            <section className="mb-20">
                <div className=" mx-auto mt-20 flex w-10/12 max-w-[1160px] flex-col justify-between gap-10 text-richblack-5 lg:flex-row">
                    {/* left Part */}
                    <div className="lg:w-[40%] rounded-2xl bg-richblack-800 p-6 h-min">
                        {
                            contactPageData.map(
                                (element, index) => (
                                    <div key={index} className="flex flex-row gap-4 p-4">
                                        <div className="text-xl">
                                            {element.logo}
                                        </div>
                                        <div className="flex flex-col">
                                            <h2 className="text-lg font-semibold">
                                                {element.title}
                                            </h2>
                                            <p className=" font-mediumb text-richblack-300">
                                                {element.desc}
                                            </p>
                                            <p className="font-semibold text-richblack-200">
                                                {element.address}
                                            </p>
                                        </div>

                                    </div>
                                )
                            )
                        }
                    </div>
                    {/* Right Part */}
                    <div className=" lg:w-[50%]">
                        <div className=" border border-richblack-600 text-richblack-200 rounded-2xl p-7 lg:-14 flex flex-col gap-3">
                            <h2 className="text-4xl leading-10 font-semibold text-richblack-5">
                                Got a Idea? We’ve got the skills. Let’s team up
                            </h2>
                            <p>
                                Tall us more about yourself and what you’re got in mind.
                            </p>
                            <div className="mt-7">
                                <ContactUsForm />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/* section 2 */}
            <div className="mb-6 mt-10">
                <h2 className="text-center text-richblack-5 text-4xl font-semibold">Reviews from other learners</h2>
                <ReviewComponent />
            </div>
            {/* Footer Section */}
            <Footer />
        </div>
    );
}

export default ContactUsPage;