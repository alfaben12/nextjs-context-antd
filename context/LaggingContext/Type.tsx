export interface ILagging {
    id: number;
    flag: string;
    isEdit: boolean;
    type: string;
    name: string;
    placeholder: string;
    defaultValue: string;
    formula: string;
    valuedForFlag: string[];
    valuedByFlag: string[];
    createdAt: Date;
    updatedAt?: any;
}

export interface LaggingResponse {
    isLoading: boolean;
    status: boolean;
    message: string;
    data: ILagging[];
    statusCode: number;
}

export interface LaggingContextType {
    lagging: LaggingResponse;
    fetchAllLagging: () => void;
}
