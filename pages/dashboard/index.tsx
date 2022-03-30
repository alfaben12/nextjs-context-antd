import { PageHeader } from "antd";
import { NextPage } from "next/types";
import LayoutComponent from "../../components/Layout/LayoutComponent";

const DashboardPage: NextPage = () => {
    return (
        <LayoutComponent title="Dashboard">
            <h1>Hi</h1>
        </LayoutComponent>
    );
};

export default DashboardPage;
