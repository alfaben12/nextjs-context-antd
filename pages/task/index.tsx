import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useTasks } from "../../context/TaskContext/Context";

const TaskPage: NextPage = () => {
    const { tasks, deleteTask } = useTasks();
    const router = useRouter();
    return (
        <div className="flex justify-center">
            <button onClick={() => router.push("/add")}>Add Task</button>
            {tasks.length === 0 ? (
                <div className="block">
                    <h2 className="text-2xl">There are no tasks</h2>
                </div>
            ) : (
                <div className="w-7/10">
                    {tasks.map((task, i) => (
                        <div
                            key={task.id}
                            className="bg-gray-700 hover:bg-gray-600 cursor-pointer px-20 py-5 m-2 flex justify-between"
                            onClick={() => router.push("/edit/" + task.id)}
                        >
                            <span className="text-5xl mr-5">{i}</span>
                            <div>
                                <div className="flex justify-between">
                                    <h1 className="font-bold">{task.title}</h1>
                                    <button
                                        className="bg-red-700 hover:bg-red-600 px-3 py-1 inline-flex items-center"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            // deleteTask(task.id);
                                        }}
                                    ></button>
                                </div>
                                <p className="text-gray-300">
                                    {task.description}
                                </p>
                                <span className="text-gray-400">{task.id}</span>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default TaskPage;
