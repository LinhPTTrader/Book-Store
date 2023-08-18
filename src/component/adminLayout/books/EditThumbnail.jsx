import React, { useEffect, useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Modal, Upload } from 'antd';
import { v4 as uuidv4 } from 'uuid'; // Lấy UI duy nhất
import { postListImageBook } from '../../../services/api';
const getBase64 = (file) =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
    });
const EditThumbnail = ({ thumbnail, setThumbnail }) => {
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [previewTitle, setPreviewTitle] = useState('');
    const URL = `http://localhost:8080/images/book/`;
    const [fileList, setFileList] = useState([{
        uid: uuidv4(),
        name: thumbnail,
        status: 'done',
        url: URL + thumbnail,
    }]);

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
    const handleChange = ({ fileList: newFileList }) => {
        const newArr = newFileList.map(item => {
            return {
                ...item, status: 'done'

            }
        })
        setFileList([newArr[newArr.length - 1]])
    };

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
    return (
        <div><Upload
            // action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
            listType="picture-card"
            fileList={fileList}
            onPreview={handlePreview}
            onChange={handleChange}
            customRequest={postListFile}
            showUploadList={
                { showRemoveIcon: false }
            } // Xóa Icon Remove
        >
            {fileList.length >= 8 ? null : uploadButton}
        </Upload>
            <Modal open={previewOpen} title={previewTitle} footer={null} onCancel={handleCancel}>
                <img
                    alt="example"
                    style={{
                        width: '100%',
                    }}
                    src={previewImage}
                />
            </Modal></div>
    )
}

export default EditThumbnail