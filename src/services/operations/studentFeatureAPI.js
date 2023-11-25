import { toast } from "react-hot-toast";
import { apiConnector } from "../apiConnector";
import rzpLogo from "../../assets/Logo/rzpLogo.webp";
import { setPaymentLoading } from "../../slices/courseSlice"
import { resetCart } from "../../slices/cartSlice";
import { logout } from "./authAPI";


const { studentEndpoints } = require("../apis");

const {
    COURSE_PAYMENT_API,
    COURSE_VERIFY_API,
    SEND_PAYMENT_SUCCESS_EMAIL_API
} = studentEndpoints;


// first thing is to load the razorpay script 
function loadScript(src) {
    return new Promise((resolve) => {
        const script = document.createElement("script");
        script.src = src;

        script.onload = () => {
            resolve(true);
        }

        script.onerror = () => {
            resolve(false)
        }
        document.body.appendChild(script);
    })
}

// now have to buy the course 
export async function buyCourse(token, courses, userDetails, navigate, dispatch) {
    const toastId = toast.loading("Loading.....");
    try {
        // fisrtly load the script by using the above loadScript function
        const response = await loadScript("https://checkout.razorpay.com/v1/checkout.js");
        console.log("The response of loadScript", response);
        if (!response) {
            toast.error("Razorpay SDK failed to load. Check Your internet Connection")
            return;
        }

        // Initialize the Order in Backend
        const orderResponse = await apiConnector("POST", COURSE_PAYMENT_API, { courses }, {
            Authorization: `Bearer ${token}`,
        })
        console.log("Te capture Payment API response", orderResponse);

        if(!orderResponse.data.success) {
            toast.error(orderResponse.data.message);
            throw new Error(orderResponse.data.error);
        }
        // create the options
        const options = {
            key: process.env.RAZORPAY_KEY,
            currency: orderResponse.data.data.currency,
            amount: `${orderResponse.data.data.amount}`,
            order_id: orderResponse.data.data.id,
            name: "Study_Notion",
            description: "Thank you for Purchasing the Course",
            image: rzpLogo,
            prefill: {
                name: `${userDetails.firstName} ${userDetails.lastName}`,
                email: userDetails.email,
            },
            handler: function (response) {
                // send Successfull mail
                sendPaymentSuccessEmail(response, orderResponse.data.data.amount, token)
                // verify the payment
                verifyPayment({ ...response, courses }, token, navigate, dispatch)
            }
        }

        // open the dialog box of razorpay 
        const paymentObject = new window.Razorpay(options);

        // to open the dialog box we use open function
        paymentObject.open();
        paymentObject.on("payment.failed", function (response) {
            toast.error("Oops! Payment Failed");
            console.log(response.error);
        })

    } catch (error) {
        console.log("ERROR IN PAYMENT API", error);
        if (error.response?.request?.status === 401) {
            // toast.error("Session Timeout");
            alert("Session Timeout ! Please login again");
            dispatch(logout(navigate));
        } else {
            toast.error(" Couldn't make payment");
        }
    }

    toast.dismiss(toastId);
}

// send Payment successfull mail
async function sendPaymentSuccessEmail(response, amount, token) {
    try {
        await apiConnector("POST", SEND_PAYMENT_SUCCESS_EMAIL_API, {
            orderId: response.razorpay_order_id,
            paymentId: response.razorpay_payment_id,
            amount,
        }, {
            Authorization: `Bearer ${token}`,
        })
    } catch (error) {
        console.log("ERROR IN SENDING MAIL", error);
    }
}

// verify Payment  operation
async function verifyPayment(bodyData, token, navigate, dispatch) {
    const toastId = toast.loading("Verfying Payment");
    dispatch(setPaymentLoading(true))
    try {
        const res = await apiConnector("POST", COURSE_VERIFY_API, bodyData, {
            Authorization: `Bearer ${token}`,
        })

        console.log("VERIFY PAYMENT RESPONSE FROM BACKEND............", res);

        if (!res.data.success) {
            throw new Error(res.data.message);
        }

        toast.success("Payment Successful. You are Added to the course ")
        navigate("/dashboard/enrolled-courses")
        dispatch(resetCart());
    } catch (error) {
        console.log("PAYMENT VERIFY ERROR............", error)
        toast.error("Could Not Verify Payment.")
    }
    toast.dismiss(toastId);
    dispatch(setPaymentLoading(false));
}