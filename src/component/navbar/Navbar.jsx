import './navbar.scss';
import logo from '../../../public/sach-hay.png'
import img from '../../../public/search.png'
import { Link, useNavigate } from 'react-router-dom'
import { Button, Dropdown, message } from 'antd';
import { Avatar, Badge, Space } from 'antd';
import { AiOutlineShoppingCart } from "react-icons/ai";
import { logout } from '../../services/api';
import { useDispatch, useSelector } from 'react-redux';
import { doLogout } from '../../redux/author/authSlice';
import { doPagination } from '../../redux/author/paginationSlice';


const Navbar = (props) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector(state => state.auth.user)
    const handleLogout = async () => {
        const res = await logout()
        console.log(res);
        if (res.statusCode === 201) {
            message.success(res.data);
            props.setProfile(false);
            dispatch(doLogout());
            navigate('/');

        } else {
            message.error('Error Server')
        }
    }

    // 
    const items = [
        {
            key: '1',
            label: (
                <Link to='profile'>
                    <span>
                        Quản lý tài khoản
                    </span>
                </Link>
            ),
        },
        {
            key: '2',
            label: (
                <Link to='profile' onClick={handleLogout}>
                    <span>
                        Đăng xuất
                    </span>
                </Link>
            ),
        },
    ];

    const url = `http://localhost:8080/images/avatar/`;
    return (
        <div className='navBar'>
            <div onClick={() => {
                dispatch(doPagination(1))
                navigate('/')
            }} className='navImg'>
                <img src={logo} />
            </div>
            <div className='navSearch'>
                <img src={img}></img>
                <input type='text' placeholder='Tìm kiếm sách, tác giả' />
                <button>Tìm Kiếm </button>
            </div>
            <div className='navButton'>
                <div>
                    Trang Chu
                </div>
                <div>
                    {!props.profile && <Button onClick={() => {
                        navigate('/login')
                    }}> Tài khoản</Button>}
                    {props.profile && <Dropdown
                        menu={{
                            items,
                        }}
                        placement="bottomRight"
                        arrow
                    >
                        <Avatar size="large" src={url + user.avatar} />
                    </Dropdown>}

                </div>
                <div className='order'>
                    <Badge size="small" count={5}>
                        <Avatar icon={<AiOutlineShoppingCart />} size="large" style={{ background: 'none', color: 'red' }} />
                    </Badge>
                </div>
            </div>
        </div >
    )
}

export default Navbar