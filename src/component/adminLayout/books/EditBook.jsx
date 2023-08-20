import React, { useEffect, useState } from 'react';
import { Button, Col, Form, Input, InputNumber, Modal, Row, Select, message } from 'antd';
import EditThumbnail from './EditThumbnail';
import { editBook, getCategory } from '../../../services/api';
import CESlider from './CESlider';
import { v4 as uuidv4 } from 'uuid'; // Lấy UI duy nhất

const EditBook = ({ book, changeTable, setChangeTable }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [form] = Form.useForm();
    const [listCategory, setListCategory] = useState([])
    const [dataBook, setDataBook] = useState(book);
    const [thumbnail, setThumbnail] = useState(book.thumbnail);
    const [slider, setSlider] = useState(book.slider);
    const URL = `http://localhost:8080/images/book/`;

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
            });
        setSlider(slider.map(item => ({
            uid: uuidv4(),
            status: 'done',
            name: item,
            url: URL + item

        })));
    }, [])

    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = () => {
        // Da Edit duoc Thumbnail
        let newSlider = slider.map(item => item.name)
        let bookData = { ...form.getFieldsValue(), slider: newSlider, thumbnail }
        console.log(bookData)
        editBook(bookData, book._id)
            .then(res => {
                if (res && res.data) {
                    setChangeTable(!changeTable)
                    message.success('Thay đổi thành công')
                } else {
                    message.error('Có lỗi xảy ra')
                }
            })
        setIsModalOpen(false);

    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };


    // Tạo dự liệu Form
    useEffect(() => {
        form.setFieldsValue(dataBook)
    }, [dataBook])
    return (
        <div>
            <Button type="primary" onClick={showModal}>
                Edit
            </Button>
            <Modal width={900} title="Basic Modal" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                <Form
                    form={form}
                    name={book._id}
                >
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
                <div>
                    {/* slider={slider} setSlider={setSlider} */}
                    <EditThumbnail thumbnail={thumbnail} setThumbnail={setThumbnail} />
                    {/* <EditListSlider slider={slider} setSlider={setSlider} /> */}
                    <CESlider slider={slider} setSlider={setSlider} />
                </div>
            </Modal>
        </div>
    )
}

export default EditBook