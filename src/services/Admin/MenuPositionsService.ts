import axios from 'axios'
import { getTokenFromLocalStorage } from '../../helper/localstorage.helper'
import { ICategoryData } from '../../types/ICategory'
import { ICreateMenuPosition } from '../../types/ICreateMenuPosition'
import { IMenuPositionWithRecipeData } from '../../types/IMenuPositionWithRecipe'
import { IPointAllData } from '../../types/IPointAllData'
import {
	IUpdateRecipeIngredients,
	IUpdateRecipeSteps,
} from '../../types/IUpdateRecipe'

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
	async deleteMenuPositionByID(pointID: number, positionID: number) {
		await axios.delete(
			`http://localhost:3000/api/admin/positions/${pointID}/delete/${positionID}`,
			{
				headers: {
					Authorization: 'Bearer ' + getTokenFromLocalStorage(),
				},
			}
		)
	},
	async createMenuPosition(pointID: number, createData: ICreateMenuPosition) {
		const pos = await axios.post<IMenuPositionWithRecipeData>(
			`http://localhost:3000/api/admin/positions/${pointID}`,
			createData,
			{
				headers: {
					Authorization: 'Bearer ' + getTokenFromLocalStorage(),
				},
			}
		)
		return pos.data
	},
	async updateMenuPosition(
		pointID: number,
		positionID: number,
		updateData: ICreateMenuPosition
	) {
		await axios.patch(
			`http://localhost:3000/api/admin/positions/${pointID}/update/${positionID}`,
			updateData,
			{
				headers: {
					Authorization: 'Bearer ' + getTokenFromLocalStorage(),
				},
			}
		)
	},
	async updateMenuPositionSteps(
		pointID: number,
		positionID: number,
		updateData: IUpdateRecipeSteps
	) {
		await axios.patch(
			`http://localhost:3000/api/admin/positions/${pointID}/update/${positionID}`,
			updateData,
			{
				headers: {
					Authorization: 'Bearer ' + getTokenFromLocalStorage(),
				},
			}
		)
	},
	async updateMenuPositionIngredients(
		pointID: number,
		positionID: number,
		updateData: IUpdateRecipeIngredients
	) {
		await axios.patch(
			`http://localhost:3000/api/admin/positions/${pointID}/update/${positionID}`,
			updateData,
			{
				headers: {
					Authorization: 'Bearer ' + getTokenFromLocalStorage(),
				},
			}
		)
	},
}
