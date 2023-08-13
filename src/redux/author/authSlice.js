import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { callAccount } from "../../services/api";

const initialState = {
    isAuthenticated: localStorage.getItem('access_token') ? true : false,
    // isAuthenticated: false,
    user: {
        email: "",
        phone: "",
        fullName: "",
        role: "",
        avatar: "",
        id: ""
    }
}


export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        doLoginAction: (state, action) => {
            // console.log(action.payload);
            state.isAuthenticated = true;
            state.user = action.payload;
        },
        doGetAccount: (state, action) => {
            // console.log('getAccount')
            state.isAuthenticated = true;
            state.user = action.payload;
        },
        doLogout: (state) => {
            localStorage.removeItem('access_token')
            state.isAuthenticated = false;
            state.user = {
                email: "",
                phone: "",
                fullName: "",
                role: "",
                avatar: "",
                id: ""
            }
        }
    },

})

export const { doLoginAction, doGetAccount, doLogout } = authSlice.actions
export default authSlice.reducer