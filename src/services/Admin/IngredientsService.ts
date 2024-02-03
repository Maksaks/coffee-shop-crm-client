import axios from 'axios'
import { getTokenFromLocalStorage } from '../../helper/localstorage.helper'
import { ICreateIngredient } from '../../types/ICreateIngredient'
import { IIngredientData } from '../../types/IIngredientData'
import { IUpdateIngredient } from '../../types/IUpdateIngredientData'

export const IngredientsService = {
	async getIngredientsForPoint(pointID: number) {
		const { data } = await axios.get<IIngredientData[]>(
			`http://localhost:3000/api/admin/ingredients/${pointID}`,
			{
				headers: {
					Authorization: 'Bearer ' + getTokenFromLocalStorage(),
				},
			}
		)
		return data
	},
	async createIngredientOnPoint(
		pointID: number,
		createIngredientData: ICreateIngredient
	) {
		await axios.post(
			`http://localhost:3000/api/admin/ingredients/${pointID}`,
			createIngredientData,
			{
				headers: {
					Authorization: 'Bearer ' + getTokenFromLocalStorage(),
				},
			}
		)
	},
	async updateIngredient(
		ingredientID: number,
		updateIngredientData: IUpdateIngredient
	) {
		await axios.patch(
			`http://localhost:3000/api/admin/ingredients/${ingredientID}`,
			updateIngredientData,
			{
				headers: {
					Authorization: 'Bearer ' + getTokenFromLocalStorage(),
				},
			}
		)
	},
	async deleteIngredientByID(ingredientID: number) {
		await axios.delete(
			`http://localhost:3000/api/admin/ingredients/${ingredientID}`,
			{
				headers: {
					Authorization: 'Bearer ' + getTokenFromLocalStorage(),
				},
			}
		)
	},
}
