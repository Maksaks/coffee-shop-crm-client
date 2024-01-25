import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { IBaristaData } from '../types/IBaristaData'

interface BaristaState {
	barista: IBaristaData | null
	IsAuth: boolean
}

const initialState: BaristaState = {
	barista: null,
	IsAuth: false,
}

export const baristaSlice = createSlice({
	name: 'barista',
	initialState,
	reducers: {
		loginBarista: (state, action: PayloadAction<IBaristaData>) => {
			state.barista = action.payload
			state.IsAuth = true
		},
		logoutBarista: state => {
			state.barista = null
			state.IsAuth = false
		},
	},
})

export const { loginBarista, logoutBarista } = baristaSlice.actions

export default baristaSlice.reducer
