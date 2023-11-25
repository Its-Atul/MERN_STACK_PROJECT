import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from "swiper/modules"
import { DisplayCourseCard } from './DisplayCourseCard';

export const CourseSlider = ({courses}) => {
  return (
    <div>
      <Swiper 
        slidesPerView={3}
        spaceBetween={50}
        loop={true}
        breakpoints={{
          1024:{
            slidesPerView: 3
          }
        }}
        pagination={{
          dynamicBullets: true,
        }}
        modules={[Pagination]}
        className="mySwiper"
      >
        {
          courses?.map((course, index) => (
            <SwiperSlide key={index}>
              <DisplayCourseCard course={course} Height={"h-[250px]"}/>
            </SwiperSlide>
          ))
        }
      </Swiper>
    </div>
  )
}
