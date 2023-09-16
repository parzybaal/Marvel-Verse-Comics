import axios from "axios";

const URL = "localhost:4000/backend"

const http = axios.create({
    baseURL: URL,
    headers: {
        'Content-Type': 'application/json',
    }
})

http.interceptors.request.use(function(config){
    const persistLocal = localStorage.getItem("persist:root")
    const token = null
    if (token) config.headers = {...config, Authorization: `Bearer ${persistLocal}`}
    return config
}, function(error){
    return Promise.reject(error)
})

export const httpRequest = {
    get : async url => await http.get(url),
}
