import { createSlice } from '@reduxjs/toolkit'

const adminauthSlice = createSlice({
    name: 'adminauth',
    initialState: { admintoken: null , adminInfo:{} },
    reducers: {
        setAdminCredentials: (state, action) => {
            state.admintoken = action.payload.adminToken
            state.adminInfo = action.payload.user || action.payload.foundUser
        },
        setAdminToken: (state,action) => {
            state.admintoken = null
            state.adminInfo = {}
        },
        setAdminSalonToken: (state,action) => {
            state.admintoken = null
        }
    }
})

export const { setAdminCredentials, setAdminToken, setAdminSalonToken} = adminauthSlice.actions

export default adminauthSlice.reducer

export const selectCurrentAdminToken = (state) => state.adminauth.admintoken
export const selectCurrentAdminInfo = (state) => state.adminauth.adminInfo