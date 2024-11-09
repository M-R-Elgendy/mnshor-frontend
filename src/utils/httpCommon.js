import axios from "axios";
import { AuthProvider, useAuth } from 'react-auth-verification-context';
import { useEffect } from "react";

const token = localStorage.getItem("token") || '';
export const http = axios.create({
    baseURL: "https://9611-197-62-213-239.ngrok-free.app/api/v1",
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
    window.location.href = "/login";
}