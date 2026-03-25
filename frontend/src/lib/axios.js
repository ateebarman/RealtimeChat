import axios from "axios";
import toast from "react-hot-toast";

const BASE_URL = import.meta.env.MODE === "development" ? "http://localhost:5001/api" : "/api";

export const axiosInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true, // send cookies with the request
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401 && error.config.url.includes("/auth/me")) {
      // Don't show error toast for unauthenticated user check on page load
      return Promise.reject(error);
    }

    const errorMessage = error.response?.data?.message || "An unexpected error occurred. Please try again later.";
    
    // Only show toast if it's not a 401 unauth redirect (which sometimes app handles gracefully)
    // Actually, showing toast for 401s like invalid password is good.
    toast.error(errorMessage);
    
    return Promise.reject(error);
  }
);
