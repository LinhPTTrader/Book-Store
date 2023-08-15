import React, { useEffect, useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Modal, Upload } from 'antd';
import { postListImageBook } from '../../../services/api';

import { v4 as uuidv4 } from 'uuid'; // Lấy UI duy nhất

// Base 64 Xử lý files >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
const getBase64 = (file) =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
    });

const AddListSliser = ({ slider, setSlider, listImage, setListImage }) => {

    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [previewTitle, setPreviewTitle] = useState('');

    // Xử lý File >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
    const handleCancel = () => {
        setListImage([]);
        setPreviewOpen(false);

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
        console.log('Mang image upload: ', newArr)
        console.log('Mang Slide', slider)
        if (slider.length > newArr.length) {
            const newArr2 = []
            slider.forEach(element => {
                newArr.forEach(value => {
                    if (element.uid === value.uid) {
                        newArr2.push(element);
                    }
                })
            });
            setSlider(newArr2);
        }
        setListImage(newArr)

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
        postListImageBook(file)
            .then(res => {
                if (res && res.data) {
                    setSlider(slider => [...slider, {
                        name: res.data.fileUploaded,
                        uid: file.uid
                    }]);
                    // setSlider(slider => [...slider, res.data.fileUploaded]);

                    //onSuccess('Upload thành công')
                }
            })
            .catch(err => onError('Upload thất bại'))
    }

    return (
        <>
            <Upload
                listType="picture-card"
                fileList={listImage}
                onPreview={handlePreview}
                onChange={handleChange}
                customRequest={postListFile}
                multiple={true}
            >
                {listImage.length >= 8 ? null : uploadButton}
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
    )
}

export default AddListSliser