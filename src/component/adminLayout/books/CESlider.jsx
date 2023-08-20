import { useEffect, useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Button, Modal, Upload } from 'antd';
import { postListImageBook } from '../../../services/api';

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
    useEffect(() => {
        console.log(slider)
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
        console.log(newFileList)
        if (slider.length > newFileList.length) {
            let arr = slider.filter(item => item.uid != fileChange.uid);
            console.log('remove Image')
            setSlider(arr)
        }


    };


    // Post file img lên Server
    const postListFile = ({ file, onSuccess, onError }) => {
        // console.log(file)
        postListImageBook(file)
            .then(res => {
                if (res && res.data) {
                    setSlider(listImage => [...listImage, {
                        name: res.data.fileUploaded,
                        uid: file.uid,
                        status: 'done',
                        url: URL + res.data.fileUploaded
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
                fileList={slider}
                onPreview={handlePreview}
                onChange={handleChange}
                customRequest={postListFile}
                multiple={true}

            >
                {slider.length >= 8 ? null : uploadButton}
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