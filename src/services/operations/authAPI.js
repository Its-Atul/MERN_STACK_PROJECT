import { toast } from "react-hot-toast";
import { endpoints } from "../apis";
import { setLoading, setToken } from "../../slices/authSlice";
import { setUser } from "../../slices/profileSlice";
import { resetCart } from "../../slices/cartSlice"
import { apiConnector } from "../apiConnector";

const {
    SENDOTP_API,
    SIGNUP_API,
    LOGIN_API,
    RESETPASSWORDTOKEN_API,
    RESETPASSWORD_API,
} = endpoints

export function sendOTP(email, navigate) {
    return async (dispatch) => {
        const toastId = toast.loading("Loading...");
        dispatch(setLoading(true))
        try {
            const result = await apiConnector("POST", SENDOTP_API, {
                email,
                checkExistingUser: true,
            })
            console.log("SENDOTP api result", result)
            console.log(result.data.success)

            if (!result.data.success) {
                throw new Error(result.data.message)
            }

            toast.success("OTP sent Successfull");
            navigate("/verify-email");
        } catch (error) {
            console.error("send opt error", error);
            toast.error("not able to send OTP");
        }
        dispatch(setLoading(false));
        toast.dismiss(toastId);
    }
}

export function signUp(
    accountType,
    firstName,
    lastName,
    email,
    password,
    confirmPassword,
    otp,
    navigate
) {
    return async (dispatch) => {
        const toastId = toast.loading("Loading...")
        dispatch(setLoading(true));
        try {
            const result = await apiConnector("POST", SIGNUP_API, {
                accountType,
                firstName,
                lastName,
                email,
                password,
                confirmPassword,
                otp,
            })

            console.log("signup response", result);

            if (!result.data.success) {
                throw new Error(result.data.message)
            }
            toast.success("SignUp successful");
            navigate("/login");
        } catch (error) {
            console.log("SIGNUP API ERROR............", error)
            toast.error("Signup Failed")
            navigate("/signup")
        }
        dispatch(setLoading(false));
        toast.dismiss(toastId);
    }
}

export function login(email, password, navigate) {
    return async (dispatch) => {
        const toastId = toast.loading("Loading...");
        dispatch(setLoading(true))
        try {
            const result = await apiConnector("POST", LOGIN_API, {
                email,
                password,
            });

            console.log("login api result", result);

            if (!result.data.success) {
                throw new Error(result.data.message)
            }

            toast.success("Login Successful");
            dispatch(setToken(result.data.token));
            const userImage = result.data?.user?.image ? result.data.user.image : `https://api.dicebear.com/5.x/initials/svg?seed=${result.data.user.firstName} ${result.data.user.lastName}`
            dispatch(setUser({ ...result.data.user, image: userImage }))
            localStorage.setItem("token", JSON.stringify(result.data.token))
            localStorage.setItem("user", JSON.stringify(result.data.user))
            console.log("printing set User: ", result);
            navigate("/dashboard/my-profile");
        } catch (error) {
            console.log("LOGIN API ERROR............", error)
            toast.error("Wrong Credentails")
        }
        dispatch(setLoading(false));
        toast.dismiss(toastId);
    }
}
// logout function
export function logout(navigate) {
    return (dispatch) => {
        dispatch(setToken(null))
        dispatch(setUser(null))
        dispatch(resetCart())
        localStorage.removeItem("token")
        localStorage.removeItem("user")
        toast.success("Logged Out")
        navigate("/")
    }
}

// function for forgot password
export function resetPasswordToken(email, setEmailSent) {
    return async (dispatch) => {
        const toastId = toast.loading("Loading...");
        dispatch(setLoading(true))
        try {
            const result = await apiConnector("POST", RESETPASSWORDTOKEN_API, {
                email,
            })

            console.log("Reset password token response", result);
            if (!result.data.success) {
                throw new Error(result.data.message)
            }
            toast.success("Reset Email Sent");
            setEmailSent(true);
        } catch (error) {
            console.error("Error in reset Password token", error);
            toast.error("Email not found");
        }
        dispatch(setLoading(false));
        toast.dismiss(toastId);
    }
}

// update password

export function resetPassword(password, confirmPassword, token, navigate) {
    return async (dispatch) => {
        dispatch(setLoading(true));
        try {
            const result = await apiConnector("POST", RESETPASSWORD_API, {
                password, confirmPassword, token
            });

            console.log("Printing the result of Resetpassword Api", result);
            if (!result.data.success) {
                throw new Error(result.data.message)
            }
            toast.success("Password has been reset successfully");
            navigate("/login");
        } catch (error) {
            console.error("Reset password api error", error);
            toast.error("Unable to reset Password");
        }
        dispatch(setLoading(false));
    }

}