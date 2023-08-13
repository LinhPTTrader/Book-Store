import { useSelector } from "react-redux"

import { Navigate } from "react-router-dom"
import NotFound403 from "../../component/notfound/NotFound403"



const IsAuthAdmin = ({ children }) => {

    const isAuthenticated = useSelector(state => state.auth.isAuthenticated)
    const role = useSelector(state => state.auth.user.role)
    // console.log(role)
    // console.log(isAuthenticated)
    if (!isAuthenticated) {
        return <Navigate to="/login" replace />
    } else if (role === "ADMIN") {
        return children
    } else {
        return <NotFound403 />
    }
}

export default IsAuthAdmin