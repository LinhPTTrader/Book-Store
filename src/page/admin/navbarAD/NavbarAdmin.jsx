import './Navbar.scss'

const NavbarAdmin = () => {
    return (
        <div className="navbarAdmin">
            <div className='logoNavAdmin'>
                <img src='/logo.svg' alt='logo' />
                <span>LinhDevAdmin</span>
            </div>
            <div className='icons'>
                <img src='/search.svg' alt='icon' className='icon' />
                <img src='/app.svg' alt='icon' className='icon' />
                <img src='/expand.svg' alt='icon' className='icon' />

                <div className='notification'>
                    <img src='/notifications.svg' />
                    <span className='badge ' >1</span>
                </div>
                <div className='userFooter'>
                    <img src='/noavatar.png' />
                    <span>Linh</span>
                </div>
                <img src='/setting.svg' alt='icon' className='icon' />
            </div>
        </div>
    )
}

export default NavbarAdmin;