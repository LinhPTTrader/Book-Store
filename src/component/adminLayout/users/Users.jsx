import { Button, Modal, Popconfirm, Space, Table, Typography, message } from 'antd';
import { useEffect, useState } from 'react';
import { deleteUser, filterUser, getAllUser, getUserPagination, sort } from '../../../services/api';
import { Input } from 'antd';
import { AiOutlineCloudDownload, AiOutlineExport, AiOutlinePlus, AiOutlineSearch } from 'react-icons/ai';
import ViewUser from './ViewUser';
import EditUser from './EditUser';
import AddUser from './Adduser';
import UploadFile from './uploadFile';





const Users = () => {
    const [listUser, setListUser] = useState([]);
    const [loading, setLoading] = useState(false);
    const [isDeleteUser, setIsDeleteUser] = useState(false);
    const [pagination, setPagination] = useState({
        current: 1,
        pageSize: 10,
        total: 0,
    });

    // GET ALL USERS
    const getData = async () => {
        const res = await getAllUser();
        if (res.statusCode === 200) {
            setListUser(res.data)
            setLoading(false)
        } else {
            message.error('Loi Server')
        }
    }
    // GET USERS PAGINATION 
    const getPagination = async () => {
        const res = await getUserPagination(pagination.current, pagination.pageSize);
        setListUser(res.data.result);
        setLoading(false)
        setPagination(prevPagination => ({ ...prevPagination, total: res.data.meta.total })
        )
    }


    // Khởi tạo listUser
    useEffect(() => {
        setLoading(true);
        getPagination();
    }, [])

    // Khởi tạo khi sang trang table
    useEffect(() => {
        setLoading(true);
        getPagination();
    }, [pagination.current, pagination.pageSize])
    const handleTableChange = (pagination) => {
        setPagination(pagination);
    };

    // Cập nhật lại dữ liệu Table khi xóa, cập nhật
    useEffect(() => {
        getPagination()
    }, [isDeleteUser])


    // Delete User - Comfirm
    const confirm = (id) => {
        console.log(id);
        deleteUser(id).then(res => {
            if (res.statusCode === 200) {
                message.success('Delete Done!');
                setIsDeleteUser(!isDeleteUser)
            } else {
                message.error('Không thành công')
            }
        }).catch(err => message.error(err))
    };

    // Xử lý Filter theo Name, Email, Phone
    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [phone, setPhone] = useState();
    const handleFilterUser = async () => {
        let query = '';
        if (name) {
            query += `&fullName=/${name}/i`
        }
        if (email) { query += `&email=/${email}/i` }


        if (phone) {
            query += `&phone=/${phone}/i`
        }
        const res = await filterUser(query);
        console.log(res);
        if (res && res.data) {

            setListUser(res.data.result);
            setLoading(false)
        }
    }

    const handleSort = async (name) => {
        const res = await sort(name);
        if (res && res.data) {
            setListUser(res.data.result)
            setLoading(false)
        }
    }

    const url = `http://localhost:8080/images/avatar/`;
    console.log('render')
    const columns = [
        {
            title: "Avatar",
            dataIndex: 'avatar',
            render: (avatar) => <img className="avatar" src={url + avatar} />,
            key: 1,

        },
        {
            title: "Name",
            dataIndex: 'fullName',
            sorter: true,
            onHeaderCell: () => ({
                onClick: () => handleSort('fullName'),
            }),
            key: 2
        },
        {
            title: "Email",
            dataIndex: 'email',
            sorter: true,
            onHeaderCell: () => ({
                onClick: () => handleSort('email'),
            }),
            key: 3

        },
        {
            title: "Phone",
            dataIndex: 'phone',
            key: 4

        },
        {
            title: "Role",
            dataIndex: 'role',
            key: 5
        },
        {
            title: 'Action',
            key: 6,
            render: (user) => (

                <div className='action'>
                    <EditUser user={user} setIsDeleteUser={setIsDeleteUser} isDeleteUser={isDeleteUser} />
                    <ViewUser user={user} />
                    <Popconfirm
                        title="Delete user"
                        description="Are you sure to delete this user?"
                        onConfirm={() => confirm(user._id)}
                        okText="Yes"
                        cancelText="No"
                    >
                        <Button danger>Delete</Button>
                    </Popconfirm>

                </div>

            ),
        },
    ]

    return (
        <div className='users' >
            <div className='flex wrap gap-2 searchUsers'>
                <div className='w-32'>
                    <Typography.Title level={5}>Name</Typography.Title>
                    <Input placeholder="Name" onChange={(e) => setName(e.target.value)} />
                </div>
                <div className='w-32'>
                    <Typography.Title level={5}>Email</Typography.Title>
                    <Input placeholder="Email" onChange={(e) => setEmail(e.target.value)} />

                </div>
                <div className='w-32'>
                    <Typography.Title level={5}>Phone</Typography.Title>
                    <Input placeholder="Phone" onChange={(e) => setPhone(e.target.value)} />
                </div>
                <div className='w-32 margin-left flex just-end btnSearchUser gap-2'>
                    <Button type="primary" icon={<AiOutlineSearch />} onClick={() => handleFilterUser()}>
                        Search
                    </Button>
                    <Button onClick={() => getPagination()}>Clear</Button>
                </div>
            </div>
            <div>
                <div className='menuTable'>
                    <div></div>
                    <div className='btnTableGroup'>
                        <UploadFile></UploadFile>
                        {/* <Button
                            type="primary"
                            icon={<AiOutlineCloudDownload />}

                            onClick={() => enterLoading(1)}
                        >
                            Import
                        </Button> */}
                        <AddUser setIsDeleteUser={setIsDeleteUser} isDeleteUser={isDeleteUser} />
                    </div>
                </div>
                <Table
                    columns={columns}
                    loading={loading}
                    dataSource={listUser}
                    direction="vertical"
                    pagination={pagination}
                    onChange={handleTableChange}
                    rowKey="_id"
                />
            </div>
        </div>
    )
}
export default Users;