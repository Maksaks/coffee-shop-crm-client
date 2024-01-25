import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { IAdminData } from '../types/IAdminData'

interface AdminState {
	admin: IAdminData | null
	IsAuth: boolean
}

const initialState: AdminState = {
	admin: null,
	IsAuth: false,
}

export const adminSlice = createSlice({
	name: 'admin',
	initialState,
	reducers: {
		loginAdmin: (state, action: PayloadAction<IAdminData>) => {
			state.admin = action.payload
			state.IsAuth = true
		},
		logoutAdmin: state => {
			state.admin = null
			state.IsAuth = false
		},
	},
})

export const { loginAdmin, logoutAdmin } = adminSlice.actions

export default adminSlice.reducer
