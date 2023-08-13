import { Card, Space, Statistic, Typography, message } from 'antd'
import React, { useEffect, useState } from 'react'
import { AiFillDashboard, AiOutlineBook, AiOutlineUser, AiFillDollarCircle } from "react-icons/ai";
import { getUserPagination } from '../../../services/api';

const DashboardCard = ({ title, value, icon }) => {
    return (
        //Space tạo khoảng trống ngang giữa cách thành phần
        // Horizontal được sử dụng để chỉ định rằng khoảng trống sẽ được căn chỉnh theo chiều ngang
        <Card>
            <Space direction='horizontal'>
                {icon}
                <Statistic title={title} value={value} />
            </Space>
        </Card>
    )
}

const AdminContent = () => {
    const [totalUser, setTotalUser] = useState();
    useEffect(() => {
        getUserPagination(1, 10).then(res => {
            if (res.statusCode === 200) {
                console.log(res.data.meta.total)
                setTotalUser(res.data.meta.total)
            } else {
                message.error('Loi he thong')
            }
        })
    }, [])
    return (
        <div className='dashboard' >
            <Typography.Title level={4}>Dashboard</Typography.Title>
            <Space direction='horizontal'>
                <DashboardCard icon={<AiFillDollarCircle className='icons-font' />} title="Order" value="1235" />
                <DashboardCard icon={<AiOutlineUser className='icons-font' />} title="User" value={totalUser} />
                <DashboardCard icon={<AiOutlineBook className='icons-font' />} title="Book" value="5555" />
            </Space>

        </div>
    )
}

export default AdminContent