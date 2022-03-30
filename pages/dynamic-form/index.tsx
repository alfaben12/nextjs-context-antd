import { Form, Input, notification } from "antd";
import axios from "axios";
import { GetStaticProps } from "next";
import { useEffect, useState } from "react";
import _ from "underscore";
import LayoutComponent from "../../components/Layout/LayoutComponent";
import { useLagging } from "../../context/LaggingContext/Context";
import { ILagging } from "../../context/LaggingContext/Type";

const DynamicForm = ({ data }) => {
    const { lagging, fetchAllLagging } = useLagging();

    useEffect(() => {
        fetchAllLagging();
    }, []);

    useEffect(() => {
        setFieldForm(lagging.data);
    }, [lagging.data]);

    // let fields = [
    //     {
    //         flag: "lakalantasA",
    //         name: "Lakalantas A",
    //         placeholder: "Isi dengan angka",
    //         isEdit: true,
    //         type: "number",
    //         formula: null,
    //         valuedForFlag: ["lakalantasC", "lakalantasE"],
    //         valuedByFlag: [],
    //         defaultValue: 0,
    //     },
    //     {
    //         flag: "lakalantasB",
    //         name: "Lakalantas B",
    //         placeholder: "Isi dengan angka",
    //         isEdit: true,
    //         type: "number",
    //         formula: null,
    //         valuedForFlag: ["lakalantasC", "lakalantasE"],
    //         valuedByFlag: [],
    //         defaultValue: 0,
    //     },
    //     {
    //         flag: "lakalantasC",
    //         name: "Lakalantas C",
    //         placeholder: "Isi dengan angka",
    //         isEdit: false,
    //         type: "number",
    //         formula: "10*(lakalantasA+lakalantasB)",
    //         valuedForFlag: [],
    //         valuedByFlag: ["lakalantasA", "lakalantasB"],
    //         defaultValue: 0,
    //     },
    //     {
    //         flag: "lakalantasD",
    //         name: "Lakalantas D",
    //         placeholder: "Isi dengan angka",
    //         isEdit: true,
    //         type: "number",
    //         formula: null,
    //         valuedForFlag: ["lakalantasE"],
    //         valuedByFlag: [],
    //         defaultValue: 0,
    //     },
    //     {
    //         flag: "lakalantasE",
    //         name: "Lakalantas E",
    //         placeholder: "Isi dengan angka",
    //         isEdit: false,
    //         type: "number",
    //         formula: "2*(10*(lakalantasA+lakalantasB))+lakalantasD",
    //         valuedForFlag: [],
    //         valuedByFlag: ["lakalantasA", "lakalantasB", "lakalantasD"],
    //         defaultValue: 0,
    //     },
    // ];

    // const lagging = data;
    // tidak dapat menghitung, dari hasil yang sudah dihitung

    const [fieldForm, setFieldForm] = useState<ILagging[]>(lagging.data);
    const [initialFormValues, setinitialFormValues] = useState(null);

    const changeValue = (index) => (e) => {
        fieldForm[index].defaultValue = e.target.value ? e.target.value : 0;

        const field = fieldForm[index];
        const valuedForFlag = field.valuedForFlag;
        if (valuedForFlag.length > 0) {
            for (let i = 0; i < valuedForFlag.length; i++) {
                const tempValuedForFlag = valuedForFlag[i];
                const tempUpdatedValue = _.find(fieldForm, function (o) {
                    return o.flag === tempValuedForFlag;
                });

                let tempFormula = tempUpdatedValue?.formula;
                let tempValuedByFlag = tempUpdatedValue?.valuedByFlag;

                for (let j = 0; j < fieldForm.length; j++) {
                    if (tempValuedByFlag?.includes(fieldForm[j].flag)) {
                        tempFormula = tempFormula?.replace(
                            fieldForm[j].flag,
                            fieldForm[j].defaultValue
                        );
                    }
                }

                const fieldUpdatedIndex = _.findIndex(fieldForm, {
                    flag: tempValuedForFlag,
                });

                fieldForm[fieldUpdatedIndex].defaultValue = eval(tempFormula);
            }
        }

        setFieldForm([...fieldForm]);
    };

    const onFinish = (values: any) => {
        console.log(values);
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log("Failed:", errorInfo);
    };

    const [form] = Form.useForm();

    useEffect(() => {
        const forms = {};
        for (let i = 0; i < fieldForm.length; i++) {
            forms[fieldForm[i].flag] = fieldForm[i].defaultValue;
        }
        form.setFieldsValue(forms);

        setinitialFormValues(forms);
        console.log(forms);
        console.log(fieldForm);
    }, [fieldForm]);

    return (
        <LayoutComponent>
            {initialFormValues !== null ? (
                <Form
                    name="dynamic_form_nest_item"
                    initialValues={initialFormValues}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                >
                    {fieldForm.map((field, index) => {
                        return (
                            <Form.Item
                                key={index}
                                label={field.name}
                                name={field.flag}
                                rules={[
                                    {
                                        required: true,
                                        message: `Please input your ${field.name}!`,
                                    },
                                ]}
                                shouldUpdate={true}
                            >
                                {field.isEdit ? (
                                    <Input
                                        type="number"
                                        placeholder={field.placeholder}
                                        onKeyUp={changeValue(index)}
                                    />
                                ) : (
                                    <div
                                        style={{
                                            width: "100%",
                                            height: 30,
                                            border: "1px solid #d9d9d9",
                                            display: "flex",
                                            alignItems: "center",
                                            padding: "4px 11px",
                                            borderRadius: 2,
                                            backgroundColor: "#e9e9e9",
                                            cursor: "pointer",
                                        }}
                                        onClick={() => {
                                            notification["info"]({
                                                message: "Tidak dapat diedit",
                                                description: `Field ini adalah hasil perhitungan dari ${field.formula}`,
                                            });
                                        }}
                                    >
                                        {field.defaultValue}
                                    </div>
                                )}
                            </Form.Item>
                        );
                    })}
                </Form>
            ) : null}
        </LayoutComponent>
    );
    // return (
    //     <>
    //         <table>
    //             <tbody>
    //                 {fieldForm.map((field, index) => {
    //                     return (
    //                         <tr key={index}>
    //                             <td
    //                                 style={{
    //                                     padding: "10px",
    //                                 }}
    //                             >
    //                                 {field.name}
    //                             </td>
    //                             <td
    //                                 style={{
    //                                     padding: "10px",
    //                                 }}
    //                             >
    //                                 :
    //                             </td>
    //                             <td
    //                                 style={{
    //                                     padding: "10px",
    //                                 }}
    //                             >
    //                                 {field.isEdit ? (
    //                                     <input
    //                                         type="number"
    //                                         name={field.flag}
    //                                         placeholder={field.placeholder}
    //                                         onKeyUp={changeValue(index)}
    //                                         defaultValue={field.defaultValue}
    //                                     />
    //                                 ) : (
    //                                     <p>{field.defaultValue}</p>
    //                                 )}
    //                             </td>
    //                         </tr>
    //                     );
    //                 })}
    //             </tbody>
    //         </table>
    //     </>
    // );
};

export const getStaticProps: GetStaticProps = async (ctx) => {
    const { status, data } = await axios.get(
        `http://localhost:5000/v1/auth/lagging`
    );
    return {
        props: {
            data,
        },
    };
};

export default DynamicForm;
