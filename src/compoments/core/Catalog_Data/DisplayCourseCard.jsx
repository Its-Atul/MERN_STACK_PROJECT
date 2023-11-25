import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import avgRating from '../../../utils/avgRating';
import { RatingStars } from '../../comman/RatingStars';

export const DisplayCourseCard = ({course, Height}) => {

  const [avgReviewCount, setAvgReviewCount] = useState(0);

  useEffect(() =>{
    const count = avgRating(course?.ratingAndReview);
    setAvgReviewCount(count);
  },[course])
  return (
    <div className="border-richblack-600 p-2 bg-richblack-800 rounded-xl">
      <Link to={`/course/${course._id}`}>
        <div>
          <div>
            <img src={course?.thumbnail} 
              alt="course Thumbnail"
              className={ `${Height} w-full rounded-xl object-cover`}
            />
          </div>
          <div className='fkex flex-col gap-2 px-1 py-3'>
            <p className='text-xl text-richblack-5'>
              {course.courseName}
            </p>
            {/* instructor  */}
            <p className='text-base text-richblack-5 mb-1'>
              By: {course?.instructor?.firstName} {course?.instructor?.lastName}
            </p>
            <div className='flex items-center gap-3'>
              <span className='font-bold text-yellow-25'>
                {avgReviewCount || 0}
              </span>
                {/* rating Component */}
              <RatingStars Review_count={avgReviewCount} star_Size={20}/>
              <span className='text-richblack-300'>
                {course?.ratingAndReview?.length} Ratings
              </span>
            </div>
              {/* price */}
              <p className='text-xl text-richblack-5 mt-2'>
                Rs: {course.price} /-
              </p>
            </div>
        </div>
      </Link>
    </div>
  )
}
