import { Typography } from 'antd'
import React from 'react'

const AdminFooter = () => {
    return (
        <div className='adminFooter flex flex-space-around'>
            <Typography.Link href='tel:123456789'>123456789</Typography.Link>
            <Typography.Link href='https://www.google.com' target='_blank'>Privacy Policy</Typography.Link>
            <Typography.Link href='https://www.google.com' target='_blank'>Made by LinhPhan</Typography.Link>
        </div>
    )
}

export default AdminFooter