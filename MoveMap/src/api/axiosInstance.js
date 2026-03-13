import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { requestNewToken } from "./token";
import { triggerLogout } from "./authEvents";

const api = axios.create({
    baseURL: process.env.EXPO_PUBLIC_API_URL,
});

api.interceptors.request.use(async (config) => {
    const token = await AsyncStorage.getItem("accessToken");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
    failedQueue.forEach((prom) => {
        error ? prom.reject(error) : prom.resolve(token);
    });
    failedQueue = [];
};

api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                if (!isRefreshing) {
                    isRefreshing = true;

                    const newAccessToken = await requestNewToken();

                    isRefreshing = false;
                    processQueue(null, newAccessToken);
                }
                return new Promise((resolve, reject) => {
                    failedQueue.push({
                        resolve: (token) => {
                            originalRequest.headers.Authorization = `Bearer ${token}`;
                            resolve(api(originalRequest));
                        },
                        reject: (err) => reject(err),
                    });
                });
            } catch (refreshError) {
                isRefreshing = false;
                processQueue(refreshError, null);

                await AsyncStorage.clear();
                triggerLogout();
                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error);
    }
);

export default api;
