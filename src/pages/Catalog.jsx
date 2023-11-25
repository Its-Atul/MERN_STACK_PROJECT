import React from 'react'
import Footer from '../compoments/comman/Footer'
import { useParams } from 'react-router-dom'
import { useState } from 'react';
import { useEffect } from 'react';
import { apiConnector } from '../services/apiConnector';
import { categories } from '../services/apis';
import { getCategoryPageDetails } from '../services/operations/categoryPageAPI';
import { CourseSlider } from '../compoments/core/Catalog_Data/CourseSlider';
import { DisplayCourseCard } from '../compoments/core/Catalog_Data/DisplayCourseCard';

export const Catalog = () => {

    const { catalogName } = useParams();
    const [catalogPageData, setCatalogPageData] = useState(null);
    const [categoryId, setCategoryId] = useState("");
    const [active, setActive] = useState(1);

    // Fetch all category 
    useEffect(() => {
        const allCategories = async () => {
            const response = await apiConnector("GET", categories.CATEGORIES_API);
            // to find the current category id that is selected bu use catalogName
            const category_Id = response?.data?.allCategory?.filter((category) => category.name.split(" ").join("-").toLowerCase() === catalogName)[0]._id;
            console.log("The categories apge all categorirs", response);
            console.log("Printing the category id", category_Id);
            // set the category id 
            setCategoryId(category_Id);
        }
        allCategories();
    }, [catalogName]);

    // now finding the category details 
    useEffect(() => {
        const getCategoryDetails = async () => {
            try {
                const result = await getCategoryPageDetails(categoryId);
                console.log("Printing the get page details ", result);
                setCatalogPageData(result);
            } catch (error) {
                console.log("Error in get category page details", error);
            }
        }
        if (categoryId) {
            getCategoryDetails();
        }
    }, [categoryId])
    return (
        <div className='text-white font-inter'>
            <div className=" box-content bg-richblack-800 px-4 py-6 mx-auto">
                <div className='flex flex-col min-h-[200px] lg:max-w-maxContent max-w-maxContentTab justify-center gap-4 mx-auto'>
                    {/* /location */}
                    <p className='text-sm text-richblack-200'>
                    {`Home / Catalog / `}<span className=' text-yellow-50'>
                        {catalogPageData?.data?.selectedCategory?.name}
                        </span>
                    </p>

                    {/* name */}
                    <p className='text-3xl text-richblack-5 font-semibold'>{catalogPageData?.data?.selectedCategory?.name}</p>

                    {/* description */}
                    <p className='max-w-[800px] text-richblack-200'>{catalogPageData?.data?.selectedCategory?.description}</p>
                </div>
            </div>

            {/* course to be brougth  */}
            <div className=' box-content mx-auto max-w-maxContentTab lg:max-w-maxContent w-full'>
                {/* section 1 */}
                <div className='px-4 py-12'>
                    <h2 className='text-3xl text-richblack-5 font-semibold mt-2 mb-4'>Courses to get you Started</h2>
                    <div className='flex gap-3 my-4 border-b border-richblack-600 text-sm items-center'>
                        <p className={`px-4 py-2 ${ active === 1 ? "border-b border-yellow-25 text-yellow-25" : "text-richblack-50"} cursor-pointer bg-richblack-700 rounded-lg`}
                            onClick={() => setActive(1)}
                        >Most Popular</p>
                        <p className={`px-4 py-2 ${ active === 2 ? "border-b border-yellow-25 text-yellow-25" : "text-richblack-50"} cursor-pointer bg-richblack-700 rounded-lg`}
                            onClick={() => setActive(2)}
                        >New Courses</p>
                    </div>

                    {/* a component to show the courses */}
                    <div>
                        {
                            catalogPageData?.data?.selectedCategory?.courses?.length === 0 ? (
                                <div className='flex justify-center items-center text-xl font-semibold'>
                                    No Course Found
                                </div>
                            ) : (
                                <CourseSlider courses={catalogPageData?.data?.selectedCategory?.courses} />
                            )
                        }
                    </div>
                </div>
                {/* section 2 */}
                <div className='px-4 py-12'>
                    <p className='text-3xl text-richblack-5 font-semibold mt-2 mb-4'>Top Courses in Different Category</p>
                    <div>
                        {/* <CourseSlider courses={catalogPageData?.data?.differenetCategories?.courses}/> */}
                        {
                            catalogPageData?.data?.differenetCategories?.courses?.length === 0 ? (
                                <div className='flex justify-center items-center text-xl font-semibold'>
                                    No course Found
                                </div>
                            ) : (
                                <CourseSlider courses={catalogPageData?.data?.differenetCategories?.courses} />
                            )
                        }
                    </div>
                </div>

                {/* section 3 */}
                <div className='px-4 py-12'>
                    <p className='text-3xl text-richblack-5 font-semibold mt-2 mb-4'>Frequently Bought courses</p>
                    {/* insert the data of courses */}
                    <div>
                        <div className='grid grid-cols-1 gap-6 lg:grid-cols-3'>
                            {
                                catalogPageData?.data?.allCourses?.slice(0, 10).map((course, index) => {
                                    return (
                                        <div>
                                            <DisplayCourseCard key={index} course={course} Height={"h-[300px]"}/>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}
