import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Nếu Backend chưa bật, console.log ở Terminal sẽ báo lỗi rõ ràng hơn
    console.error("API Error:", error.response?.data || error.message);
    return Promise.reject(error);
  },
);

export default api;
