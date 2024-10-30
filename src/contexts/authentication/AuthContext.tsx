import React, {createContext, useContext, useState} from "react";
import {UserSessionData, AuthContextType} from "./AuthTypes.ts";
import {LoginFormDataInterface} from "../../components/form/LoginFormDataInterface.ts";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {

    const [user, setUser] = useState<UserSessionData | null>(() => {
        // Get the initial user data from localStorage if it exists
        const storedUser = localStorage.getItem('user');
        return storedUser ? JSON.parse(storedUser) : null;
    });
    const [sessionToken, setSessionToken] = useState<string | null>(localStorage.getItem('sessionToken'));
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(localStorage.getItem('isLoggedIn') === 'true');

    const login = async ({ email, password }: LoginFormDataInterface) => {

        return new Promise<void>((resolve, reject) => {
            setTimeout(() => {
                if (email === "mirec300@gmail.com" && password === "password") {
                    const sessionToken = "0123456789";
                    const sessionData: UserSessionData = {
                        id: "1",
                        first_name: "Miro",
                        last_name: "Malíšek"
                    };
                    localStorage.setItem('sessionToken', sessionToken);
                    setSessionToken(sessionToken);
                    localStorage.setItem('user', JSON.stringify(sessionData));
                    setUser(sessionData);
                    localStorage.setItem('isLoggedIn', 'true');
                    setIsLoggedIn(true);
                    resolve(); // Resolve the promise if login is successful
                } else {
                    reject(new Error("Nesprávny email alebo heslo")); // Reject the promise on error
                }
            }, 2000);
        });

    };

    const logout = () => {
        localStorage.removeItem('sessionToken');
        setSessionToken(null);
        localStorage.removeItem('user');
        setUser(null);
        localStorage.removeItem('isLoggedIn');
        setIsLoggedIn(false);
    };

    return (
        <AuthContext.Provider value={{ user, isLoggedIn, login, logout }}>
            {children}
        </AuthContext.Provider>
    );

}

export function useAuth() :AuthContextType {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}