import { axiosClient } from "@/api/axios";
import { handleResponse } from "../handlers";
import { Listing } from "../models/listing";

export const getListings = async () => {
    const query = '/listings';

    return await axiosClient
        .get(query)
        .then(handleResponse<Listing[]>)
        
}

export const getListing = async (id : string) => {
    const query = '/listings/'+id;

    return await axiosClient
        .get(query)
        .then(handleResponse<Listing>)
        
}