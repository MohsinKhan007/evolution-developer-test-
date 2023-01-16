import axios, { AxiosInstance } from "axios"

const API = (portNo: number) => {
    const api: AxiosInstance = axios.create({
        baseURL: `http://localhost:${portNo}`,
        headers: {
            "Content-Type": "application/json",
        },
    })

    return api
}

export default API
