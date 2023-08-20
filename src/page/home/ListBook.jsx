import React, { useEffect, useState } from 'react'
import { Image, Rate, Typography } from 'antd';
import { getBookPagination } from '../../services/api';
const ListBook = () => {

    const [listBook, setListBook] = useState([]);
    useEffect(() => {
        getBookPagination(20, 1)
            .then(res => {
                if (res && res.data) {
                    console.log(res.data)
                    setListBook(res.data)
                }
            })
    }, [])
    return (
        <div>
            <Image.PreviewGroup
                items={[
                    'https://gw.alipayobjects.com/zos/antfincdn/LlvErxo8H9/photo-1503185912284-5271ff81b9a8.webp',
                    'https://gw.alipayobjects.com/zos/antfincdn/cV16ZqzMjW/photo-1473091540282-9b846e7965e3.webp',
                    'https://gw.alipayobjects.com/zos/antfincdn/x43I27A55%26/photo-1438109491414-7198515b166b.webp',
                ]}
            >
                <Image
                    width={200}
                    src="https://gw.alipayobjects.com/zos/antfincdn/LlvErxo8H9/photo-1503185912284-5271ff81b9a8.webp"
                />
            </Image.PreviewGroup>

            <p>Tên sách</p>
            <div style={{ fontSize: 12 }}>
                <Rate style={{ fontSize: 10 }} disabled defaultValue={5} /> | <span>Đã bán :</span>
            </div>
            <p>215.000 VNĐ</p>
        </div>
    )
}

export default ListBook