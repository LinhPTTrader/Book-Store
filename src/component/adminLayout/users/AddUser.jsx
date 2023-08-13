import React, { useState } from 'react';
import { Button, Checkbox, Form, Input, Modal, message } from 'antd';
import { compileString } from 'sass';
import Title from 'antd/es/skeleton/Title';
import { creatUserAdmin } from '../../../services/api';
import { AiOutlinePlus } from 'react-icons/ai';
const AddUser = (props) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [form] = Form.useForm()
    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = () => {
        //setIsModalOpen(false);

        form.validateFields().then((user) =>
            creatUserAdmin(user.user)
                .then((res) => {
                    if (res && res.data) {
                        message.success('Create user success');
                        setIsModalOpen(false);
                        props.setIsDeleteUser(!props.isDeleteUser);
                        form.resetFields();
                    } else {
                        message.warning(res.message)
                    }
                })
                .catch(err => message.error(err))
        );
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };
    return (
        <>
            <Button type="primary" onClick={showModal} icon={<AiOutlinePlus />}>
                Add User
            </Button>
            <Modal title="Basic Modal" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                <Form
                    form={form}
                    name="AddUser"
                    labelCol={{
                        span: 8,
                    }}
                    wrapperCol={{
                        span: 16,
                    }}
                    style={{
                        maxWidth: 600,
                    }}
                    initialValues={{
                        remember: true,
                    }}
                    autoComplete="off"

                >
                    <Title level={2}>Đăng kí </Title>
                    <Form.Item

                        name={['user', 'fullName']}
                        label="Full Name"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your Username!'
                            },
                        ]}
                        style={{ width: 400 }}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item

                        name={['user', 'email']}
                        label="Email"
                        rules={[
                            {
                                type: 'email',
                                message: 'The input is not valid E-mail!',
                            },
                            {
                                required: true,
                                message: 'Please input your E-mail!',
                            },
                        ]}
                        style={{ width: 400 }}

                    >
                        <Input />
                    </Form.Item>
                    <Form.Item

                        name={['user', 'password']}
                        label="Password"
                        rules={[
                            {
                                required: true,
                                message: 'Please confirm your password!',
                            }
                        ]}
                        style={{ width: 400 }}>
                        <Input.Password />
                    </Form.Item>
                    <Form.Item name={['user', 'phone']} label="Phone" style={{ width: 400 }}>
                        <Input />
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
};
export default AddUser;