import { AxiosResponse } from "axios";
import { createContext, useContext, useState } from "react";
import createPersistedState from "use-persisted-state";
import api from "../../utils/api";
import { AuthContextType, AuthResponse } from "./Type";

const usePersistState = createPersistedState<AuthResponse>("simulek:auth");
const AuthContext = createContext<AuthContextType>({
    auth: {
        isLoading: false,
        status: false,
        message: "",
        statusCode: 200,
        data: null,
    },
    signin: () => {},
    signout: () => {},
});

export const AuthProvider = ({ children }: any) => {
    const [auth, setAuth] = usePersistState({
        isLoading: false,
        status: false,
        message: "",
        statusCode: 200,
        data: null,
    });

    const signin = async (body: any) => {
        const { status, data }: AxiosResponse<AuthResponse> = await api.post(
            `/auth/signin`,
            body
        );

        setAuth(data);
    };

    const signout = (id: string) => {
        setAuth({
            isLoading: false,
            status: false,
            message: "",
            statusCode: 200,
            data: null,
        });
    };
    return (
        <AuthContext.Provider
            value={{
                auth,
                signin,
                signout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};
