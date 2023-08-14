import React, { useState } from 'react';
import { Button, Descriptions, Drawer, Space } from 'antd';
import ListImage from './ListImage';
const ViewBook = ({ book }) => {
    const [open, setOpen] = useState(false);
    const showLargeDrawer = () => {
        console.log(book)
        setOpen(true);
    };
    const onClose = () => {
        setOpen(false);
    };
    const url = `http://localhost:8080/images/book/`;
    const items = [
        {
            key: '1',
            label: 'Ảnh',
            children: <img className="avatar" src={url + book.thumbnail} />,
        },
        {
            key: '2',
            label: 'ID',
            children: book._id,

        },
        {
            key: '3',
            label: 'Tên Sách',
            children: book.mainText,

        },
        {
            key: '4',
            label: 'Tác giả',
            children: book.author,

        },
        {
            key: '5',
            label: 'Giá',
            children: book.price,

        },
        {
            key: '6',
            label: 'Đã bán',
            children: book.sold,

        },
        {
            key: '7',
            label: 'Số lượng',
            children: book.quantity,

        },
        {
            key: '8',
            label: 'Thể loại',
            children: book.category,

        },
        {
            key: '9',
            label: 'createdAt',
            children: book.createdAt,

        },
        {
            key: '10',
            label: 'updatedAt',
            children: book.updatedAt,
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
                title='Thông tin chi tiết sách'
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
                <ListImage book={book} />
            </Drawer>
        </>
    );
};
export default ViewBook;