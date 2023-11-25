import { toast } from "react-hot-toast";
import { courseEndpoints } from "../apis";
import { apiConnector } from "../apiConnector";
import { logout } from "./authAPI";

const {
    COURSE_DETAILS_API,
    GET_ALL_COURSE_API,
    EDIT_COURSE_API,
    COURSE_CATEGORIES_API,
    CREATE_COURSE_API,
    CREATE_SECTION_API,
    CREATE_SUBSECTION_API,
    UPDATE_SECTION_API,
    UPDATE_SUBSECTION_API,
    GET_ALL_INSTRUCTOR_COURSES_API,
    DELETE_SECTION_API,
    DELETE_SUBSECTION_API,
    DELETE_COURSE_API,
    DELETE_ALL_COURSES_API,
    GET_FULL_COURSE_DETAILS_AUTHENTICATED,
    LECTURE_COMPLETION_API,
    CREATE_RATING_API
} = courseEndpoints;


// get ALL courses
export const getAllCourses = async () => {
    const toastId = toast.loading("Loading...");
    let result = [];
    try {
        const response = await apiConnector("GET", GET_ALL_COURSE_API)
        if (!response.data.success) {
            throw new Error("Could Not fetch all Courses");
        }

        result = response.data.success;
    } catch (error) {
        console.error("Error in fetching All courses", error);
        toast.error(error.message);
    }
    toast.dismiss(toastId);
    return result;
}

// get the course Details
export const fetchCourseDetails = async (courseId) => {
    const toastId = toast.loading("Loading...");
    let result = null;
    try {
        const response = await apiConnector("POST", COURSE_DETAILS_API, {
            courseId,
        })
        console.log("COURSE DETAIL API RESPONSE .....", response);
        if (!response.data.success) {
            throw new Error(response.data.message)
        }
        result = response?.data?.data;
    } catch (error) {
        console.log("COURSE_DETAILS_API API ERROR............", error)
        result = error.response.data
        toast.error("No Course Found");
    }
    toast.dismiss(toastId);
    return result;
}

// get the course Categories
export const fetchCourseCategories = async () => {
    let result = [];
    try {
        const response = await apiConnector("GET", COURSE_CATEGORIES_API)
        console.log("COURSE_CATEGORIES_API API RESPONSE............", response);
        if (!response.data.success) {
            throw new Error(response.data.message)
        }
        result = response?.data?.allCategory;
    } catch (error) {
        console.log("COURSE_CATEGORY_API API ERROR............", error)
        toast.error(error.message)
    }
    return result;
};

// add course api 
export const addcourseDetails = async (token, data, dispatch, navigate) => {
    let result = null;
    const toastId = toast.loading("Loading....");
    console.log("The data of Course", data);
    try {
        const response = await apiConnector("POST", CREATE_COURSE_API, data, {
            "content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
        });

        console.log("Create course Api response", response);
        if (!response?.data?.success) {
            throw new Error(response.data.message)
        }

        toast.success("Course Details Added Successfully");
        result = response?.data?.data;
    } catch (error) {
        console.error("Error in creation of course", error);
        if (error.response?.request?.status === 401) {
            // toast.error("Session Timeout");
            alert("Session Timeout ! Please login again");
            dispatch(logout(navigate));
        } else {
            toast.error(error.message);
        }
    }
    toast.dismiss(toastId);
    return result;
}

// Edit course details
export const editCourseDetails = async (data, token, dispatch, navigate) => {
    let result = null;
    const toastId = toast.loading("Loading..");
    try {
        const response = await apiConnector("POST", EDIT_COURSE_API, data, {
            "content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
        });

        // edit course api response 
        console.log("Edit course api response", response);

        toast.success("Edit course Successfull");
        result = response?.data?.data;
    } catch (error) {
        console.log("Edit course error ...", error);
        if (error.response?.request?.status === 401) {
            // toast.error("Session Timeout");
            alert("Session Timeout ! Please login again");
            dispatch(logout(navigate));
        } else {
            toast.error(error.message);
        }
    }
    toast.dismiss(toastId);
    return result;
}

// create section operation 
export const createSection = async (data, token) => {
    let result = null;
    const toastId = toast.loading("Loading...");
    try {
        const response = await apiConnector("POST", CREATE_SECTION_API, data, {
            Authorization: `Bearer ${token}`,
        });

        console.log("Creact Section api response", response);
        if (!response?.data?.success) {
            throw new Error(response.data.message)
        }

        toast.success("Course Section Created");
        result = response?.data?.updatedCourseDetails
    } catch (error) {
        console.error("Create Section error", error);
        toast.error(error.message);
    }
    toast.dismiss(toastId);
    return result;
}

// create SubSection
export const createSubSection = async (data, token) => {
    let result = null;
    const toastId = toast.loading("Loading...");
    try {
        console.log("The data that is gona pass", data);
        const response = await apiConnector("POST", CREATE_SUBSECTION_API, data, {
            Authorization: `Bearer ${token}`,
        });
        console.log("Thec create subSection", response);
        if (!response.data.success) {
            throw new Error("Could not create lecture");
        }

        toast.success("Lecture Added");
        result = response?.data?.data;
    } catch (error) {
        console.error("Error in creation of Lecture", error);
        toast.error(error.message);
    }
    toast.dismiss(toastId);
    return result;
}

// Update Sectio operation function
export const updateSection = async (data, token) => {
    let result = null
    const toastId = toast.loading(true);
    try {
        const response = await apiConnector("POST", UPDATE_SECTION_API, data, {
            Authorization: `Bearer ${token}`,
        })
        console.log("UPDATE SECTION API RESPONSE............", response)
        if (!response?.data?.success) {
            throw new Error("Could Not Update Section")
        }
        toast.success("Course Section Updated Successfully");
        result = response?.data?.data;
    } catch (error) {
        console.log("Update Section APi", error);
        toast.error(error.message);
    }

    toast.dismiss(toastId);
    return result;
}

// update section APi
export const updateSubSection = async (data, token) => {
    let result = null;
    const toastId = toast.loading("Loading...");
    try {
        const response = await apiConnector("POST", UPDATE_SUBSECTION_API, data, {
            Authorization: `Bearer ${token}`,
        })

        console.log("Update SubSection api response......", response);
        if (!response?.data?.success) {
            throw new Error("Could Not Update Lecture");
        }

        toast.success("Lecture Updated");
        result = response?.data?.data;
    } catch (error) {
        console.error("Error in update subsection api", error);
        toast.error("Could not update lecture")
    }
    toast.dismiss(toastId);
    return result;
}

// delete a section
export const deleteSection = async (data, token) => {
    let result = null;
    const toastId = toast.loading("Loading...");
    try {
        const response = await apiConnector("POST", DELETE_SECTION_API, data, {
            Authorization: `Bearer ${token}`,
        })
        console.log("The delete Section API response", response);
        if (!response.data.success) {
            throw new Error("Couldn't Delete Section");
        }
        toast.success("Section Deleted Successfully");
        result = response?.data?.data
    } catch (error) {
        console.error("Error in Delete Sectio api", error);
        toast.error(error.message);
    }

    toast.dismiss(toastId);
    return result;
}

// deleteSubSection
export const deleteSubSection = async (data, token) => {
    let result = null;
    const toastId = toast.loading("Loading...");
    try {
        const response = await apiConnector("POST", DELETE_SUBSECTION_API, data, {
            Authorization: `Bearer ${token}`,
        })
        console.log("The delete subSection API response", response);
        if (!response.data.success) {
            throw new Error("Couldn't Delete Lecture");
        }
        toast.success("Lecture Deleted Successfully");
        result = response?.data?.data;
    } catch (error) {
        console.error("Error in Delete subSection api", error);
        toast.error(error.message);
    }

    toast.dismiss(toastId);
    return result;
}

// fetch instructor courses
export const fetchInstructorCourses = async (token, dispatch, navigate) => {
    const toastId = toast.loading("Loading....");
    let result = [];
    try {
        const response = await apiConnector("GET", GET_ALL_INSTRUCTOR_COURSES_API, null, {
            Authorization: `Bearer ${token}`,
        });

        console.log("The fetch instructor api response ", response);

        if (!response.data.success) {
            throw new Error("Couldn't fetch instructor courses");
        }
        result = response?.data?.data;

    } catch (error) {
        console.log("COULDDN'T FETCH INSTRUCTOR COURSES", error);
        if (error.response?.request?.status === 401) {
            // toast.error("Session Timeout");
            alert("Session Timeout ! Please login again");
            dispatch(logout(navigate));
        } else {
            toast.error(error.message);
        }
    }

    toast.dismiss(toastId);
    return result;
}

// delete course 
export const deleteCourse = async (data, token) => {
    const toastId = toast.loading("Loading....");
    try {
        const response = await apiConnector("DELETE", DELETE_COURSE_API, data, {
            Authorization: `Bearer ${token}`,
        });

        console.log("DELETE COURSE API RESPONSE", response);
        if (!response.data.success) {
            throw new Error("Couldn't delete course");
        }
        toast.success("Course Deleted");
    } catch (error) {
        console.log("ERROR IN DELETION OF COURSE", error);
        toast.error(error.message);
    }
    toast.dismiss(toastId);
}

// Delete All courses
export const deleteAllInstructorCourses = async (token) => {
    const toastId = toast.loading("Loading....");
    try {
        const response = await apiConnector("DELETE", DELETE_ALL_COURSES_API, null, {
            Authorization: `Bearer ${token}`,
        });

        console.log("DELETE ALL COURSES API RESPONSE", response);
        toast.success("ALL COURSES DELETED");
    } catch (error) {
        console.log("ERROR IN ALL COURSES DELETION", error);
        toast.error(error.message);
    }
    toast.dismiss(toastId);
}
// get full course Details 
export const getFullDetailCourse = async (courseId, token) => {
    let result = null;
    const toastId = toast.loading("Loading....");

    try {
        const response = await apiConnector("POST", GET_FULL_COURSE_DETAILS_AUTHENTICATED, {
            courseId,
        },
            {
                Authorization: `Bearer ${token}`,
            });

        console.log("GET FULL DETAILS COURSE API RESPONSE ", response);

        // update the result 
        result = response?.data?.data;
    } catch (error) {
        console.log("FULL COURSE AOI ERROR ", error);
        result = error.response.data
    }
    toast.dismiss(toastId);
    return result;
}

// Creat Rating operation
export const createRating = async (data, token) => {
    const toastId = toast.loading("Loaing....");
    let success = false;
    try {
        const res = await apiConnector("POST", CREATE_RATING_API, data, {
            Authorization: `Bearer ${token}`,
        });

        console.log("Create Rating Api res,", res);
        if (!res?.data?.success) {
            throw new Error("Could Not Create Rating")
        }

        toast.success("Thanks for Rating Us");
        success = true
    } catch (error) {
        success = false;
        console.log("CREATE RATING ISSUE", error);
        if(error?.response?.status === 403){
            toast.error("U have Already Rated, Thanks!");
        }else{
            toast.error(error.message);
        }
    }
    toast.dismiss(toastId);
    return success;
}


// mark as Read operation
export const markLectureAsCompleted = async (data, token) => {
    let result = null;
    console.log("The mark as read data", data);
    const toastId = toast.loading("Loading....");

    try {
        // call the api
        const response = await apiConnector("POST", LECTURE_COMPLETION_API, data, {
            Authorization: `Bearer ${token}`,
        });

        console.log("Mark as read api Response", response);
        if (!response.data.message) {
            throw new Error(response.data.error)
        }
        toast.success("Lecture Completed");
        result = true;
    } catch (error) {
        console.log("Mark api Error ", error);
        toast.error(error.message);
        result = false;
    }

    toast.dismiss(toastId);
    return result;
}