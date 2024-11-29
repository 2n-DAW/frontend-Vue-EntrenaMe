import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import { API_URL_CLIENT } from "./config";

// Crear una instancia de Axios con configuración base
export const axiosClient: AxiosInstance = axios.create({
    baseURL: API_URL_CLIENT,
});

const ApiService = {

    // GET request genérica con soporte de tipos
    async get<T>(url: string, config?: AxiosRequestConfig): Promise<T | undefined> {
        try {
            const response = await axiosClient.get<T>(url, config);
            return response.data;
        } catch (error) {
            this.handleError(error);
        }
    },

    // POST request
    async post<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T | undefined> {
        try {
            const response = await axiosClient.post<T>(url, data, config);
            return response.data;
        } catch (error) {
            this.handleError(error);
        }
    },

    // PUT request (completa)
    async put<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T | undefined> {
        try {
            const response = await axiosClient.put<T>(url, data, config);
            return response.data;
        } catch (error) {
            this.handleError(error);
        }
    },

    // UPDATE (mismo concepto que PUT pero con slug)
    async update<T>(url: string, slug: string, data?: any, config?: AxiosRequestConfig): Promise<T | undefined> {
        try {
            const response = await axiosClient.put<T>(`${url}/${slug}`, data, config);
            return response.data;
        } catch (error) {
            this.handleError(error);
        }
    },

    // DELETE request
    async delete<T>(url: string, config?: AxiosRequestConfig): Promise<T | undefined> {
        try {
            const response = await axiosClient.delete<T>(url, config);
            return response.data;
        } catch (error) {
            this.handleError(error);
        }
    },

    // Manejo de errores centralizado
    handleError(error: any): never {
        console.error(`[ApiService] Error:`, error);
        throw new Error(error?.response?.data?.message || error.message || "An error occurred");
    },
};

export default ApiService;
