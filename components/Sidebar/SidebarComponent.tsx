import {
    UserOutlined,
    LaptopOutlined,
    NotificationOutlined,
    FileFilled,
    FolderOpenFilled,
    PieChartFilled,
    SettingFilled,
} from "@ant-design/icons";
import { Layout, Menu, Breadcrumb } from "antd";
import Link from "next/link";
import { useState } from "react";
const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;
const SidebarComponent = (props: { collapsed: any }) => {
    const { collapsed } = props;

    return (
        <Sider width={200} trigger={null} collapsible collapsed={collapsed}>
            <div
                style={{
                    backgroundColor: "white",
                    padding: collapsed ? "10px" : "35px",
                }}
            >
                <img
                    src={
                        "http://ficon.elnusapetrofin.co.id/assets/media/avatars/epnlogo.png"
                    }
                    alt="Elnusa Petrofin"
                    width={collapsed ? 60 : 120}
                />
            </div>
            <Menu
                mode="inline"
                defaultSelectedKeys={["1"]}
                defaultOpenKeys={["sub1"]}
                style={{ height: "100%", borderRight: 0 }}
            >
                <SubMenu
                    key="sub1"
                    icon={
                        <PieChartFilled
                            style={{
                                fontSize: "20px",
                            }}
                        />
                    }
                    title="Dashboard"
                >
                    <Menu.Item key="1">
                        <Link href="antd">Antd Page</Link>
                    </Menu.Item>
                    <Menu.Item key="2">option2</Menu.Item>
                    <Menu.Item key="3">option3</Menu.Item>
                    <Menu.Item key="4">option4</Menu.Item>
                </SubMenu>
                <SubMenu
                    key="sub2"
                    icon={
                        <FileFilled
                            style={{
                                fontSize: "20px",
                            }}
                        />
                    }
                    title="HSE Index"
                >
                    <Menu.Item key="5">option5</Menu.Item>
                    <Menu.Item key="6">option6</Menu.Item>
                    <Menu.Item key="7">option7</Menu.Item>
                    <Menu.Item key="8">option8</Menu.Item>
                </SubMenu>
                <SubMenu
                    key="sub3"
                    icon={
                        <FolderOpenFilled
                            style={{
                                fontSize: "20px",
                            }}
                        />
                    }
                    title="Report"
                >
                    <Menu.Item key="9">option9</Menu.Item>
                    <Menu.Item key="10">option10</Menu.Item>
                    <Menu.Item key="11">option11</Menu.Item>
                    <Menu.Item key="12">option12</Menu.Item>
                </SubMenu>
                <SubMenu
                    key="sub4"
                    icon={
                        <SettingFilled
                            style={{
                                fontSize: "20px",
                            }}
                        />
                    }
                    title="Master"
                >
                    <Menu.Item key="13">option13</Menu.Item>
                </SubMenu>
            </Menu>
        </Sider>
    );
};

export default SidebarComponent;
