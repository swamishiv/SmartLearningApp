import axios from "axios";

// 🔗 Base URL of .NET API
const axiosInstance = axios.create({
    baseURL: "https://localhost:7243/api", // change port if needed
    headers: {
        "Content-Type": "application/json"
    }
});

// 🔐 Automatically attach JWT token
axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token");

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default axiosInstance;