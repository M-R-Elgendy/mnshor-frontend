import axios from "axios";
import { useNavigate } from 'react-router-dom';
const navigate = useNavigate();

const token = localStorage.getItem("token") || '';

const baseURL = import.meta.env.VITE_REACT_APP_API_BASE_URL;

export const http = axios.create({
    baseURL: `${baseURL}`,
    headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
    },
});

http.interceptors.response.use(
    (response) => {
        return response.data;
    },
    (error) => {
        if (
            error.response?.data?.message === "Invalid authorization token" ||
            error.response?.data?.error?.message === "jwt expired" ||
            error.response?.data?.message === "Admin might be deleted" ||
            error.response?.data?.statusCode === 403
        ) {
            logoutUser();
        }
        return error;
    }
);

function logoutUser() {
    localStorage.removeItem("token");
    localStorage.removeItem("userName");
    localStorage.removeItem("userId");
    localStorage.removeItem("userRole");
    navigate('/login')
}