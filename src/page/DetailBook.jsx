import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { getBookId } from '../services/api';
import { Image } from 'antd';
import { v4 as uuidv4 } from 'uuid'; // Lấy UI duy nhất


const DetailBook = () => {
    const { state } = useLocation();
    const [book, setBook] = useState({});
    const url = `http://localhost:8080/images/book/`;
    useEffect(() => {
        // console.log(state.id)

        getBookId(state.id)
            .then(res => {
                if (res && res.data) {
                    console.log(res)
                    setBook(res.data)
                }
            })
    }, [])
    return (
        <div className='flex just-center'>
            <div className='container flex just-center text-center'>
                <div className='w-32'>
                    <Image
                        width={300}
                        src={url + book.thumbnail}
                    />
                    <div className='detailListBook'>
                        <Image.PreviewGroup style={{ gap: 10 }}
                            preview={{
                                onChange: (current, prev) => console.log(`current index: ${current}, prev index: ${prev}`),
                            }}
                        >   {book.slider?.map(item => (
                            <Image key={uuidv4()} width={100} src={url + item} />
                        ))}


                        </Image.PreviewGroup>
                    </div>
                </div>
                <div className='w-68 bg-blue'>
                    vbb
                </div>
            </div>
        </div>
    )
}

export default DetailBook