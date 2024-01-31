import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { IPointData } from '../../types/IPointData'
import { IBaristaData } from '../types/IBaristaData'

export interface BaristaState {
	barista: IBaristaData | null
	point: IPointData | null
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
		setPointData: (state, action: PayloadAction<IPointData>) => {
			state.point = action.payload
			state.IsAuth = true
		},
		putMoneyOnPointBalance: (state, action) => {
			if (!state.point) return
			const updateInfoPoint = {
				...state.point,
				pointMoney: state.point.pointMoney + action.payload,
			}
			state.point = updateInfoPoint
		},
	},
})

export const {
	loginBarista,
	logoutBarista,
	setPointData,
	putMoneyOnPointBalance,
} = baristaSlice.actions

export default baristaSlice.reducer
