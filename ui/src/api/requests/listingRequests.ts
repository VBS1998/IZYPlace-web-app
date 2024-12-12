import { axiosClient, imagesUrl } from "@/api/axios";
import { handleResponse } from "@/api/handlers";
import { ListingRequest } from "@/api/models/listingRequest";
import { routes } from "@/api/routes";

const renameImageUrl = (request : ListingRequest) => {
    request.listing.imageUrl = request.listing.imageUrl.map((url) => imagesUrl + url)
    return request
}

export const getRequests = async () => {
    const query = routes.REQUESTS_ROUTE;

    return await axiosClient
        .get(query)
        .then(handleResponse<ListingRequest[]>)
        .then(requests => requests.map(renameImageUrl))
}

export const getRequest = async (id : string) => {
    const query = routes.REQUESTS_ROUTE +'/'+id;

    return await axiosClient
        .get(query)
        .then(handleResponse<ListingRequest>)
        .then(renameImageUrl)
}

export const getRequestsWithStatus = async (status : number) => {
    const query = routes.REQUESTS_ROUTE+'?'+status;

    return await axiosClient
        .get(query)
        .then(handleResponse<ListingRequest[]>)
        .then(requests => requests.map(renameImageUrl))
}

export const addRequest = async (request : Partial<ListingRequest>) => {
    const query = routes.REQUESTS_ROUTE;

    return await axiosClient
        .post(query, request)
        .then(handleResponse<string>)
}