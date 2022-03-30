import { Layout, PageHeader } from "antd";
import React, { ReactNode, useState } from "react";
import { useAuth } from "../../context/AuthContext/Context";
import SigninPage from "../../pages/signin";
const { Content } = Layout;
import { useRouter } from "next/router";
import SidebarComponent from "../Sidebar/SidebarComponent";
import HeaderComponent from "../Header/HeaderComponent";

interface LayoutProps {
    children: ReactNode;
    title?: string;
}

export default function LayoutComponent(props: LayoutProps) {
    const { children, title } = props;
    const { auth } = useAuth();
    const router = useRouter();
    const [collapsed, setCollapsed] = useState(false);
    const openSlider = () => {
        setCollapsed(!collapsed);
    };

    return auth.data?.isAuth ? (
        <Layout>
            <SidebarComponent collapsed={collapsed} />
            <Layout className="site-layout">
                <HeaderComponent
                    collapsed={collapsed}
                    openSlider={() => openSlider()}
                />

                {title ? (
                    <PageHeader
                        className="site-page-header"
                        onBack={() => router.back()}
                        title={title}
                    />
                ) : (
                    <div
                        style={{
                            paddingBottom: "25px",
                        }}
                    ></div>
                )}
                <Content
                    className="site-layout-background"
                    style={{
                        margin: "0px 25px",
                        padding: 25,
                        minHeight: "100vh",
                        overflow: "auto",
                    }}
                >
                    {children}
                </Content>
            </Layout>
        </Layout>
    ) : (
        <SigninPage />
    );
}
