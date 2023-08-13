import axios from "axios";


const baseUrl = import.meta.env.VITE_BACKENDURL

const instance = axios.create({
    baseURL: baseUrl,
    withCredentials: true
});

// Gởi access token lên server
instance.defaults.headers.common = { 'Authorization': `Bearer ${localStorage.getItem('access_token')}` }

// Add a request interceptor
instance.interceptors.request.use(function (config) {
    // Do something before request is sent
    return config;
}, function (error) {
    // Do something with request error
    return Promise.reject(error);
});

// Add a response interceptor
instance.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
}, function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    if (error.config && error.response && +error.response.status === 401) {
        // return updateToken().then((token))
        instance.get('/api/v1/auth/refresh')
            .then(res => {
                console.log(res.data)
                localStorage.setItem('access_token', res.data.data.access_token);
                error.config.headers.Authorization = `Bearer  ${res.data.data.access_token}`;
                return instance.request(error.config)
            })

    }
    // if (error.config && error.response && +error.response.status === 400 && error.config.url === '/api/v1/auth/refresh') {
    //     console.log('ok')
    //     window.location.href = '/login';
    //     return;
    // }
    return error && error.response ? error.response : Promise.reject(error);
});
export default instance;