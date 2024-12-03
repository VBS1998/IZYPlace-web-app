import { axiosClient, imagesUrl } from "@/api/axios";
import { handleResponse } from "@/api/handlers";
import { ListingRequest } from "@/api/models/listingRequest";
import { routes } from "@/api/routes";

export const getRequests = async () => {
    const query = routes.REQUESTS_ROUTE;

    return await axiosClient
        .get(query)
        .then(handleResponse<ListingRequest[]>)
}

export const getRequest = async (id : string) => {
    const query = routes.REQUESTS_ROUTE +'/'+id;

    return await axiosClient
        .get(query)
        .then(handleResponse<ListingRequest>)
}

export const getRequestsWithStatus = async (status : number) => {
    const query = routes.REQUESTS_ROUTE+'?'+status;

    return await axiosClient
        .get(query)
        .then(handleResponse<ListingRequest>)
}

export const addRequest = async (request : ListingRequest) => {
    const query = routes.REQUESTS_ROUTE;

    return await axiosClient
        .post(query, request)
        .then(handleResponse<string>)
}