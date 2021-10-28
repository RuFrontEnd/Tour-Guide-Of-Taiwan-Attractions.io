import axios from "axios";

export const setAxiosDefaultURL = (url) => (axios.defaults.baseURL = url);
