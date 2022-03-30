import "../styles/globals.css";
import type { AppProps } from "next/app";
import { TasksProvider } from "../context/TaskContext/Context";
import "./App.css";
import "../styles/globals.css";
import React from "react";
import { AuthProvider } from "../context/AuthContext/Context";
import Head from "next/head";
import { LaggingProvider } from "../context/LaggingContext/Context";

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <>
            <Head>
                <title>Simulek</title>
                <meta
                    name="viewport"
                    content="initial-scale=1.0, width=device-width"
                />
            </Head>
            <AuthProvider>
                <LaggingProvider>
                    <TasksProvider>
                        <Component {...pageProps} />
                    </TasksProvider>
                </LaggingProvider>
            </AuthProvider>
        </>
    );
}

export default MyApp;
