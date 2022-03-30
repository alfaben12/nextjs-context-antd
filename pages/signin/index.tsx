import { Form, Input, Button } from "antd";
import { useEffect } from "react";
import { useAuth } from "../../context/AuthContext/Context";
import { useRouter } from "next/router";

const SigninPage = () => {
    const router = useRouter();
    const { auth, signin } = useAuth();
    const onFinish = (values: any) => {
        signin(values);
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log("Failed:", errorInfo);
    };

    useEffect(() => {
        if (auth.data?.isAuth) {
            router.push("/dashboard");
        }
    }, [auth.data]);

    return (
        <Form
            name="basic"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
        >
            {auth.isLoading ? "loading" : "okee"}
            <Form.Item
                label="email"
                name="email"
                rules={[
                    { required: true, message: "Please input your username!" },
                ]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                label="Password"
                name="password"
                rules={[
                    { required: true, message: "Please input your password!" },
                ]}
            >
                <Input.Password />
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                <Button type="primary" htmlType="submit">
                    Submit
                </Button>
            </Form.Item>
        </Form>
    );
};

export default SigninPage;
