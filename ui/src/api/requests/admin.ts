import { axiosClient } from "@/api/axios";
import { handleResponse } from "../handlers";

export const makeCall = async (id : string, call : boolean) => {
    const query = '/admin/call/' + id;
    const data = { call : call }

    return await axiosClient
        .post(query, data)
        .then(handleResponse<string>)
}
