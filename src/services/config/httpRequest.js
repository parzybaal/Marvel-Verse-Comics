import axios from "axios";

const URL = "https://gateway.marvel.com:443/v1/public"

const http = axios.create({
    baseURL: URL,
    headers: {
        'Content-Type': 'application/json',
    }
})

http.interceptors.request.use(function(config){
    /* config.headers = {...config, Authorization: `Bearer ${token}`} */
    return config
}, function(error){
    return Promise.reject(error)
})

export const httpRequest = {
    get : async url => await http.get(url),
}
