import React from 'react';
import './signUp.scss'
import { Button, Form, Input, InputNumber, message } from 'antd';
import { Typography } from 'antd';
import { creatUser } from '../../services/api';
import { useNavigate } from 'react-router-dom';

const { Title } = Typography;
const layout = {
    labelCol: {
        span: 8,
    },
    wrapperCol: {
        span: 16,
    },
};


const SignUp = () => {
    const navigate = useNavigate()

    const onFinish = async (user) => {
        console.log(user)
        const data = await creatUser(user);
        if (data.statusCode === 400) {
            message.warning(data.message)
        } else if (data.statusCode === 201) {
            message.success('Signup success');
            navigate('/login')
        } else {
            message.error('Error server')
        }
    };

    return (
        <div className='signUp'>

            <Form

                {...layout}
                name="nest-messages"
                onFinish={onFinish}
                style={{
                    maxWidth: 600,
                }}
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
                <Form.Item
                    wrapperCol={{
                        ...layout.wrapperCol,
                        offset: 6,
                    }}
                >
                    <Button type="primary" htmlType="submit" >
                        Register
                    </Button>
                </Form.Item>
            </Form>
        </div>
    )
};
export default SignUp;