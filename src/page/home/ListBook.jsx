import React, { useEffect, useState } from 'react'
import { Image, Rate, Typography } from 'antd';
import { getBookPagination } from '../../services/api';
import { Pagination } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { doPagination } from '../../redux/author/paginationSlice';

const ListBook = () => {

    const [listBook, setListBook] = useState([]);
    const url = `http://localhost:8080/images/book/`;
    const [total, setTotal] = useState(0);
    const navigate = useNavigate();

    const current = useSelector(state => state.pagination.currentDefault)
    const dispath = useDispatch()
    useEffect(() => {
        getBookPagination(current, 10)
            .then(res => {
                if (res && res.data) {
                    // console.log(res.data)
                    setListBook(res.data.result)
                    setTotal(res.data.meta.total)
                }
            })
    }, [])

    const handleChangePanigation = (page, pageSize) => {
        dispath(doPagination(page))
        getBookPagination(page, pageSize)
            .then(res => {
                if (res && res.data) {
                    setListBook(res.data.result)
                }
            })
    }
    console.log('render')
    return (
        <>
            <div className='flex wrap'>
                {listBook.map(item => (
                    <div key={item._id} className='descriptionBook gap-10 flex-col text-center'>
                        <Image
                            width={200}
                            src={url + item.thumbnail}
                        />
                        <div onClick={() => navigate("/book", {
                            state: { id: item._id }
                        })}>
                            <p>{item.mainText}</p>
                            <div style={{ fontSize: 12 }}>
                                <Rate style={{ fontSize: 10 }} disabled defaultValue={5} /> | <span>Đã bán : {item.sold}</span>
                            </div>
                            <p>{item.price} VNĐ</p>
                        </div>
                    </div>
                ))}
            </div>
            <Pagination defaultCurrent={current} defaultPageSize={10} total={total} onChange={handleChangePanigation} />
        </>
    )
}

export default ListBook