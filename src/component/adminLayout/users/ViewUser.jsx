import React, { useState } from 'react';
import { Button, Card, Descriptions, Drawer, Space } from 'antd';
const ViewUser = ({ user }) => {
    const [open, setOpen] = useState(false);
    const showLargeDrawer = () => {
        console.log(user)
        setOpen(true);
    };
    const onClose = () => {
        setOpen(false);
    };
    const items = [
        {
            key: '1',
            label: 'Avatar',
            children: <img className="avatar" src={`user.avatar || ../../../../public/noavatar.png`} />,
        },
        {
            key: '2',
            label: 'ID',
            children: user._id,

        },
        {
            key: '3',
            label: 'Name',
            children: user.fullName,

        },
        {
            key: '4',
            label: 'Telephone',
            children: user.phone,

        },
        {
            key: '5',
            label: 'email',
            children: user.email,

        },
        {
            key: '6',
            label: 'ROLE',
            children: user.role,

        },
        {
            key: '7',
            label: 'createdAt',
            children: user.createdAt,

        },
        {
            key: '8',
            label: 'updatedAt',
            children: user.updatedAt,
        }

    ];
    return (
        <>
            <Space>
                <Button type="primary" onClick={showLargeDrawer}>
                    Info
                </Button>
            </Space>
            <Drawer
                title='Info User'
                placement="right"
                size='large'
                onClose={onClose}
                open={open}
                extra={
                    <Space>
                        <Button onClick={onClose}>Cancel</Button>
                        <Button type="primary" onClick={onClose}>
                            OK
                        </Button>
                    </Space>
                }
            >
                <Descriptions
                    items={items}
                />
            </Drawer>
        </>
    );
};
export default ViewUser;