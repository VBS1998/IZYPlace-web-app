import { axiosClient } from "@/api/axios";
import { handleResponse } from "../handlers";

export const postImage = async (image : File) => {
    const query = '/images';

    const formData = new FormData()
    formData.append('myFile', image)

    return await axiosClient
        .postForm(query, formData)
        .then(handleResponse<string>)
}
