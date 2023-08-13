import { Menu } from 'antd'
import { AiFillDashboard, AiOutlineBook, AiOutlineUser, AiFillDollarCircle, AiOutlineUsergroupAdd, AiOutlineUsergroupDelete } from "react-icons/ai";
import { useNavigate } from 'react-router-dom';
import { DownOutlined } from '@ant-design/icons';
import { Dropdown, Space } from 'antd';
const items = [
    { label: "CRUD", icon: <AiOutlineUsergroupAdd />, key: '/admin/users' },
    { label: "Files", icon: <AiOutlineUsergroupDelete />, key: '/admin/files' }
];


const SideMenuAdmin = () => {
    const navigate = useNavigate();
    return (
        <div className='sideMenu'>
            <Menu mode="inline"
                onClick={(item) => {
                    navigate(item.key)
                }}
                items={[
                    { label: "Dashboard", icon: <AiFillDashboard />, key: '/admin' },
                    { label: "Manager Users", icon: <AiOutlineUser />, children: items },
                    { label: "Manager Books", icon: <AiOutlineBook />, key: '/admin/books' },
                    { label: "Manager Orders", icon: <AiFillDollarCircle />, key: '/admin/orders' },
                ]}>

            </Menu>
        </div>
    )
}

export default SideMenuAdmin