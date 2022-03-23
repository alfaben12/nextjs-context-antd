export interface ITask {
    id?: string;
    title: string;
    description: string;
}

export interface TaskContextType {
    tasks: ITask[];
    createTask: (task: ITask) => void;
    updateTask: (id: number, task: ITask) => void;
    deleteTask: (id: number) => void;
}
