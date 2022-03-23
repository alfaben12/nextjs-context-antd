import { createContext, useContext, useState } from "react";
import { v4 as uuid } from "uuid";
import { ITask, TaskContextType } from "./Type";
import createPersistedState from "use-persisted-state";

const usePersistState = createPersistedState<ITask[]>("simulek:task");
const TaskContext = createContext<TaskContextType>({
    tasks: [],
    createTask: () => {},
    updateTask: () => {},
    deleteTask: () => {},
});

export const TasksProvider = ({ children }: any) => {
    const [tasks, setTasks] = usePersistState([]);

    const createTask = (body: { title: any; description: any }) =>
        setTasks([
            ...tasks,
            { id: uuid(), title: body.title, description: body.description },
        ]);

    const updateTask = (id: number | undefined, updatedTask: any) =>
        setTasks([
            ...tasks.map((task) =>
                task.id === id ? { ...task, ...updatedTask } : task
            ),
        ]);

    const deleteTask = (id: number | undefined) =>
        setTasks([...tasks.filter((task) => task.id !== id)]);

    return (
        <TaskContext.Provider
            value={{
                tasks,
                createTask,
                updateTask,
                deleteTask,
            }}
        >
            {children}
        </TaskContext.Provider>
    );
};

export const useTasks = () => {
    return useContext(TaskContext);
};
