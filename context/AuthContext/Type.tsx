export interface IUser {
    id: number;
    name: string;
    password: string;
    email: string;
    createdAt: Date;
    updatedAt?: any;
}

export interface IAuth {
    isAuth: boolean;
    token: string;
    user: IUser;
}

export interface AuthResponse {
    isLoading: boolean;
    status: boolean;
    message: string;
    data: IAuth | null;
    statusCode: number;
}

export interface AuthContextType {
    auth: AuthResponse;
    signin: (user: IAuth) => void;
    signout: (token: string) => void;
}
