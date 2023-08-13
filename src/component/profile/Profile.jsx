import { useSelector } from "react-redux"


const Profile = () => {
    const user = useSelector(state => state.auth.user)
    return (
        <div>
            <h5>Name: {user.fullName}</h5>
            <h5>Email: {user.email}</h5>
            <h5>Phone: {user.phone}</h5>
            <h5>Role: {user.role}</h5>
        </div>
    )
}

export default Profile