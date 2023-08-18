
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

// GET USER PAGINATION
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

//SORT USER THEO NAME, EMAIL
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

// Post ListUser
export const postListUser = async (listUser) => {
    // console.log(user)
    console.log(typeof (listUser))
    try {
        const { data } = await axios.post('/api/v1/user/bulk-create', listUser);
        return data;
    } catch (err) {
        return 'Loi he thong'
    }
}
// =>>>>>>>>>>>>>>>>>>>>>>>>>>>>> BOOOK <<<<<<<<<<<<<<<<<<<<<<<==//

export const getBookPagination = async (current, pageSize) => {
    try {
        const { data } = await axios.get(`/api/v1/book?current=${current}&pageSize=${pageSize}`);
        return data;
    } catch (err) {
        return 'Loi he thong'
    }
}

//SORT BOOK THEO Tên sách và Tác giả
export const sortBook = async (query) => {
    // console.log(`/api/v1/user?current=1 &pageSize=10 &sort=${query} `)
    try {
        const { data } = await axios.get(`/api/v1/book?current=1 &pageSize=10 &sort=${query} `);
        return data;
    } catch (err) {
        return 'Loi he thong'
    }
}


//FILTER BOOKS THEO TÊN SÁCH VÀ TÊN TÁC GIẢ
export const filterBook = async (query) => {
    console.log(query)
    try {
        const { data } = await axios.get(`/api/v1/book?current=1 &pageSize=10${query} `);
        return data;
    } catch (err) {
        return 'Loi he thong'
    }
}

// DELETE BOOK
export const deleteBook = async (id) => {
    console.log(id)
    try {
        const { data } = await axios.delete(`/api/v1/book/${id}`);
        return data;
    } catch (err) {
        return 'Loi he thong'
    }
}

// CREATE BOOK

// ADD NEW USER BY ADMIN
export const createBook = async (book) => {
    // console.log(user)
    try {
        const { data } = await axios.post('/api/v1/book', book);
        return data;
    } catch (err) {
        return 'Loi he thong'
    }
}

// GET CATEGORY
export const getCategory = async () => {
    // console.log(user)
    try {
        const { data } = await axios.get('/api/v1/database/category');
        return data;
    } catch (err) {
        return 'Loi he thong'
    }
}


export const postListImageBook = async (fileImg) => {
    // console.log(user)
    // console.log(fileImg)
    try {
        // console.log(fileImg)
        const bodyFormData = new FormData();
        bodyFormData.append('fileImg', fileImg);
        // console.log(bodyFormData)
        const { data } = await axios({
            method: 'post',
            url: '/api/v1/file/upload',
            data: bodyFormData,
            headers: {
                "Content-Type": "multipart/form-data",
                "upload-type": "book"
            },
        });;
        return data;
    } catch (err) {
        return 'Loi he thong'
    }
}

// Thêm mới Book
export const postBook = async (book) => {
    // console.log(book)
    try {
        const { data } = await axios.post('/api/v1/book', book);
        console.log(data)
        return data;
    } catch (err) {
        return 'Loi he thong'
    }
}


