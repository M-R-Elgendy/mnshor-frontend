import axios from "axios";
import { AuthProvider, useAuth } from 'react-auth-verification-context';
import { useEffect } from "react";

const token = localStorage.getItem("token") || '';
export const http = axios.create({
    baseURL: "http://localhost:3000/api/v1",
    headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
    },
});
// http.interceptors.request.use((config) => {
//     // const token = Cookies.get("_auth");
//     const token = localStorage.getItem("_auth");
//     if (token) {
//         config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
// });

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
    window.location.href = "/login";
}

export const IsAuthenticated = () => {
    const { isAuthenticated } = useAuth();
    useEffect(() => {
        const bootstrapAsync = async () => {
            setLoading(true);
            let userAttributes = null;
            try {
                const user = await checkAuth();
                const { attributes: userAttr } = user;
                userAttributes = userAttr;
            } catch (e) {
                console.log('error', e);
            }
            restoreToken(userAttributes);
            setLoading(false);
        };

        bootstrapAsync();
    }, []);

    return isAuthenticated;
}