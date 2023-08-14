import React, { useState } from 'react';
import { InboxOutlined } from '@ant-design/icons';
import { Button, message, Modal, Table, Upload } from 'antd';
import { AiOutlineExport } from 'react-icons/ai';
import * as XLSX from 'xlsx';
import { postListUser } from '../../../services/api';


const UploadFile = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [listData, setListData] = useState([]);
    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = () => {
        if (listData.length > 0) {
            console.log(listData)
            postListUser(listData)
                .then(res => {
                    console.log(res)
                    if (res.statusCode == 400) {
                        message.error('Error param list users')
                    }
                    else if (res.statusCode == 201) {
                        message.success('Add list users success ')
                    } else {
                        message.error('File Error')
                    }
                })
        }
        setIsModalOpen(false);
        setListData([]);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };

    // Table
    const [loading, setLoading] = useState(false);
    const columns = [
        {
            title: 'Name',
            dataIndex: 'fullName',
            key: 'name',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        }, {
            title: 'Phone',
            dataIndex: 'phone',
            key: 'phone',
        }, {
            title: 'Password',
            dataIndex: 'password',
            key: 'password'
        }
    ];
    // Upload File
    const { Dragger } = Upload;
    const dummyRequest = async ({ file, onSuccess }) => {
        setTimeout(() => {
            onSuccess("ok");
        }, 1000);
    }

    const props = {
        name: 'file', // Tên  File Upload
        // multiple: true, // Upload nhiều file, false upload 1 file
        multiple: false,
        maxCount: 1, // Chỉ cho phép upload 1 file duy nhất
        // accept: ' CSV files (.csv), Excel Files 97-2003 (.xls), Excel Files 2007+ (.xlsx) ', // Cho phép upload những loại file nào
        // action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76', // Truyền File vào Server
        //https://stackoverflow.com/questions/51514757/action-function-is-required-with-antd-upload-control-but-i-dont-need-it
        customRequest: dummyRequest,
        onChange(info) {
            const { status } = info.file;
            if (status !== 'uploading') {
                // console.log(info.file, info.fileList);
            }
            if (status === 'done') {
                // Lấy file từ Component Ant DeSign, Nhớ Log info để xem 
                const file = info.fileList[0].originFileObj;
                // console.log(file)
                const reader = new FileReader(); // Tạo reader đọc file
                reader.readAsArrayBuffer(file); // Lưu ý dòng này

                reader.onload = (e) => {
                    const data = new Uint8Array(e.target.result);
                    const workbook = XLSX.read(data, { type: "array" });
                    const worksheet = workbook.Sheets[workbook.SheetNames[0]];

                    const jsonData = XLSX.utils.sheet_to_json(worksheet);
                    setListData(jsonData);
                    // console.log('jsondata', jsonData);

                    // reader.readAsArrayBuffer(file);
                }
                message.success(`${info.file.name} file uploaded successfully.`);
            } else if (status === 'error') {
                message.error(`${info.file.name} file upload failed.`);
            }
        },
        onDrop(e) {
            console.log('Dropped files', e.dataTransfer.files);
        },
    };

    return (<div>
        <Button type="primary" icon={<AiOutlineExport />} onClick={showModal}>
            Import
        </Button>
        <Modal maskClosable={true} title="Import File" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
            <Dragger {...props}>
                <p className="ant-upload-drag-icon">
                    <InboxOutlined />
                </p>
                <p className="ant-upload-text">Click or drag file to this area to upload</p>
                <p className="ant-upload-hint">
                    Support for a single or bulk upload. Strictly prohibited from uploading company data or other
                    banned files.
                </p>
            </Dragger>
            <Table
                columns={columns}
                loading={loading}
                dataSource={listData}
                direction="vertical"
                // pagination={pagination}
                // onChange={handleTableChange}
                rowKey="email"
            />
        </Modal>
    </div>)
};
export default UploadFile;