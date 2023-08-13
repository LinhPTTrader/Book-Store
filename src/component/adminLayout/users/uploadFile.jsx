import React, { useState } from 'react';
import { InboxOutlined } from '@ant-design/icons';
import { Button, message, Modal, Table, Upload } from 'antd';
import { AiOutlineExport } from 'react-icons/ai';
const { Dragger } = Upload;
const props = {
    name: 'file',
    multiple: true,
    action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
    onChange(info) {
        const { status } = info.file;
        if (status !== 'uploading') {
            console.log(info.file, info.fileList);
        }
        if (status === 'done') {
            message.success(`${info.file.name} file uploaded successfully.`);
        } else if (status === 'error') {
            message.error(`${info.file.name} file upload failed.`);
        }
    },
    onDrop(e) {
        console.log('Dropped files', e.dataTransfer.files);
    },
};

const UploadFile = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };

    // Table
    const [loading, setLoading] = useState(false);
    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
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
        }
    ]
    return (<div>
        <Button type="primary" icon={<AiOutlineExport />} onClick={showModal}>
            Import
        </Button>
        <Modal title="Import File" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
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
                // dataSource={listUser}
                direction="vertical"
            // pagination={pagination}
            // onChange={handleTableChange}
            // rowKey="_id"
            />
        </Modal>
    </div>)
};
export default UploadFile;