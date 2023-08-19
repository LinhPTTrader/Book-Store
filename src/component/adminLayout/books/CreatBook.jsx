import { Button, Col, Form, Input, InputNumber, Modal, Row, Select, Typography, message } from 'antd'
import { useForm } from 'antd/es/form/Form';
import React, { useEffect, useState } from 'react'
import AddThumbnail from './AddThumbnail';

import { getCategory, postBook } from '../../../services/api';
import CESlider from './CESlider';


const CreatBook = ({ changeTable, setChangeTable }) => {
    const [form] = Form.useForm();
    //Tạo list Image hiện thị AddThumb
    const [image, setImage] = useState([]); // Biến này để set Image phần Thumbnail
    const [thumbnail, setThumbnail] = useState(null);
    // List Slider
    const [slider, setSlider] = useState([])
    const [listImage, setListImage] = useState([])
    const [listCategory, setListCategory] = useState([])

    //Category
    useEffect(() => {
        getCategory()
            .then(res => {
                if (res && res.data) {
                    setListCategory(res.data.map(item => ({
                        value: item,
                        label: item
                    })))
                }
            })
    }, [])


    // Modal
    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = () => {

        //Check điều kiện Form hợp lệ hay chưa
        form.validateFields()
            .then(values => {
                // console.log("info Book:", values)
                // console.log("image", thumbnail)
                // console.log('listSlider', slider)

                let newSlider = slider.map(item => item.name);
                let book = values;
                book = { ...book, thumbnail: thumbnail, slider: newSlider }
                postBook(book)
                    .then(res => {
                        if (res && res.data) {
                            console.log(res)
                            message.success('Thêm mới thành công')
                            setIsModalOpen(false);
                            form.resetFields();
                            setImage([]);
                            setSlider([]);
                            setListImage([]);
                            setThumbnail(null);
                            setChangeTable(!changeTable)
                        } else {
                            message.error(res.message)
                        }
                    })

            })
            .catch(() => message.error('Vui lòng nhập đầy đủ các trường thông tin'))

    };
    const handleCancel = () => {
        // console.log(slider)
        form.resetFields();
        setImage([]);
        setSlider([]);
        setListImage([]);
        setThumbnail(null)
        setIsModalOpen(false);
    };
    return (
        <div style={{ padding: 20 }}>
            <Button type="primary" onClick={showModal}>
                Thêm Sách
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
                                    options={listCategory}
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
                <Typography.Title level={5}>Hình đại diện sách</Typography.Title>
                <AddThumbnail image={image} setImage={setImage} setThumbnail={setThumbnail} />
                <Typography.Title level={5}>Thêm mô tả hình ảnh cho sách</Typography.Title>
                {/* <AddListSliser slider={slider} listImage={listImage} setListImage={setListImage} setSlider={setSlider} /> */}
                <CESlider slider={slider} setSlider={setSlider} />
            </Modal>
        </div >
    )
}

export default CreatBook