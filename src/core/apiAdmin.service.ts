import axios, { AxiosInstance, AxiosRequestConfig, InternalAxiosRequestConfig } from "axios";
import { API_URL_ADMIN } from "./config";

export const axiosAdmin: AxiosInstance = axios.create({
    baseURL: API_URL_ADMIN,
});

axiosAdmin.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        const token = localStorage.getItem("token");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        console.error("[Axios Request Error]:", error);
        return Promise.reject(error);
    }
);


const ApiServiceAdmin = {
    async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
        try {
            const response = await axiosAdmin.get<T>(url, config);
            return response.data;
        } catch (error) {
            this.handleError(error);
            throw error;
        }
    },

    async post<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
        try {
            const response = await axiosAdmin.post<T>(url, data, config);
            return response.data;
        } catch (error) {
            this.handleError(error);
            throw error;
        }
    },

    async put<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
        try {
            const response = await axiosAdmin.put<T>(url, data, config);
            return response.data;
        } catch (error) {
            this.handleError(error);
            throw error;
        }
    },

    async update<T>(url: string, slug: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
        try {
            const response = await axiosAdmin.put<T>(`${url}/${slug}`, data, config);
            return response.data;
        } catch (error) {
            this.handleError(error);
            throw error;
        }
    },

    async delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
        try {
            const response = await axiosAdmin.delete<T>(url, config);
            return response.data;
        } catch (error) {
            this.handleError(error);
            throw error;
        }
    },

    handleError(error: any): never {
        console.error(`[ApiServiceAdmin] Error:`, error);
        throw new Error(error?.response?.data?.message || error.message || "An error occurred");
    },
};

export default ApiServiceAdmin;
