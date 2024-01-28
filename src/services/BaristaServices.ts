import axios from 'axios'
import { getTokenFromLocalStorage } from '../helper/localstorage.helper'
import { IBaristaUpdateData } from '../types/IBaristaUpdateData'
import { IIngredientQuantityUpdate } from '../types/IIngredientQuantityUpdate'

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
}
