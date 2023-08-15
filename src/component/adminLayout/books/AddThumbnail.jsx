import React, { useEffect, useState } from 'react';
import { Modal, Upload } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

import { v4 as uuidv4 } from 'uuid'; // Lấy UI duy nhất
import { postListImageBook } from '../../../services/api';

// Base 64 Xử lý files >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
const getBase64 = (file) =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
    });

const AddThumbnail = ({ setThumbnail, image, setImage }) => {
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [previewTitle, setPreviewTitle] = useState('');
    const URL = `http://localhost:8080/images/book/`;


    // Xử lý File >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
    const handleCancel = () => {
        setPreviewOpen(false)
    };
    const handlePreview = async (file) => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        setPreviewImage(file.url || file.preview);
        setPreviewOpen(true);
        setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf('/') + 1));
    };

    //Thêm or thay đổi Image
    const handleChange = ({ fileList: newFileList }) => {

        const newArr = newFileList.map(item => {
            return {
                ...item, status: 'done'

            }
        })
        setImage([newArr[newArr.length - 1]])
    };
    //=>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
    const uploadButton = (
        <div>
            <PlusOutlined />
            <div
                style={{
                    marginTop: 8,
                }}
            >
                Upload
            </div>
        </div>
    );


    // Post file img lên Server
    const postListFile = ({ file, onSuccess, onError }) => {
        // console.log(file)
        postListImageBook(file)
            .then(res => {
                if (res && res.data) {
                    // console.log(res.data)
                    setThumbnail(res.data.fileUploaded)
                    //onSuccess('Upload thành công')
                }
            })
        //.catch(err => onError('Upload thất bại'))
    }
    return (
        <div>
            <Upload
                listType="picture-card"
                fileList={image}
                onPreview={handlePreview}
                onChange={handleChange}
                customRequest={postListFile}
                showUploadList={
                    { showRemoveIcon: false }
                } // Xóa Icon Remove
            >
                {image.length >= 8 ? null : uploadButton}
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
        </div>
    )
}

export default AddThumbnail