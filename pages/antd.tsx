import { Form, Input, Checkbox, Button, Card } from "antd";
import LayoutComponent from "../components/Layout/LayoutComponent";

const antdPage = () => {
    const gridStyle = {
        width: "25%",
        textAlign: "center" as const,
    };

    return (
        <LayoutComponent>
            <Card title="Card Title">
                <Card.Grid style={gridStyle}>Content</Card.Grid>
                <Card.Grid hoverable={false} style={gridStyle}>
                    Content
                </Card.Grid>
                <Card.Grid style={gridStyle}>Content</Card.Grid>
                <Card.Grid style={gridStyle}>Content</Card.Grid>
                <Card.Grid style={gridStyle}>Content</Card.Grid>
                <Card.Grid style={gridStyle}>Content</Card.Grid>
                <Card.Grid style={gridStyle}>Content</Card.Grid>
            </Card>
        </LayoutComponent>
    );
};

export default antdPage;
