import { doLoginAction } from '../../redux/author/authSlice';
import { callLogin } from '../../services/api';
import './login.scss'
import { Button, Checkbox, Form, Input, Tooltip, Typography, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

const { Title } = Typography;
const Login = (props) => {
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const onFinish = async (user) => {
        const res = await callLogin(user)
        console.log(res)
        if (res.statusCode === 400) {
            message.error(res.message)
        } else if (res.statusCode >= 200 && res.statusCode < 300) {
            message.success('Login success');

            // Lưu access token vào localStorage
            localStorage.setItem('access_token', res.data.access_token);

            // Lưu User vào Redux Toolkit
            dispatch(doLoginAction(res.data.user));

            // Login thành công thì set Login thành Profile
            props.setProfile(true)

            // Điều hướng nếu ROLE là ADMIN sẽ chuyển đến trang ADMIN, còn lại chuyển đến PROFILE của người đăng nhập
            if (res.data.user.role === 'ADMIN') {
                navigate('/admin')
            } else {
                navigate('/profile')
            }

        } else {
            message.error('Error server')
        }
    };
    const onFinishFailed = (errorInfo) => {
        message.error('Username and Password can not be empty')
    };
    return (
        <div className='formLogin'>
            <Form
                name="basic"
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
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                <Title level={2}>Đăng nhập </Title>
                <Form.Item
                    label="Email"
                    name="username"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your email!',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Password"
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your password!',
                        },
                    ]}
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item
                    name="remember"
                    valuePropName="checked"
                    wrapperCol={{
                        offset: 8,
                        span: 16,
                    }}
                >
                    <Checkbox>Remember me</Checkbox>
                </Form.Item>

                <Form.Item
                    wrapperCol={{
                        offset: 8,
                        span: 16,
                    }}
                >
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                    <Tooltip className='createAccount' title="Useful information">
                        <Typography.Link href="./signup">Bạn chưa có tài khoản</Typography.Link>
                    </Tooltip>
                </Form.Item>
            </Form>
        </div>
    )
}

export default Login