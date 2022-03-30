import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    HomeOutlined,
    UserOutlined,
} from "@ant-design/icons";
import {
    Layout,
    Menu,
    Breadcrumb,
    Avatar,
    Badge,
    Col,
    Dropdown,
    Row,
    Typography,
} from "antd";
import Link from "next/link";
const { Header } = Layout;

const { Title } = Typography;

const HeaderComponent = (props: { collapsed: any; openSlider: any }) => {
    const { collapsed, openSlider } = props;

    const menu = (
        <Menu>
            <Menu.Item>
                <Link href={"/profile"}>
                    <a
                        style={{
                            paddingLeft: "20px",
                            paddingRight: "20px",
                        }}
                    >
                        Profile
                    </a>
                </Link>
            </Menu.Item>
            <Menu.Item danger>
                <Link href={"/logout"}>
                    <a
                        style={{
                            paddingLeft: "20px",
                            paddingRight: "20px",
                        }}
                    >
                        Logout
                    </a>
                </Link>
            </Menu.Item>
        </Menu>
    );

    return (
        <Header
            className="site-layout-background"
            style={{
                paddingLeft: "20px",
                paddingRight: "20px",
            }}
        >
            <Row>
                <Col flex={10}>
                    <Row gutter={[8, 0]} justify="start">
                        <Col>
                            {!collapsed ? (
                                <MenuFoldOutlined
                                    style={{
                                        fontSize: "20px",
                                    }}
                                    className="trigger"
                                    onClick={openSlider}
                                />
                            ) : (
                                <MenuUnfoldOutlined
                                    style={{
                                        fontSize: "20px",
                                    }}
                                    className="trigger"
                                    onClick={openSlider}
                                />
                            )}
                        </Col>
                        <Col>
                            <div
                                style={{
                                    paddingLeft: "20px",
                                }}
                            ></div>
                        </Col>
                        <Col>
                            <HomeOutlined
                                style={{
                                    fontSize: "20px",
                                    color: "#1890ff",
                                }}
                            />
                        </Col>
                        <Col>
                            <Title
                                level={4}
                                style={{
                                    paddingTop: "15px",
                                }}
                            >
                                /
                            </Title>
                        </Col>
                        <Col>
                            <div
                                style={{
                                    paddingTop: "3px",
                                }}
                            >
                                <span
                                    style={{
                                        width: "20px",
                                        height: "20px",
                                        display: "inline-block",
                                        borderRadius: "50%",
                                        backgroundColor: "#f2b56d",
                                    }}
                                ></span>
                            </div>
                        </Col>
                        <Col>
                            <Title
                                level={4}
                                style={{
                                    paddingTop: "15px",
                                }}
                            >
                                Simulek
                            </Title>
                        </Col>
                    </Row>
                </Col>
                <Col flex={1}>
                    <Dropdown overlay={menu}>
                        <a
                            className="ant-dropdown-link"
                            onClick={(e) => e.preventDefault()}
                        >
                            <Row gutter={[8, 0]} justify="end">
                                <Col>
                                    <Badge
                                        style={{
                                            backgroundColor: "green",
                                        }}
                                        dot
                                    >
                                        <Avatar
                                            icon={
                                                <UserOutlined
                                                    style={{
                                                        fontSize: "20px",
                                                    }}
                                                />
                                            }
                                        />
                                    </Badge>
                                </Col>
                                {/* <Col>
                                            <Paragraph strong>
                                                Thariq Alfa
                                            </Paragraph>
                                        </Col> */}
                            </Row>
                        </a>
                    </Dropdown>
                </Col>
            </Row>
        </Header>
    );
};

export default HeaderComponent;
