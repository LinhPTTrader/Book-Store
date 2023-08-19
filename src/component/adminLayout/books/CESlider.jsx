import { useEffect, useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Button, Modal, Upload } from 'antd';
import { postListImageBook } from '../../../services/api';
import { v4 as uuidv4 } from 'uuid'; // Lấy UI duy nhất
const getBase64 = (file) =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
    });

const CESlider = ({ slider, setSlider }) => {
    const URL = `http://localhost:8080/images/book/`;
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [previewTitle, setPreviewTitle] = useState('');
    const [fileList, setFileList] = useState([]); // Biến này sẽ lưu những File ban đầu or không có file nào

    useEffect(() => {
        let list = slider.map(item => ({
            uid: uuidv4(),
            status: 'done',
            name: item,
            url: URL + item

        }))
        setSlider(list);
        setFileList(list);
    }, [])


    const handleCancelImage = () => setPreviewOpen(false);

    const handlePreview = async (file) => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        setPreviewImage(file.url || file.preview);
        setPreviewOpen(true);
        setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf('/') + 1));
    }

    // Khi có sự thây đổi hình ảnh
    const handleChange = (
        { fileList: newFileList, file: fileChange }) => {
        const newArr = newFileList.map(item => {
            return {
                ...item, status: 'done'

            }
        })
        // TH1
        if (slider.length > newArr.length) {
            let arr = slider.filter(item => item.uid != fileChange.uid);
            console.log('remove Image')
            setSlider(arr)
        }
        setFileList(newArr)
    };

    // Post file img lên Server
    const postListFile = ({ file, onSuccess, onError }) => {
        // console.log(file)
        postListImageBook(file)
            .then(res => {
                if (res && res.data) {
                    setSlider(listImage => [...listImage, {
                        name: res.data.fileUploaded,
                        uid: file.uid
                    }])
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
        <div>


            <Upload
                // action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                listType="picture-card"
                fileList={fileList}
                onPreview={handlePreview}
                onChange={handleChange}
                customRequest={postListFile}
            >
                {fileList.length >= 8 ? null : uploadButton}
            </Upload>
            <Modal open={previewOpen} title={previewTitle} footer={null} onCancel={handleCancelImage}>
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

export default CESlider