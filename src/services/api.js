
import axios from "../utils/axios-custimize";
export const creatUser = async (user) => {

    try {
        const { data } = await axios.post('/api/v1/user/register', user.user);
        return data;
    } catch (err) {
        return 'Loi he thong'
    }
}

export const callLogin = async (user) => {
    try {
        const { data } = await axios.post('/api/v1/auth/login', user);
        return data;
    } catch (err) {
        return 'Loi he thong'
    }
}

export const callAccount = async () => {
    try {
        const { data } = await axios.get('/api/v1/auth/account');
        return data;
    } catch (err) {
        return 'Loi he thong'
    }
}

export const logout = async () => {
    try {
        const { data } = await axios.post('/api/v1/auth/logout');
        return data;
    } catch (err) {
        return 'Loi he thong'
    }
}

export const getAllUser = async () => {
    try {
        const { data } = await axios.get('/api/v1/user');
        return data;
    } catch (err) {
        return 'Loi he thong'
    }
}


export const getUserPagination = async (current, pageSize) => {
    try {
        const { data } = await axios.get(`/api/v1/user?current=${current}&pageSize=${pageSize}`);
        return data;
    } catch (err) {
        return 'Loi he thong'
    }
}

// DELETE USER

export const deleteUser = async (id) => {
    try {
        const { data } = await axios.delete(`/api/v1/user/${id}`);
        return data;
    } catch (err) {
        return 'Loi he thong'
    }
}

//FILTER
export const filterUser = async (query) => {
    console.log(query)
    try {
        const { data } = await axios.get(`/api/v1/user?current=1 &pageSize=10${query} `);
        return data;
    } catch (err) {
        return 'Loi he thong'
    }
}

//SORT 
export const sort = async (query) => {
    // console.log(`/api/v1/user?current=1 &pageSize=10 &sort=${query} `)
    try {
        const { data } = await axios.get(`/api/v1/user?current=1 &pageSize=10 &sort=${query} `);
        return data;
    } catch (err) {
        return 'Loi he thong'
    }
}

// ADD NEW USER BY ADMIN
export const creatUserAdmin = async (user) => {
    // console.log(user)
    try {
        const { data } = await axios.post('/api/v1/user', user);
        return data;
    } catch (err) {
        return 'Loi he thong'
    }
}

export const editUser = async (user) => {
    // console.log(user)
    try {
        const { data } = await axios.put('/api/v1/user', user);
        return data;
    } catch (err) {
        return 'Loi he thong'
    }
}









