import { axiosClient } from "@/app/api/axios";
import { handleResponse } from "../handlers";

export const getListings = async () => {
    const query = '/listings';

    return await axiosClient
        .get(query)
        .then(handleResponse)
        
}

export const getListing = async (id : string) => {
    const query = '/listings/'+id;

    return await axiosClient
        .get(query)
        .then(handleResponse)
        
}