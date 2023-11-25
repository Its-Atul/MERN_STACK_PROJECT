import React from 'react'
import IconBtn from '../../comman/iconBtn';
import { GiHeavyArrow } from "react-icons/gi";
import { FaShareSquare } from "react-icons/fa";
import copy from 'copy-to-clipboard';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { ACCOUNT_TYPE } from '../../../utils/constanst';
import { addToCart } from '../../../slices/cartSlice';

const CourseDetailCard = ({ course, setConfirmationModal, handleBuyCourse, handleAddToCart }) => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.profile);
    const { token } = useSelector((state) => state.auth);

    const handleShare = () => {
        copy(window.location.href);
        toast.success("Link Copied");
    }

    // /to handle add to cart 
    // const handleAddToCart = () => {
    //     if (user && user?.accountType === ACCOUNT_TYPE.INSTRUCTOR) {
    //         alert("You can't buy course. As you are a INSTRUCTOR");
    //         return;
    //     }
    //     if (token) {
    //         dispatch(addToCart(course));
    //         console.log("ADD TO CART is successfull");
    //         return;
    //     }
    //     setConfirmationModal({
    //         text1: "You are not logged in!",
    //         text2: "Please login to add To Cart",
    //         btn1Text: "Login",
    //         btn2Text: "Cancel",
    //         btn1Handler: () => navigate("/login"),
    //         btn2Handler: () => setConfirmationModal(null),
    //     })
    // }
    return (
        <div >
            <div className='gap-4 rounded-md bg-richblack-700 p-4 text-richblack-5 flex flex-col'>
                {/* img */}
                <img src={course?.thumbnail}
                    alt="course Thumbnail"
                    className=' aspect-auto object-cover max-h-[300px] min-h-[180px] w-[400px] md:max-w-full rounded-xl'
                />
                {/* Payment and button section */}
                <div className='px-4'>
                    <p className='space-x-3 pb-4 text-3xl font-semibold'>
                        Rs. {course?.price}
                    </p>
                    <div className='flex flex-col gap-4'>
                        <IconBtn
                            customClasses={" w-full justify-center"}
                            onClick={
                                user && course?.studentsEnrolled?.includes(user?._id) ? () => navigate("/dashboard/enrolled-courses") : handleBuyCourse
                            } 
                        >
                            {
                                user && course?.studentsEnrolled.includes(user?._id) ? "GO TO COURSES" : "BUY NOW"
                            }
                        </IconBtn>
                        {
                            (!user || !course?.studentsEnrolled.includes(user?._id)) && (
                                <button
                                    onClick={handleAddToCart}
                                    className=''
                                >
                                    ADD TO CART
                                </button>
                            )
                        }
                    </div>
                </div>
                {/* text */}
                <p className="pb-3 pt-4 text-center text-sm text-richblack-25">
                    30-Day Money-Back Guarantee
                </p>

                {/* course Description  */}
                <div className=''>
                    <h2 className='my-1 text-xl font-semibold '>
                        This Course Includes:
                    </h2>
                    <div className='flex flex-col gap-2 font-bold text-caribbeangreen-200'>
                        {
                            course?.instructions?.map((ins, i) => {
                                return (
                                    <p key={i} className='flex ml-7 items-center relative'>
                                        <GiHeavyArrow size={15} className='absolute top-[8px] -left-6' />
                                        <span>{ins}</span>
                                    </p>
                                )
                            })
                        }
                    </div>
                    <div className='text-center mt-1'>
                        <button className=' flex items-center gap-2 mx-auto py-4'
                            onClick={handleShare}
                        >
                            <FaShareSquare size={15} /> Share
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}


export default CourseDetailCard;