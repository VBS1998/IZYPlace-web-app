import { axiosClient, imagesUrl } from "@/api/axios";
import { handleResponse } from "../handlers";
import { Listing } from "../models/listing";

const renameImageUrl = (listing : Listing) => {
    listing.imageUrl = listing.imageUrl.map((url) => imagesUrl + url)
    return listing
}

export const getListings = async () => {
    const query = '/listings';

    return await axiosClient
        .get(query)
        .then(handleResponse<Listing[]>)
        .then(listings => listings.map(renameImageUrl))
}

export const getListing = async (id : string) => {
    const query = '/listings/'+id;

    return await axiosClient
        .get(query)
        .then(handleResponse<Listing>)
        .then(renameImageUrl)
}