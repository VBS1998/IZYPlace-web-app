import { axiosClient } from "@/app/api/axios";
import { handleResponse } from "../handlers";

export const getHello = async () => {
    const query = '/hello';

    return await axiosClient
        .get(query)
        .then(handleResponse)
        
}