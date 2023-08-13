import { Badge, Button, Dropdown, Image, Space, Typography, message } from 'antd'
import React from 'react'
import { AiFillMail, AiFillBell } from "react-icons/ai";
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../../../services/api';
import { useDispatch, useSelector } from 'react-redux';
import { doLogout } from '../../../redux/author/authSlice';

const AdminHearder = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const user = useSelector(state => state.auth.user)

    const handleLogout = async () => {
        const res = await logout()
        console.log(res);
        if (res.statusCode === 201) {
            message.success(res.data);
            dispatch(doLogout());
            navigate('/');

        } else {
            message.error('Error Server')
        }
    }


    const items = [
        {
            key: '1',
            label: (
                <Link to='/profile'>
                    <span>
                        Quản lý tài khoản
                    </span>
                </Link>
            ),
        },
        {
            key: '2',
            label: (
                <Link onClick={handleLogout}>
                    <span>
                        Đăng xuất
                    </span>
                </Link>
            ),
        },
    ];
    const url = `http://localhost:8080/images/avatar/`;
    return (
        <div className=' adminHeader flex flex-space-between item-center '>
            <Image width={40} src='/logo.svg'></Image>
            <Typography.Title>Admin Dashboard</Typography.Title>
            <Space>
                <Badge count={5} dot>
                    <AiFillMail className='icons-font' />
                </Badge>

                <Badge count={5}>
                    <AiFillBell className='icons-font' />
                </Badge>
                <Dropdown
                    menu={{
                        items,
                    }}
                    placement="bottomRight"
                    arrow
                >
                    <img className="avatar" src={url + user.avatar || `../../../public/noavatar.png`} />
                </Dropdown>
            </Space>

        </div>
    )
}

export default AdminHearder