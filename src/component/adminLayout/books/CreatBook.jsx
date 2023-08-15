import { Button, Col, Form, Input, InputNumber, Modal, Row, Select, Typography, message } from 'antd'
import { useForm } from 'antd/es/form/Form';
import React, { useState } from 'react'
import AddThumbnail from './AddThumbnail';


const CreatBook = () => {
    const [form] = Form.useForm();
    const [fileList, setFileList] = useState([]);
    //Tạo list Image hiện thị AddThumb
    const [image, setImage] = useState([]);
    const [thumbnail, setThumbnail] = useState();

    // Modal
    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = () => {

        //Check điều kiện Form hợp lệ hay chưa
        form.validateFields()
            .then(values => {
                console.log("info Book:", values)
                console.log("image", thumbnail)
                setIsModalOpen(false);
                form.resetFields();
            })
            .catch(() => message.error('Vui lòng nhập đầy đủ các trường thông tin'))

    };
    const handleCancel = () => {
        form.resetFields();
        setFileList([]);
        setImage([])
        setIsModalOpen(false);
    };
    return (
        <div>

            <Button type="primary" onClick={showModal}>
                Open Modal
            </Button>
            <Modal width={900} title="Thêm mới sách" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                <Form form={form}>
                    <Row style={{ gap: 10 }}>
                        <Col span={11}>
                            <Form.Item label="Tên sách" name="mainText"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Vui lòng nhập tên',
                                    },
                                ]}
                            >
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col span={11}>
                            <Form.Item label="Tác giả" name='author'
                                rules={[
                                    {
                                        required: true,
                                        message: 'Vui lòng nhập tên tác giả',
                                    },
                                ]}
                            >
                                <Input />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row style={{ gap: 20 }}>
                        <Col span={6}>
                            <Form.Item label="Giá sách" name='price' rules={[
                                {
                                    required: true,
                                    message: 'Vui lòng nhập giá',
                                },
                            ]} >
                                <InputNumber min={0} addonAfter="VND" />
                            </Form.Item>
                        </Col>
                        <Col span={5}>
                            <Form.Item label="Thể loại" name="category">
                                <Select
                                    // defaultValue="lucy"
                                    style={{
                                        width: 120,
                                    }}
                                    // onChange={handleChange}
                                    options={[
                                        {
                                            value: 'jack',
                                            label: 'Jack',
                                        },
                                        {
                                            value: 'lucy',
                                            label: 'Lucy',
                                        },
                                        {
                                            value: 'Yiminghe',
                                            label: 'yiminghe',
                                        },
                                        {
                                            value: 'disabled',
                                            label: 'Disabled',
                                            disabled: true,
                                        },
                                    ]}
                                />
                            </Form.Item>
                        </Col>
                        <Col span={5}>
                            <Form.Item label="Số lượng" name='quantity' rules={[
                                {
                                    required: true,
                                    message: 'Vui lòng nhập số lượng sách',
                                },
                            ]}>
                                <InputNumber />
                            </Form.Item>
                        </Col>
                        <Col span={5}>
                            <Form.Item label="Đã bán" name="sold">
                                <InputNumber />
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
                <Typography.Title level={4}>Hình đại diện sách</Typography.Title>
                <AddThumbnail image={image} setImage={setImage} setThumbnail={setThumbnail} />
            </Modal>
        </div >
    )
}

export default CreatBook