import React, { useEffect, useState } from 'react';
import { Button, Form, Input, Modal, message } from 'antd';
import { editUser } from '../../../services/api';

const EditUser = (props) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [form] = Form.useForm();
    const [dataUpdate, setDataUpdate] = useState(props.user);
    const showModal = () => {
        // console.log(user)
        setIsModalOpen(true);
    };


    const handleOk = async () => {

        //getFieldValue => Lấy giá trị của Form
        // console.log(form.getFieldValue())

        const res = await editUser(form.getFieldValue())
        if (res.statusCode === 200) {
            message.success('Update Success')
            setIsModalOpen(false);
            props.setIsDeleteUser(!props.isDeleteUser);
        } else {
            message.error('Update Error')
        }
    };



    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const onFinish = (values) => {
        // console.log(values)
    };

    // Thiết lập dữ liệu trong FORM
    useEffect(() => {
        form.setFieldsValue(dataUpdate)

    }, [dataUpdate])

    const url = `http://localhost:8080/images/avatar/`;
    return (
        <>
            <Button type="primary" onClick={showModal}>
                Edit
            </Button>
            <Modal title="Edit User" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                <Form
                    form={form}
                    name={props.user._id}
                    labelCol={{
                        span: 8,
                    }}
                    wrapperCol={{
                        span: 16,
                    }}
                    style={{
                        maxWidth: 600,
                    }}
                    onFinish={onFinish}
                    // onFinishFailed={onFinishFailed}
                    autoComplete="off"
                >
                    <Form.Item
                        label="Username"
                        name="fullName"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your username!',
                            },
                        ]}


                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[
                            {
                                type: 'email',
                                message: 'Please input your email!',
                            },
                        ]}
                    >
                        <Input disabled />
                    </Form.Item>
                    <Form.Item
                        label="Phone"
                        name="phone"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your phone!',
                            },
                        ]}


                    >
                        <Input />
                    </Form.Item>
                    {/* <Form.Item
                        wrapperCol={{
                            offset: 8,
                            span: 16,
                        }}>

                        <Select
                            defaultValue={user.role}
                            style={{ width: 120 }}
                            // onChange={handleChange}
                            options={[
                                { value: 'ADMIN', label: 'admin' },
                                { value: 'USER', label: 'user' },
                            ]}
                        />
                    </Form.Item> */}
                </Form>
            </Modal >
        </>
    );
};
export default EditUser;