import axios from "axios";
import store from "../store";
import { api } from "../urlConfig";

const token = window.localStorage.getItem("token");

const axiosInstance = axios.create({
    baseURL: api,
    headers: {
        Authorization: token ? `Bearer ${token}` : "",
    },
});

axiosInstance.interceptors.request.use((req) => {
    const { auth } = store.getState();
    if (auth.token) {
        req.headers.Authorization = `Bearer ${auth.token}`;
    }
    return req;
});

export default axiosInstance;
