import { createSlice } from "@reduxjs/toolkit"


const initialState = {
    currentDefault: 1
}

export const paginationSlice = createSlice({
    name: 'pagination',
    initialState,
    reducers: {
        doPagination: (state, action) => {
            console.log(action.payload)
            state.currentDefault = action.payload
        }
    }
})

export const { doPagination } = paginationSlice.actions;
export default paginationSlice.reducer;