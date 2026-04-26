import axios from "axios";

let setLoadingGlobal;

export const setLoader = (loaderFn) => {
  setLoadingGlobal = loaderFn;
};

const axiosInstance = axios.create({
  baseURL: "https://localhost:7243/api", // ✅ correct
});

// 🔐 REQUEST INTERCEPTOR
axiosInstance.interceptors.request.use(
  (config) => {

    // ⏳ start loader
    if (setLoadingGlobal) setLoadingGlobal(true);

    // ✅ only attach token if exists
    const token = localStorage.getItem("token");

    // ❗ Skip token for login API (SAFE CHECK)
    if (token && !config.url?.includes("login")) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    if (setLoadingGlobal) setLoadingGlobal(false);
    return Promise.reject(error);
  }
);

// 🚫 RESPONSE INTERCEPTOR
axiosInstance.interceptors.response.use(
  (response) => {
    if (setLoadingGlobal) setLoadingGlobal(false);
    return response;
  },
  (error) => {
    if (setLoadingGlobal) setLoadingGlobal(false);

    if (error.response?.status === 401) {
      localStorage.clear();
      window.location.href = "/";
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;