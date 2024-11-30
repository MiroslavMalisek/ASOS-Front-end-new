import React from 'react';
import { Navigate } from 'react-router-dom';
import {useAuth} from "./contexts/authentication/AuthContext.tsx";

const ProtectedRoute: React.FC<{ children: JSX.Element }> = ({ children }) => {
    const {isLoggedIn} = useAuth();

    if (!isLoggedIn) {
        return <Navigate to="/login" />;
    }

    return children;
};

export default ProtectedRoute;