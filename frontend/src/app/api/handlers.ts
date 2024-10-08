import { AxiosResponse } from "axios";

export async function handleResponse<T>(
    response :AxiosResponse<T>
) : Promise<T> {
    if (response && response.status === 200){
        return response.data
    }
    return Promise.reject(response)
}