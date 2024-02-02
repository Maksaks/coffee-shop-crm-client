import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { IUpdateAdminInfo } from '../../types/IUpdateAdminInfo'
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
		updateAdminInfo: (state, action: PayloadAction<IUpdateAdminInfo>) => {
			if (!state.admin) return
			const newAdmin: IAdminData = {
				id: state.admin.id,
				name: action.payload.name ? action.payload.name : state.admin.name,
				surname: action.payload.surname
					? action.payload.surname
					: state.admin.surname,
				email: action.payload.email ? action.payload.email : state.admin.email,
				role: state.admin.role,
			}
			state.admin = newAdmin
		},
	},
})

export const { loginAdmin, logoutAdmin, updateAdminInfo } = adminSlice.actions

export default adminSlice.reducer
