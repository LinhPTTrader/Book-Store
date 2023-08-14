import { Button, Input, Typography } from 'antd';
import React, { useState } from 'react'
import { AiOutlineSearch } from 'react-icons/ai';
import { filterBook, getBookPagination } from '../../../services/api';

const FilterBook = (props) => {
    const [mainText, setMainText] = useState();
    const [author, setAuthor] = useState();

    const handleFilterUser = () => {
        let query = '';
        if (mainText) {
            query += `&mainText=/${mainText}/i`
        }
        if (author) {
            query += `&author=/${author}/i`
        }
        filterBook(query)
            .then(res => {
                if (res && res.data) {
                    props.setListBooks(res.data.result);
                    props.setLoading(false)
                }
            })
    }

    //Thiết lập mặc định Table
    const clearTable = () => {
        getBookPagination(1, 10)
            .then(res => {
                if (res && res.data) {
                    props.setListBooks(res.data.result)
                }
            })
    }
    return (
        <div className='flex wrap gap-2 searchUsers'>
            <div className='w-32'>
                <Typography.Title level={5}>Tên sách</Typography.Title>
                <Input placeholder="Tên Sách" onChange={(e) => setMainText(e.target.value)} />
            </div>
            <div className='w-32'>
                <Typography.Title level={5}>Tác giả</Typography.Title>
                <Input placeholder="Tác giả" onChange={(e) => setAuthor(e.target.value)} />

            </div>
            <div className='w-32 margin-left flex just-end btnSearchUser gap-2'>
                <Button type="primary" icon={<AiOutlineSearch />} onClick={() => handleFilterUser()}>
                    Search
                </Button>
                <Button onClick={() => clearTable()}>Clear</Button>
            </div>
        </div>
    )
}

export default FilterBook;