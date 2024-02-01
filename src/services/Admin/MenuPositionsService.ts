import axios from 'axios'
import { getTokenFromLocalStorage } from '../../helper/localstorage.helper'
import { ICategoryData } from '../../types/ICategory'
import { IMenuPositionWithRecipeData } from '../../types/IMenuPositionWithRecipe'
import { IPointAllData } from '../../types/IPointAllData'

export const MenuPositionsService = {
	async getPointsWithPositions() {
		const pointsWithPositionsData = await axios.get<IPointAllData[]>(
			`http://localhost:3000/api/admin/points`,
			{
				headers: {
					Authorization: 'Bearer ' + getTokenFromLocalStorage(),
				},
			}
		)
		return pointsWithPositionsData.data
	},
	async getCategories() {
		const categories = await axios.get<ICategoryData[]>(
			`http://localhost:3000/api/admin/categories`,
			{
				headers: {
					Authorization: 'Bearer ' + getTokenFromLocalStorage(),
				},
			}
		)
		return categories.data
	},
	async getMenuPositionInfoByID(pointID: number, positionID: number) {
		const pointsWithPositionsData =
			await axios.get<IMenuPositionWithRecipeData>(
				`http://localhost:3000/api/admin/positions/${pointID}/info/${positionID}`,
				{
					headers: {
						Authorization: 'Bearer ' + getTokenFromLocalStorage(),
					},
				}
			)
		return pointsWithPositionsData.data
	},
}
