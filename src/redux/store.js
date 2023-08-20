import { configureStore } from '@reduxjs/toolkit'
import authReducer from './author/authSlice'
import paginationReducer from './author/paginationSlice'

export const store = configureStore({
    reducer: {
        auth: authReducer,
        pagination: paginationReducer
    }
})