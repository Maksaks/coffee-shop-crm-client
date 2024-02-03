import axios from 'axios'
import { getTokenFromLocalStorage } from '../../helper/localstorage.helper'
import { ICreatePointData } from '../../types/ICreatePointData'
import { IPointData } from '../../types/IPointData'
import { IUpdatePointData } from '../../types/IUpdatePointData'

export const PointsService = {
	async createPoint(pointData: ICreatePointData) {
		const { data } = await axios.post<IPointData>(
			'http://localhost:3000/api/admin/points',
			pointData,
			{
				headers: {
					Authorization: 'Bearer ' + getTokenFromLocalStorage(),
				},
			}
		)
		return data
	},
	async deletePoint(pointID: number) {
		await axios.delete(`http://localhost:3000/api/admin/points/${pointID}`, {
			headers: {
				Authorization: 'Bearer ' + getTokenFromLocalStorage(),
			},
		})
	},
	async updatePoint(pointID: number, updatePointData: IUpdatePointData) {
		await axios.patch(
			`http://localhost:3000/api/admin/points/${pointID}`,
			updatePointData,
			{
				headers: {
					Authorization: 'Bearer ' + getTokenFromLocalStorage(),
				},
			}
		)
	},
}
