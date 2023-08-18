import { useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Modal, Upload } from 'antd';
import { v4 as uuidv4 } from 'uuid';
import { postListImageBook } from '../../../services/api';
const getBase64 = (file) =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
    });

const EditListSlider = ({ slider, setSlider }) => {
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [previewTitle, setPreviewTitle] = useState('');
    const URL = `http://localhost:8080/images/book/`;
    const [fileList, setFileList] = useState(slider.map(image => ({
        uid: uuidv4(),
        name: image,
        status: 'done',
        url: URL + image,
    })))


    const handleCancel = () => setPreviewOpen(false);
    const handlePreview = async (file) => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        setPreviewImage(file.url || file.preview);
        setPreviewOpen(true);
        setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf('/') + 1));
    };
    const handleChange = ({ fileList: newFileList }) => {
        console.log(newFileList)
        const newArr = newFileList.map(item => {
            return {
                ...item, status: 'done'

            }
        })
        // console.log('Mang image upload: ', newArr)
        // console.log('Mang Slide', slider)
        if (slider.length > newArr.length) {
            const newArr2 = []
            fileList.forEach(element => {
                newArr.forEach(value => {
                    console.log(element.uid, value.uid)
                    if (element.uid === value.uid) {
                        newArr2.push(element);
                    }
                })
            });
            setSlider(newArr2);
        }
        setFileList(newArr)

    };
    const postListFile = ({ file, onSuccess, onError }) => {
        postListImageBook(file)
            .then(res => {
                if (res && res.data) {
                    console.log(res)
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

                listType="picture-card"
                fileList={fileList}
                onPreview={handlePreview}
                onChange={handleChange}
                customRequest={postListFile}
                multiple={true}
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
            </Modal>
        </div>
    )
}

export default EditListSlider