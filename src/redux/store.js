import { configureStore } from '@reduxjs/toolkit'
import authReducer from './author/authSlice'

export const store = configureStore({
    reducer: {
        auth: authReducer
    }
})