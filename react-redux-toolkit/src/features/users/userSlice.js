import { createSlice } from "@reduxjs/toolkit";

const initialState = [
    { id: '0', name: 'John Doe' },
    { id: '1', name: 'Peter Parker' },
    { id: '2', name: 'Iron Man' }
]

const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {}
})

export const selectAllUsers = (state) => state.users;

export default usersSlice.reducer