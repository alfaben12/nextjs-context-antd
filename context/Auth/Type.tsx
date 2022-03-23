export interface IAuth {
    isLoading?: boolean;
    isAuth?: boolean;
    token: string;
    name: string;
}

export interface AuthContextType {
    auth: IAuth;
    signin: (user: IAuth) => void;
    signout: (token: string) => void;
}
