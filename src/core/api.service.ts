import JwtService from "./jwt.service";
import axios from "axios";
import { API_URL } from "./config";

export const axiosClient = axios.create({
    baseURL: API_URL
});

const ApiService = {
    setHeader() {
        axiosClient.defaults.headers[
            "Authorization"
        ] = `Token ${JwtService.getToken()}`;
    },

    // query(resource, params) {
    //     return axiosClient.get(resource, params).catch((error) => {
    //         throw new Error(`[RWV] ApiService ${error}`);
    //     });
    // },

    get(url:string) {
        console.log('entra');
        console.log(`${API_URL}${url}`);
        return axiosClient.get(`${API_URL}${url}`).catch((error) => {
            throw new Error(`[RWV] ApiService ${error}`);
        });
        
    },

    post(resource:any, params?: any) {
        return axiosClient.post(`${resource}`, params);
    },

    update(resource:any, slug:any, params?: any) {
        return axiosClient.put(`${resource}/${slug}`, params);
    },  

    put(resource:any, params?: any) {
        return axiosClient.put(`${resource}`, params);
    },

    delete(resource:any) {
        return axiosClient.delete(resource).catch((error) => {
            throw new Error(`[RWV] ApiService ${error}`);
        });
    }
};

export default ApiService;


