import React from "react";
import { toast } from "react-hot-toast";
import { apiConnector } from "../apiConnector";
import { catalogData } from "../apis";


export const getCategoryPageDetails = async(categoryId) => {
    const toastId = toast.loading("Loading");
    let result = [];
    try {
        const response = await apiConnector("POST", catalogData.CATALOGPAGEDATA_API , {categoryId: categoryId});

        // the api call response 
        console.log("CATALOG API RESPONSE", response);
        result = response?.data;
    } catch (error) {
        console.log("CATALOG API ERROR", error);
        toast.error(error.message);
        result = error.response?.data;
    }

    toast.dismiss(toastId);
    return result;
}