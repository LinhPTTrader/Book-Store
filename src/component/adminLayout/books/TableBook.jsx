import { Button, Popconfirm, Slider, Table, message } from 'antd'
import React, { useEffect, useState } from 'react'
import { deleteBook, getBookPagination, sortBook } from '../../../services/api';
import ViewUser from '../users/ViewUser';
import ViewBook from './ViewBook';
import FilterBook from './filterBook';
import CreatBook from './CreatBook';
import EditBook from './EditBook';
import CESlider from './CESlider';



const TableBook = () => {

    const [listBooks, setListBooks] = useState([]); // Danh sách Book
    const [loading, setLoading] = useState(false); // Tạo hiệu ứng loading
    const [changeTable, setChangeTable] = useState(false);
    const [pagination, setPagination] = useState({
        current: 1,
        pageSize: 10,
        total: 0,
    }); // Pagination ban đầu với page đầu tiên, số lượng lấy là 10


    // Thay đổi Pagination Table
    const handleTableChange = (pagination) => {
        // console.log(pagination)
        setPagination(pagination)

    }
    // Khởi tạo bảng table với Page 1 số lượng 10.
    useEffect(() => {
        getBookPagination(pagination.current, pagination.pageSize)
            .then(res => {
                if (res && res.data) {
                    setListBooks(res.data.result)
                    setPagination(prevPagination => ({
                        ...prevPagination, total: res.data.meta.total
                    }))
                }
            })

    }, [])


    // Get book khi thay đổi Panigation 
    useEffect(() => {
        getBookPagination(pagination.current, pagination.pageSize)
            .then(res => {
                if (res && res.data) {

                    setListBooks(res.data.result)
                }
            })
    }, [pagination.current, pagination.pageSize, changeTable])

    // Delete book 
    const removeBook = (id) => {
        deleteBook(id)
            .then(res => {
                console.log(res)
                if (+res.statusCode === 200) {
                    message.success('Xóa thành công')
                    setChangeTable(!changeTable)
                } else {
                    message.error('Xóa thất bại')
                }
            })
    }

    const handleSort = (query) => {
        sortBook(query)
            .then(res => {
                if (res && res.data) {
                    setListBooks(res.data.result)
                }
            })
    }

    const url = `http://localhost:8080/images/book/`;
    const columns = [
        {
            title: 'Ảnh',
            dataIndex: 'thumbnail',
            render: (thumbnail) => <img className="avatar" src={url + thumbnail} />,
            key: '1'
        },
        {
            title: 'Tên sách',
            dataIndex: 'mainText',
            key: '2',
            sorter: true,
            onHeaderCell: () => ({
                onClick: () => handleSort('mainText')
            })
        },
        {
            title: 'Tác giả',
            dataIndex: 'author',
            key: '3',
            sorter: true,
            onHeaderCell: () => ({
                onClick: () => handleSort('author')
            })
        },
        {
            title: 'Giá',
            dataIndex: 'price',
            key: '4'
        },
        {
            title: 'Đã bán',
            dataIndex: 'sold',
            key: '5'
        },
        {
            title: 'Số lượng',
            dataIndex: 'quantity',
            keyL: '6'
        },
        {
            title: 'Thể loại',
            dataIndex: 'category',
            key: '7'
        }, {
            title: 'Action',
            key: '8',
            render: (book) => (
                <div className='action'>
                    <EditBook book={book} changeTable={changeTable} setChangeTable={setChangeTable} />
                    <ViewBook book={book} />
                    <Popconfirm
                        title="Delete user"
                        description="Are you sure to delete this user?"
                        onConfirm={() => removeBook(book._id)}
                        okText="Yes"
                        cancelText="No"
                    >
                        <Button danger>Delete</Button>
                    </Popconfirm>
                </div >
            )
        }
    ]
    return (
        <div style={{ padding: 20 }}>
            <FilterBook setListBooks={setListBooks} setLoading={setLoading} />
            <CreatBook changeTable={changeTable} setChangeTable={setChangeTable} />
            <Table
                columns={columns}
                loading={loading}
                dataSource={listBooks}
                pagination={pagination}
                direction="vertical"
                rowKey="_id"
                onChange={handleTableChange}
            />
        </div>
    )
}

export default TableBook