import React from "react";
import { useDispatch, useSelector } from "react-redux";
import ReactStars from "react-rating-stars-component";
import { ImStarEmpty, ImStarHalf, ImStarFull } from "react-icons/im";
import { RiDeleteBin5Line } from "react-icons/ri";
import { removeFromCart } from "../../../../slices/cartSlice";
const RenderCartCourses = () => {

    const { cart } = useSelector((state) => state.cart);
    const dispatch = useDispatch();

    // calculate average rating of the the course
    // let TotalRating = 0;
    // courseDetails.ratingAndReview.forEach((ratAndR) => {
    //     TotalRating += ratAndR.rating;
    // })

    // numberOfReview = courseDetails.ratingAndReview.length;

    // const averageRating = TotalRating / numberOfReview;
    
    return (
        <div className="flex flex-1 flex-col">
            {
                cart.map((course, index) => {
                    return (
                        <div key={index} className={`flex w-full flex-wrap items-center justify-between gap-6 ${cart.lenght === 0 ? "mt-6" : "border-b border-richblack-400 pb-6"}`}>
                            <div className="flex flex-1 flex-col xl:flex-row gap-4 mt-4">
                                <img src={course.thumbnail} alt="thumbnail" className="h-[148px] w-[220px] rounded-lg object-cover" />
                                <div className="flex flex-col space-y-1">
                                    <h2 className="text-lg font-medium text-richblack-5">
                                        {course.courseName}
                                    </h2>
                                    <p className="text-sm text-richblack-300">
                                        {course?.category?.name}
                                    </p>
                                    <div className="flex items-center gap-2">
                                        <span className="text-yellow-50">4.5</span>
                                        <ReactStars
                                            count={5}
                                            size={20}
                                            edit={false}
                                            value={4.5}
                                            a11y={true}
                                            half={true}
                                            activeColor="#ffd700"
                                            emptyIcon={<ImStarEmpty />}
                                            halfIcon={<ImStarHalf />}
                                            filledIcon={<ImStarFull />}
                                        />
                                        <span className=" text-richblack-400">{course?.ratingAndReviews?.lenght} Ratings</span>
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-col items-end space-y-2 mt-4 mr-6">
                                <button onClick={() => dispatch(removeFromCart(course._id))}
                                    className="flex items-center gap-x-1 rounded-md border border-richblack-600 bg-richblack-700 py-3 px-[12px] text-pink-200"
                                >
                                    <RiDeleteBin5Line />
                                    <span>Remove</span>
                                </button>
                                <div className="mb-6 text-3xl font-medium text-yellow-100">
                                    Rs. {course?.price}
                                </div>
                            </div>
                        </div>
                    )
                })
            }
        </div>
    );
}

export default RenderCartCourses;