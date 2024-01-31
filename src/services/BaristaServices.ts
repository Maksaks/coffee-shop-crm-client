import axios from 'axios'
import { getTokenFromLocalStorage } from '../helper/localstorage.helper'
import { IBaristaUpdateData } from '../types/IBaristaUpdateData'
import { ICreateOrderData } from '../types/ICreateOrderData'
import { ICreatedOrderResultData } from '../types/ICreatedOrderResultData'
import { IIngredientQuantityUpdate } from '../types/IIngredientQuantityUpdate'
import { ITakeMoneyAmount } from '../types/ITakeMoneyAmount'

export const BaristaService = {
	async updateBarista(updateBaristaData: IBaristaUpdateData) {
		await axios.patch<IBaristaUpdateData>(
			'http://localhost:3000/api/barista',
			updateBaristaData,
			{
				headers: {
					Authorization: 'Bearer ' + getTokenFromLocalStorage(),
				},
			}
		)
	},
	async updateIngredientQuantity(
		quantity: IIngredientQuantityUpdate,
		ingredientID: number,
		pointID: number
	) {
		await axios.post<IIngredientQuantityUpdate>(
			`http://localhost:3000/api/barista/ingredients/${ingredientID}/onPoint/${pointID}`,
			quantity,
			{
				headers: {
					Authorization: 'Bearer ' + getTokenFromLocalStorage(),
				},
			}
		)
	},
	async takeMoneyFromPointBalance(amount: ITakeMoneyAmount, pointID: number) {
		await axios.post<ITakeMoneyAmount>(
			`http://localhost:3000/api/barista/points/${pointID}/takeMoney`,
			amount,
			{
				headers: {
					Authorization: 'Bearer ' + getTokenFromLocalStorage(),
				},
			}
		)
	},
	async createOrder(orderData: ICreateOrderData) {
		const { data } = await axios.post<ICreatedOrderResultData>(
			`http://localhost:3000/api/barista/orders`,
			orderData,
			{
				headers: {
					Authorization: 'Bearer ' + getTokenFromLocalStorage(),
				},
			}
		)
		return data
	},
}
