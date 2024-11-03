import {LoginFormDataInterface} from "../../components/form/LoginFormDataInterface.ts";

export interface UserSessionData {
    id: number;
    first_name: string;
    last_name: string;
}

export interface AuthContextType {
    user: UserSessionData | null;
    isLoggedIn: boolean;
    login: (loginData: LoginFormDataInterface) => Promise<void>;
    logout: () => void;
}