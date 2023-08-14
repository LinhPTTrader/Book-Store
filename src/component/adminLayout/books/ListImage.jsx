import React, { useEffect, useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Modal, Upload } from 'antd';

import { v4 as uuidv4 } from 'uuid'; // Lấy UI duy nhất

// Base 64 Xử lý files >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
const getBase64 = (file) =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
    });
// =>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

const ListImage = ({ book }) => {
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [previewTitle, setPreviewTitle] = useState('');
    const URL = `http://localhost:8080/images/book/`;
    const [fileList, setFileList] = useState([
    ]);
    useEffect(() => {
        console.log(book)
        // Khởi tạo listImage với giá trị ban đầu là Thumbnail
        let listImage = [
            {
                uid: uuidv4(),
                name: book.thumbnail,
                status: 'done',
                url: URL + book.thumbnail,
            }
        ];
        // Thêm dữ liệu Slider vào listImage để hiện thị ra màn hình
        book.slider.forEach((element,) => {
            let a = {
                uid: uuidv4(),
                name: element,
                status: 'done',
                url: URL + element
            }
            // console.log(a)
            listImage.push(a)
        });
        // console.log(listImage)
        setFileList(listImage)
    }, [])
    // Xử lý File >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
    const handleCancel = () => setPreviewOpen(false);
    const handlePreview = async (file) => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        setPreviewImage(file.url || file.preview);
        setPreviewOpen(true);
        setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf('/') + 1));
    };
    const handleChange = ({ fileList: newFileList }) => setFileList(newFileList);
    //=>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

    return (
        <>
            <Upload
                listType="picture-card"
                fileList={fileList}
                onPreview={handlePreview}
                onChange={handleChange}
                showUploadList={
                    { showRemoveIcon: false }
                } // Xóa Icon Remove
            >
                {/* {fileList.length >= 8 ? null : uploadButton}  Xóa nút Upload*/}
            </Upload >
            <Modal open={previewOpen} title={previewTitle} footer={null} onCancel={handleCancel}>
                <img
                    alt="example"
                    style={{
                        width: '100%',
                    }}
                    src={previewImage}
                />
            </Modal>
        </>
    );
};
export default ListImage;