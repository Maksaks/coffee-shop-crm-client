import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { IMenuPositionWithRecipeData } from '../../types/IMenuPositionWithRecipe'
import { ISelectedPosition } from '../../types/ISelectedPosition'

interface OrderState {
	selectedMenuPositions: ISelectedPosition[]
	totalAmount: number
}

const initialState: OrderState = {
	selectedMenuPositions: [],
	totalAmount: 0,
}

export const orderSlice = createSlice({
	name: 'order',
	initialState,
	reducers: {
		addToOrder: (state, action: PayloadAction<IMenuPositionWithRecipeData>) => {
			if (
				state.selectedMenuPositions.find(
					item => item.position.id == action.payload.id
				)
			)
				return
			state.selectedMenuPositions = [
				...state.selectedMenuPositions,
				{ position: action.payload, amount: 1 },
			]
			if (
				action.payload.discount &&
				new Date(action.payload.discount.endAt) > new Date()
			) {
				state.totalAmount += Math.round(
					(action.payload.price * (100 - action.payload.discount.amount)) / 100
				)
			} else {
				state.totalAmount += action.payload.price
			}
		},
		removeFromOrder: (state, action: PayloadAction<ISelectedPosition>) => {
			state.selectedMenuPositions = state.selectedMenuPositions.filter(
				item => item.position.id != action.payload.position.id
			)
			if (
				action.payload.position.discount &&
				new Date(action.payload.position.discount.endAt) > new Date()
			) {
				state.totalAmount -=
					Math.round(
						(action.payload.position.price *
							(100 - action.payload.position.discount.amount)) /
							100
					) * action.payload.amount
			} else {
				state.totalAmount -=
					action.payload.position.price * action.payload.amount
			}
		},
		updateOrderPosition: (state, action: PayloadAction<ISelectedPosition>) => {
			const changedPos = state.selectedMenuPositions.find(
				item => item.position.id == action.payload.position.id
			)
			if (!changedPos) return
			const positionID = state.selectedMenuPositions.indexOf(changedPos)
			if (
				state.selectedMenuPositions[positionID].amount > action.payload.amount
			) {
				if (
					action.payload.position.discount &&
					new Date(action.payload.position.discount.endAt) > new Date()
				) {
					state.totalAmount -= Math.round(
						(action.payload.position.price *
							(100 - action.payload.position.discount.amount)) /
							100
					)
				} else {
					state.totalAmount -= action.payload.position.price
				}
			} else {
				if (
					action.payload.position.discount &&
					new Date(action.payload.position.discount.endAt) > new Date()
				) {
					state.totalAmount += Math.round(
						(action.payload.position.price *
							(100 - action.payload.position.discount.amount)) /
							100
					)
				} else {
					state.totalAmount += action.payload.position.price
				}
			}
			const newArray = [...state.selectedMenuPositions]
			newArray[positionID] = action.payload
			state.selectedMenuPositions = newArray
		},
		clearOrder: state => {
			state.selectedMenuPositions = []
			state.totalAmount = 0
		},
	},
})

export const { addToOrder, removeFromOrder, updateOrderPosition, clearOrder } =
	orderSlice.actions

export default orderSlice.reducer
