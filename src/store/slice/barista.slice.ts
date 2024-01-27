import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { IPointAllData } from '../../types/IPointAllData'
import { IBaristaData } from '../types/IBaristaData'

interface BaristaState {
	barista: IBaristaData | null
	point: IPointAllData | null
	IsAuth: boolean
}

const initialState: BaristaState = {
	barista: null,
	IsAuth: false,
	point: null,
}

export const baristaSlice = createSlice({
	name: 'barista',
	initialState,
	reducers: {
		loginBarista: (state, action: PayloadAction<IBaristaData>) => {
			state.barista = action.payload
		},
		logoutBarista: state => {
			state.barista = null
			state.IsAuth = false
			state.point = null
		},
		setPointData: (state, action: PayloadAction<IPointAllData>) => {
			state.point = action.payload
			state.IsAuth = true
		},
	},
})

export const { loginBarista, logoutBarista, setPointData } =
	baristaSlice.actions

export default baristaSlice.reducer
