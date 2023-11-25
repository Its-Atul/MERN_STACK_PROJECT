import { apiConnector } from "../apiConnector";
import { settingsEndpoints } from "../apis";
import { toast } from "react-hot-toast";
import { setUser } from "../../slices/profileSlice";
import { logout } from "./authAPI";

const {
    UPDATE_DISPLAY_PICTURE_API,
    UPDATE_PROFILE_API,
    CHANGE_PASSWORD_API,
    DELETE_PROFILE_API
} = settingsEndpoints;

export function updateDisplayPicture(token, formData, navigate) {
    return async (dispatch) => {
        const toastId = toast.loading("Uploading...");
        try {
            const response = await apiConnector("PUT", UPDATE_DISPLAY_PICTURE_API, formData,
                {
                    "content-Type": "multipart/form-data",
                    Authorization: `Bearer ${token}`,
                })
            console.log("Printing the response", response);
            if (!response.data.success) {
                throw new Error(response.data.message)
            }
            toast.success("Display Picture Updated Successfully")
            dispatch(setUser(response.data.data))
            // localStorage.setItem("user", JSON.stringify(result.data.data))
        } catch (error) {
            console.error("Error in Update display picture api", error);
            if (error.response?.request?.status === 401) {
                // toast.error("Session Timeout");
                alert("Session Timeout ! Please login again");
                dispatch(logout(navigate));
            } else {
                toast.error("Couldn't Update Display Picture");
            }
        }
        toast.dismiss(toastId);
    }
}

export function updateProfile(token, data, navigate) {
    return async (dispatch) => {
        const toastId = toast.loading("Loading...");
        try {
            const result = await apiConnector("PUT", UPDATE_PROFILE_API, data, {
                Authorization: `Bearer ${token}`,
                // token
            })
            console.log("The update profile response is ", result);
            if (!result.data.success) {
                throw new Error(result.data.message);
            }

            const userImage = result.data.updatedUserDetails.image ? result.data.updatedUserDetails.image : `https://api.dicebear.com/5.x/initials/svg?seed=${result.data.updatedUserDetails.firstName} ${result.data.updatedUserDetails.lastName}`

            dispatch(setUser({ ...result.data.updatedUserDetails, image: userImage }));
            localStorage.setItem("user", JSON.stringify(result.data.updatedUserDetails))
            toast.success("Profile Updated Successfully");
        } catch (error) {
            console.log("UPDATE_PROFILE_API API ERROR............", error)
            if (error.response?.request?.status === 401) {
                // toast.error("Session Timeout");
                alert("Session Timeout ! Please login again");
                dispatch(logout(navigate));
            } else {
                toast.error("Could Not Update Profile")
            }
        }
        toast.dismiss(toastId);
    }
}

export function changepassword(token, data, navigate) {
    return async (dispatch) => {
        const toastId = toast.loading("Loading...")
        try {
            const response = await apiConnector("POST", CHANGE_PASSWORD_API, data, {
                Authorization: `Bearer ${token}`,
            })

            console.log("the api response of change password", response);
            if (!response.data.success) {
                throw new Error(response.data.message)
            }

            toast.success("Your Passwor has been Changed");
        } catch (error) {
            console.log("CHANGE_PASSWORD_API API ERROR............", error);
            if (error.response?.request?.status === 401) {
                // toast.error("Session Timeout");
                alert("Session Timeout ! Please login again");
                dispatch(logout(navigate));
            } else {
                toast.error(error.response.data.message)
            }
        }
        toast.dismiss(toastId);
    }
}

export function deleteProfile(token, navigate) {
    return async (dispatch) => {
        const toastId = toast.loading("Loading...");
        try {
            const response = await apiConnector("DELETE", DELETE_PROFILE_API, null, {
                Authorization: `Bearer ${token}`,
            });
            console.log("Delete api response", response);

            if (!response.data.success) {
                throw new Error(response.data.message)
            }
            toast.success("Account has been Deleted Successfully");
            dispatch(logout(navigate));
        } catch (error) {
            console.log("DELETE_PROFILE_API API ERROR............", error);
            if (error.response?.request?.status === 401) {
                // toast.error("Session Timeout");
                alert("Session Timeout ! Please login again");
                dispatch(logout(navigate));
            } else {
                toast.error("Could Not Delete Profile")
            }
        }
        toast.dismiss(toastId);
    }
}