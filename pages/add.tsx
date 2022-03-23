import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { useTasks } from "../context/TaskContext/Context";

const inititalState = {
    title: "",
    description: "",
};

const AddPage = () => {
    const [task, setTask] = useState(inititalState);
    const { createTask, updateTask, tasks } = useTasks();
    const router = useRouter();

    const handleChange = (e: { target: { name: any; value: any } }) =>
        setTask({ ...task, [e.target.name]: e.target.value });

    const handleSubmit = (e: { preventDefault: () => void }) => {
        e.preventDefault();

        // if (!router.query.id) {
        createTask({ title: task.title, description: task.description });
        // setTask(inititalState);
        // } else {
        // updateTask(router.query.id, task);
        // }

        router.push("/");
    };

    useEffect(() => {
        if (router.query.id) {
            const taskFound = tasks.find((task) => task.id === router.query.id);
            if (taskFound)
                setTask({
                    title: taskFound.title,
                    description: taskFound.description,
                });
        }
    }, [router.query.id]);

    return (
        <form onSubmit={handleSubmit}>
            <h1>{router.query.id ? "Edit Task" : "New Task"}</h1>
            <input
                type="text"
                placeholder="Write a title"
                autoFocus
                name="title"
                onChange={handleChange}
                value={task.title}
            />
            <br />
            <textarea
                cols={2}
                placeholder="Write a Description"
                name="description"
                onChange={handleChange}
                value={task.description}
            ></textarea>
            <br />

            <button disabled={!task.title}>Save</button>
        </form>
    );
};

export default AddPage;
