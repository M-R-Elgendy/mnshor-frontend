import React from 'react';
import { useAuthVerification } from 'react-auth-verification-context';
import { Navigate } from 'react-router-dom';


const RequireAuth = ({ children }) => {
    const { isAuthenticated } = useAuthVerification(); // Hook to check if the user is authenticated

    if (!isAuthenticated) {
        // If not authenticated, redirect to login page
        return <Navigate to="/login" />;
    }

    return children; // If authenticated, render the children components
};

export default RequireAuth;
