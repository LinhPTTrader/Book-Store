import { useState } from 'react'
import './home.scss'
import { useEffect } from 'react';
import { getCategory } from '../../services/api';
import ListBook from './ListBook';

const Home = () => {
    const [listCategory, setListCategory] = useState([]);


    useEffect(() => {
        getCategory()
            .then(res => {
                if (res && res.data) {
                    setListCategory(res.data)
                }
            })
    }, [])
    return (
        <div className='flex'>
            <div className='w-15 category'>
                <div>
                    <h4>Danh mục sản phẩm</h4>
                    <ul style={{ paddingTop: 20 }}>
                        {listCategory.map(item => (<li key={item} className='listCategory'>{item}</li>))}
                    </ul>
                </div>
            </div>
            <div className='w-85 listBook'>
                <div>
                    <div className='flex gap-20'>
                        <span className='titleListBook'>Phổ biến</span >
                        <span className='titleListBook'>Bán chạy</span >
                        <span className='titleListBook'>Hàng mới</span >
                        <span className='titleListBook'>Giá thấp đến cao</span >
                        <span className='titleListBook'   >Giá cao đến thấp</span >
                    </div>
                </div>
                <div className='showListBook'>
                    <ListBook />
                </div>
            </div>
        </div>
    )
}

export default Home