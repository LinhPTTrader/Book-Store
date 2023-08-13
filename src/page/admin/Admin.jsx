
import AdminHearder from "../../component/adminLayout/adminHeader/AdminHearder"
import { Space } from "antd"
import SideMenuAdmin from "../../component/adminLayout/sideMenuAdmin/SideMenuAdmin"
import AdminContent from "../../component/adminLayout/adminContent/AdminContent"
import AdminFooter from "../../component/adminLayout/adminFooter/AdminFooter"
import './admin.scss'
import { Outlet } from "react-router-dom"

const Admin = () => {
    return (
        <div className="view-page flex flex-col">
            <AdminHearder />
            <div className="flex contentAdmin">
                <div className="w-15" >
                    <SideMenuAdmin />
                </div>
                <div className="w-85 ">
                    <Outlet />
                </div>
            </div>


            <AdminFooter />
        </div>
    )
}

export default Admin