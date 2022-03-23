import "../styles/globals.css";
import type { AppProps } from "next/app";
import { TasksProvider } from "../context/TaskContext/Context";
import "./App.css";
import React from "react";
import { AuthProvider } from "../context/Auth/Context";

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <>
            <AuthProvider>
                <TasksProvider>
                    <Component {...pageProps} />
                </TasksProvider>
            </AuthProvider>
        </>
    );
}

export default MyApp;
