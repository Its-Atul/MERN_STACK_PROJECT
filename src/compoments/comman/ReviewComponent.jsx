import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react'
import { apiConnector } from "../../services/apiConnector";
import { ratingEndpoints } from '../../services/apis';
import ReactStars from "react-rating-stars-component"
import { FaStar } from 'react-icons/fa';
import { Swiper, SwiperSlide } from 'swiper/react';
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";

// import required modules
import { EffectCoverflow, Pagination } from "swiper/modules";

export const ReviewComponent = () => {

    const [review, setReview] = useState([]);
    const trauncateWords = 15;

    useEffect(() => {
        const allReviews = async () => {
            const { data } = await apiConnector("GET", ratingEndpoints.REVIEWS_DETAILS_API);
            console.log("The Response of ALL rEVIEWA", data);

            if (data?.success) {
                setReview(data?.data);
            }
        }
        allReviews();
    }, [])

    console.log("The review ", review);
    return (
        <div className='my-[50px] max-w-maxContentTab lg:max-w-maxContent'>
            <Swiper
                effect={"coverflow"}
                grabCursor={true}
                centeredSlides={true}
                slidesPerView={4}
                loop={true}
                coverflowEffect={{
                  rotate: 50,
                  stretch: 0,
                  depth: 100,
                  modifier: 1,
                  slideShadows: true
                }}
                autoplay={{
                    delay: 2000,
                    disableOnInteraction: false,
                }}
                pagination={true}
                modules={[EffectCoverflow, Pagination]}
                className="mySwiper"
            >
                {
                    review.map((rev, i) => {
                        return (
                            <SwiperSlide className='' key={i}>
                                <div className='flex flex-col gap-3 bg-richblack-800 p-5 text-[14px] text-richblack-25 w-[300px] h-[190px] rounded-xl'>
                                    <div className='flex items-center gap-x-4'>
                                        <img src={rev?.user?.image ? rev?.user?.image : `https://api.dicebear.com/5.x/initials/svg?seed=${rev?.user?.firstName} ${rev?.user?.lastName}`} alt="Profile" className="h-9 w-9 rounded-full object-cover" />
                                        <div className='flex flex-col'>
                                            <p className='font-semibold text-richblack-5'>{rev?.user?.firstName} {rev?.user?.lastName}</p>
                                            <p className=' text-sm font-medium text-richblack-300'>{rev?.course?.courseName}</p>
                                        </div>
                                    </div>
                                    <p className=' font-medium text-richblack-50 ml-2'>{rev?.review.split(" ").slice(0, trauncateWords).join(" ")}</p>
                                    <div className='flex items-center gap-2 ml-2'>
                                        <p className='font-semibold text-yellow-100'>{rev.rating.toFixed(1)}</p>
                                        <ReactStars
                                            count={5}
                                            value={rev.rating}
                                            size={20}
                                            edit={false}
                                            activeColor="#ffd700"
                                            emptyIcon={<FaStar />}
                                            fullIcon={<FaStar />}
                                        />
                                    </div>
                                </div>
                            </SwiperSlide>
                        )
                    })
                }
            </Swiper>
        </div>
    )
}
