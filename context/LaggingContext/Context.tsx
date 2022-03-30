import { AxiosResponse } from "axios";
import { createContext, useContext, useState } from "react";
import api from "../../utils/api";
import { LaggingContextType, LaggingResponse } from "./Type";

const LaggingContext = createContext<LaggingContextType>({
    lagging: {
        isLoading: false,
        status: false,
        message: "",
        statusCode: 200,
        data: [],
    },
    fetchAllLagging: () => {},
});

export const LaggingProvider = ({ children }: any) => {
    const [lagging, setLagging] = useState<LaggingResponse>({
        isLoading: false,
        status: false,
        message: "",
        statusCode: 200,
        data: [],
    });

    const fetchAllLagging = async () => {
        const { status, data }: AxiosResponse<LaggingResponse> = await api.get(
            `/auth/lagging`
        );

        setLagging(data);
    };
    return (
        <LaggingContext.Provider
            value={{
                lagging,
                fetchAllLagging,
            }}
        >
            {children}
        </LaggingContext.Provider>
    );
};

export const useLagging = () => {
    return useContext(LaggingContext);
};
