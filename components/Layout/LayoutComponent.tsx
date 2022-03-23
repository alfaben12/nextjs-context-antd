import { Layout, Menu, Breadcrumb } from "antd";
import {
    UserOutlined,
    LaptopOutlined,
    NotificationOutlined,
} from "@ant-design/icons";
import { ReactNode } from "react";
import HeaderComponent from "../Header/HeaderComponent";
import SidebarComponent from "../Sidebar/SidebarComponent";
import { useAuth } from "../../context/Auth/Context";
import SigninPage from "../../pages/signin";

const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;

interface LayoutProps {
    children: ReactNode;
}

export default function LayoutComponent(props: LayoutProps) {
    const { children } = props;
    const { auth } = useAuth();

    return auth.isAuth ? (
        <Layout>
            <HeaderComponent />
            <Layout>
                <SidebarComponent />
                <Layout style={{ padding: "0 24px 24px" }}>
                    <Breadcrumb style={{ margin: "16px 0" }}>
                        <Breadcrumb.Item>Home</Breadcrumb.Item>
                        <Breadcrumb.Item>List</Breadcrumb.Item>
                        <Breadcrumb.Item>App</Breadcrumb.Item>
                    </Breadcrumb>
                    <Content
                        className="site-layout-background"
                        style={{
                            padding: 24,
                            margin: 0,
                            minHeight: 280,
                        }}
                    >
                        {children}
                    </Content>
                </Layout>
            </Layout>
        </Layout>
    ) : (
        <SigninPage />
    );
}
