import { createContext, useContext, useState } from "react";
import createPersistedState from "use-persisted-state";
import { AuthContextType, IAuth } from "./Type";

const usePersistState = createPersistedState<IAuth>("simulek:auth");
const AuthContext = createContext<AuthContextType>({
    auth: {
        isLoading: false,
        name: "",
        token: "",
    },
    signin: () => {},
    signout: () => {},
});

export const AuthProvider = ({ children }: any) => {
    const [auth, setAuth] = usePersistState({
        isLoading: false,
        isAuth: false,
        name: "",
        token: "",
    });

    const signin = (body: { name: any; token: any }) => {
        setAuth({
            isLoading: true,
            isAuth: false,
            name: "",
            token: "",
        });

        setTimeout(() => {
            setAuth({
                isLoading: false,
                isAuth: true,
                name: body.name,
                token: body.token,
            });
        }, 2000);
    };

    const signout = (id: string) => {
        setAuth({
            isLoading: false,
            name: "",
            token: "",
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
