import { httpRequest } from "../config/httpRequest";

const API_KEY ="3b166951e8c3e881a555ccd238922cdf"
const HASH ="9849dab47ac7d53f78d36f944b885fc6"
const TS = "17/09/2023, 15:12:31"
//const TS = new Date().toLocaleString("en-GB", {timeZone: "UTC"});

export const getApiInfo = {
    apiInfo: async () => await httpRequest.get(`/comics?apikey=${API_KEY}&hash=${HASH}&ts=${TS}`),
}

export const getComicById = {
    getById : async (id) => await httpRequest.get(`/comics/${id}?apikey=${API_KEY}&hash=${HASH}&ts=${TS}`)
}