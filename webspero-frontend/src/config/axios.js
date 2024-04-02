import axiosClient from "axios";

const axios = axiosClient.create({
  baseURL: "http://localhost:3000/", // Replace with your base URL
  headers: {
    "Content-Type": "application/json",
  },
});

// Add a request interceptor
axios.interceptors.request.use(
  function (config) {
    // Check if token is available in localStorage
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }

    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

export default axios;
