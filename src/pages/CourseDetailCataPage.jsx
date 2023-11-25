import React, { useState } from "react";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { fetchCourseDetails } from "../services/operations/courseDetailsAPI";
import { RatingStars } from "../compoments/comman/RatingStars";
import avgRating from "../utils/avgRating";
import { BsInfoCircle, BsGlobe2 } from "react-icons/bs";
import { formatDate } from "../services/formatDate";
import CourseDetailCard from "../compoments/core/Course/CourseDetailCard";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "../compoments/comman/Spinner";
import { addToCart } from "../slices/cartSlice";
import { ACCOUNT_TYPE } from "../utils/constanst";
import ErrorPage from "./Error";
import Footer from "../compoments/comman/Footer";
import ConfirmationModal from "../compoments/comman/ConfirmationModal";
import { buyCourse } from "../services/operations/studentFeatureAPI";
import { CourseSectionDiaplay } from "../compoments/core/Course/CourseSectionDiaplay";

const CourseDetailCataPage = () => {
    // course Id from param 
    const { courseId } = useParams();
    const [catCourse, setCatcourses] = useState(null);
    const { loading } = useSelector((state) => state.profile)
    const { user } = useSelector((state) => state.profile);
    const { token } = useSelector((state) => state.auth);
    const { paymentLoading } = useSelector((state) => state.course);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [confirmationModal, setConfirmationModal] = useState(null);
    // fetch the course Details
    useEffect(() => {
        const getDisplayCourseDetails = async () => {
            try {
                const response = await fetchCourseDetails(courseId);
                console.log("Fetch course Response", response);
                setCatcourses(response);
            } catch (error) {
                console.log("Error in the get course ", error);
            }
        }
        getDisplayCourseDetails();
    }, [courseId]);

    // calculate the avgRatingCount 
    const [avgRatingCount, setAvgRatingCount] = useState(0);

    useEffect(() => {
        const count = avgRating(catCourse?.ratingAndReview);
        setAvgRatingCount(count);
    }, [catCourse]);

    // total number of Lectures
    const [tolalNoOfLectures, setTotalNoOfLecture] = useState(0);

    useEffect(() => {
        let lectures = 0
        catCourse?.courseContent?.forEach((sec) => {
            lectures += sec.subSection.length || 0
        })
        setTotalNoOfLecture(lectures);
    }, [catCourse]);

    // need to handle collapse all section so need to make an array
    const [isActive, setIsActive] = useState([]);

    const handleIsActive = (id) => {
        setIsActive(
            isActive.includes(id) ? isActive.filter((e) => e !== id) : isActive.concat([id])
        );
    }

    // console.log("The is active array", isActive);

    if (loading || !catCourse) {
        return (
            <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
                <Spinner />
            </div>
        )
    }
    // cHECK LATER not workin response chahiye 
    if (!catCourse._id) {
        return (
            <ErrorPage />
        )
    }
    // /to handle add to cart 
    const handleAddToCart = () => {
        if (user && user?.accountType === ACCOUNT_TYPE.INSTRUCTOR) {
            alert("You can't buy course. As you are a INSTRUCTOR");
            return;
        }
        if (token) {
            dispatch(addToCart(catCourse));
            console.log("ADD TO CART is successfull");
            return;
        }
        setConfirmationModal({
            text1: "You are not logged in!",
            text2: "Please login to add To Cart",
            btn1Text: "Login",
            btn2Text: "Cancel",
            btn1Handler: () => navigate("/login"),
            btn2Handler: () => setConfirmationModal(null),
        })
    }
    const handleBuyNow = () => {
        if (token) {
            buyCourse(token, [courseId], user, navigate, dispatch);
            return;
        }
        setConfirmationModal({
            text1: "You are not logged in!",
            text2: "Please login to Buy Course",
            btn1Text: "Login",
            btn2Text: "Cancel",
            btn1Handler: () => navigate("/login"),
            btn2Handler: () => setConfirmationModal(null),
        })
    }

    if (paymentLoading) {
        <Spinner />
    }
    return (
        <div>
            <div className=" w-full bg-richblack-800">
                {/* section 1 */}
                <div className="mx-auto box-content px-4 py-2 lg:w-[1200px] 2xl:relative">
                    <div className="grid place-items-center max-w-maxContent lg:mx-0 min-h-[450px] lg:place-items-start py-8 lg:py-0 ">
                        <div className=" block lg:hidden max-h-[30rem]">
                            <img src={catCourse?.thumbnail}
                                alt="course thumbnail"
                                className=" aspect-auto object-cover w-full md:max-w-[550px] rounded-lg"
                            />
                        </div>
                        <div className="my-5 ml-2 h-full flex flex-col justify-center gap-4 py-5 text-lg text-richblack-5 w-[65%]">
                            <h2 className="text-4xl font-semibold text-richblack-5 ">
                                {catCourse?.courseName}
                            </h2>
                            <p className=" text-richblack-200">
                                {catCourse?.courseDescription}
                            </p>
                            <div className="flex items-center gap-2 text-lg flex-wrap">
                                <span className="text-yellow-50">{avgRatingCount}</span>
                                <RatingStars Review_count={avgRatingCount} star_Size={22} />
                                <span>{`(${catCourse?.ratingAndReview?.length} Reviews)`}</span>
                                <span>{catCourse?.studentsEnrolled?.length} Student Enrolled</span>
                            </div>
                            <p className="text-white font-semibold">
                                <span className="text-yellow-5 font-bold">Created By:</span> {`${catCourse?.instructor?.firstName} ${catCourse?.instructor?.lastName}`}
                            </p>
                            <div className="flex flex-wrap gap-5 text-lg">
                                <p className="flex items-center gap-2">
                                    {" "}
                                    <BsInfoCircle /> Created At: {formatDate(catCourse?.createdAt)}
                                </p>
                                <p className="flex items-center gap-2">
                                    {" "}
                                    <BsGlobe2 /> English
                                </p>
                            </div>
                        </div>
                        <div className="flex w-[80%] mx-auto flex-col gap-4 border-y border-y-richblack-500 py-4 lg:hidden">
                            <p className="space-x-3 pb-4 text-3xl font-semibold text-richblack-5">
                                Rs. {catCourse?.price}
                            </p>
                            <button className="flex flex-row items-center w-[90%] mx-auto justify-center bg-yellow-50 font-inter font-medium border-[1px] border-black hover:scale-105 hover:text-yellow-100 transition-all duration-500 hover:font-semibold text-lg hover:border-yellow-100 hover:border-[1px] py-2 px-1 rounded-lg hover:bg-richblack-800"
                                onClick={handleBuyNow}
                            >
                                BUY NOW
                            </button>
                            <button className="text-lg text-richblack-5 font-semibold" onClick={handleAddToCart}>
                                ADD TO CART
                            </button>
                        </div>
                    </div>
                    {/* /course Card  */}
                    <div className="w-1/3 max-w-[410px] mx-auto hidden min-h-[600px] lg:absolute lg:block right-6 top-20 ">
                        <CourseDetailCard course={catCourse} setConfirmationModal={setConfirmationModal} handleBuyCourse={handleBuyNow} handleAddToCart={handleAddToCart} />
                    </div>
                </div>
            </div>
            <div className="mx-auto box-content px-4 text-start text-richblack-5 lg:w-[1260px]">
                <div className="mx-auto max-w-maxContent lg:mx-0 xl:max-w-[60%]">
                    {/* what u will learn section */}
                    <div className="my-8 border border-richblack-600 p-8">
                        <p className="text-3xl font-semibold">What you'll learn ?</p>
                        <div className="italic mt-3">
                            {catCourse.whatYouWillLearn}
                        </div>
                    </div>

                    {/* Course Section */}
                    <div className="">
                        <div className="flex flex-col gap-3">
                            <p className="text-3xl font-semibold">Course Content</p>
                            <div className="flex flex-wrap w-full justify-between gap-3">
                                <div className="flex gap-2">
                                    <span>
                                        {catCourse?.courseContent.length} {`section(s)`}
                                    </span>
                                    <span>
                                        {tolalNoOfLectures} {`lecture(s)`}
                                    </span>
                                    <span>
                                        {catCourse?.totalCourseDuration}
                                    </span>
                                </div>
                                <div>
                                    <button
                                        className="text-yellow-25"
                                        onClick={() => setIsActive([])}
                                    >
                                        Collapse All Section
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* course SubSection display */}
                        <div className="py-4">
                            {catCourse?.courseContent?.map((sec, index) => (
                                <div>
                                    <CourseSectionDiaplay
                                        sec={sec}
                                        key={index}
                                        isActive={isActive}
                                        handleIsActive={handleIsActive}
                                    />
                                </div>
                            ))}
                        </div>

                        {/* author details */}
                        <div className="mb-12 py-4">
                            <p className="text-[28px] font-semibold">Author</p>
                            <div className="flex items-center gap-4 py-4">
                                <img
                                    src={
                                        catCourse?.instructor.image
                                            ? catCourse?.instructor.image
                                            : `https://api.dicebear.com/5.x/initials/svg?seed=${catCourse?.instructor.firstName} ${catCourse?.instructor.lastName}`
                                    }
                                    alt="Author"
                                    className="h-14 w-14 rounded-full object-cover"
                                />
                                <p className="text-lg">{`${catCourse?.instructor?.firstName} ${catCourse?.instructor?.lastName}`}</p>
                            </div>
                            <p className="text-richblack-50">
                                {catCourse?.instructor?.additionalDetails?.about}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="mt-4">
                <Footer />
            </div>
            {
                confirmationModal && <ConfirmationModal modalData={confirmationModal} />
            }
        </div>
    )
}

export default CourseDetailCataPage;