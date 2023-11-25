import React, { useEffect, useState } from 'react'
import { BsStarFill, BsStar, BsStarHalf } from "react-icons/bs";

export const RatingStars = ({Review_count, star_Size}) => {

    // state variable for rating and review 
    const [starCount, setStarCount] = useState({
        empty: 0,
        half: 0,
        full: 0,
    });

    useEffect(() => {
        const wholeStar = Math.floor(Review_count) || 0;
        setStarCount({
            full: wholeStar,
            half: Number.isInteger(Review_count) ? 0 : 1,
            empty: Number.isInteger(Review_count) ? 5 - wholeStar : 4- wholeStar,
        })
    },[Review_count])
  return (
    <div className='flex gap-1 text-yellow-25'>
        {[...new Array(starCount.full)].map((_,i) => {
            return(
                <BsStarFill key={i} size={star_Size || 20}/>
            )
        })}
        {[...new Array(starCount.half)].map((_,i) => {
            return(
                <BsStarHalf key={i} size={star_Size || 20}/>
            )
        })}
        {[...new Array(starCount.empty)].map((_,i) => {
            return(
                <BsStar key={i} size={star_Size || 20}/>
            )
        })}
    </div>
  )
}
