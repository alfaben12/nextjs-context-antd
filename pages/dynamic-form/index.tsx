import { Form, Input, Checkbox, Button } from "antd";
import { useEffect, useState } from "react";
import _ from "underscore";
import LayoutComponent from "../../components/Layout/LayoutComponent";

const DynamicForm = () => {
    const styles = {
        margin: "50px",
    };

    let fields = [
        {
            flag: "lakalantasA",
            title: "Lakalantas A",
            placeholder: "Isi dengan angka",
            isEdit: true,
            type: "number",
            formula: null,
            valuedForFlag: ["lakalantasC", "lakalantasE"],
            valuedByFlag: [],
            defaultValue: 0,
        },
        {
            flag: "lakalantasB",
            title: "Lakalantas B",
            placeholder: "Isi dengan angka",
            isEdit: true,
            type: "number",
            formula: null,
            valuedForFlag: ["lakalantasC", "lakalantasE"],
            valuedByFlag: [],
            defaultValue: 0,
        },
        {
            flag: "lakalantasC",
            title: "Lakalantas C",
            placeholder: "Isi dengan angka",
            isEdit: false,
            type: "number",
            formula: "10*(lakalantasA+lakalantasB)",
            valuedForFlag: [],
            valuedByFlag: ["lakalantasA", "lakalantasB"],
            defaultValue: 0,
        },
        {
            flag: "lakalantasD",
            title: "Lakalantas D",
            placeholder: "Isi dengan angka",
            isEdit: true,
            type: "number",
            formula: null,
            valuedForFlag: ["lakalantasE"],
            valuedByFlag: [],
            defaultValue: 0,
        },
        {
            flag: "lakalantasE",
            title: "Lakalantas E",
            placeholder: "Isi dengan angka",
            isEdit: false,
            type: "number",
            formula: "2*(10*(lakalantasA+lakalantasB))+lakalantasD",
            valuedForFlag: [],
            valuedByFlag: ["lakalantasA", "lakalantasB", "lakalantasD"],
            defaultValue: 0,
        },
    ];

    // tidak dapat menghitung, dari hasil yang sudah dihitung

    const [fieldForm, setFieldForm] = useState(fields);
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

    // return (
    //     <LayoutComponent>
    //         {initialFormValues !== null ? (
    //             <Form
    //                 name="dynamic_form_nest_item"
    //                 initialValues={initialFormValues}
    //                 onFinish={onFinish}
    //                 onFinishFailed={onFinishFailed}
    //                 autoComplete="off"
    //             >
    //                 {fieldForm.map((field, index) => {
    //                     return (
    //                         <Form.Item
    //                             key={index}
    //                             label={field.title}
    //                             name={field.flag}
    //                             rules={[
    //                                 {
    //                                     required: true,
    //                                     message: `Please input your ${field.title}}!`,
    //                                 },
    //                             ]}
    //                             shouldUpdate={true}
    //                         >
    //                             <Input
    //                                 type="number"
    //                                 placeholder={field.placeholder}
    //                                 readOnly={!field.isEdit}
    //                                 onKeyUp={changeValue(index)}
    //                             />
    //                         </Form.Item>
    //                     );
    //                 })}
    //             </Form>
    //         ) : null}
    //     </LayoutComponent>
    // );
    return (
        <table>
            <tbody>
                {fieldForm.map((field, index) => {
                    return (
                        <tr key={index}>
                            <td
                                style={{
                                    padding: "10px",
                                }}
                            >
                                {field.title}
                            </td>
                            <td
                                style={{
                                    padding: "10px",
                                }}
                            >
                                :
                            </td>
                            <td
                                style={{
                                    padding: "10px",
                                }}
                            >
                                <input
                                    type="number"
                                    name={field.flag}
                                    placeholder={field.placeholder}
                                    readOnly={!field.isEdit}
                                    onKeyUp={changeValue(index)}
                                    defaultValue={field.defaultValue}
                                />
                            </td>
                        </tr>
                    );
                })}
            </tbody>
        </table>
    );
};

export default DynamicForm;
