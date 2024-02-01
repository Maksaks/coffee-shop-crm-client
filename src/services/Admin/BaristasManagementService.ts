import axios from 'axios'
import { getTokenFromLocalStorage } from '../../helper/localstorage.helper'
import { IBaristaAllData } from '../../types/IBaristaAllData'
import { IBaristaUpdateData } from '../../types/IBaristaUpdateData'
import { ICreateBaristasData } from '../../types/ICreateBaristaData'
import { IPointAllData } from '../../types/IPointAllData'

export const BaristasManagementService = {
	async setPointToBarista(baristaID: number, pointID: number) {
		await axios.post<string>(
			`http://localhost:3000/api/admin/barista/${baristaID}/setPoint/${pointID}`,
			{},
			{
				headers: {
					Authorization: 'Bearer ' + getTokenFromLocalStorage(),
				},
			}
		)
	},
	async removePointFromBarista(baristaID: number, pointID: number) {
		await axios.post<string>(
			`http://localhost:3000/api/admin/barista/${baristaID}/removePoint/${pointID}`,
			{},
			{
				headers: {
					Authorization: 'Bearer ' + getTokenFromLocalStorage(),
				},
			}
		)
	},
	async getPoints() {
		const pointsData = await axios.get<IPointAllData[]>(
			`http://localhost:3000/api/admin/points`,
			{
				headers: {
					Authorization: 'Bearer ' + getTokenFromLocalStorage(),
				},
			}
		)
		return pointsData.data
	},
	async updateBaristaInfo(
		baristaID: number,
		updateBarista: IBaristaUpdateData
	) {
		await axios.patch<IBaristaUpdateData[]>(
			`http://localhost:3000/api/admin/baristas/${baristaID}`,
			updateBarista,
			{
				headers: {
					Authorization: 'Bearer ' + getTokenFromLocalStorage(),
				},
			}
		)
	},
	async deleteBarista(baristaID: number) {
		await axios.delete(
			`http://localhost:3000/api/admin/baristas/${baristaID}`,
			{
				headers: {
					Authorization: 'Bearer ' + getTokenFromLocalStorage(),
				},
			}
		)
	},
	async createBarista(createBaristaData: ICreateBaristasData) {
		const { data } = await axios.post<IBaristaAllData>(
			`http://localhost:3000/api/admin/baristas`,
			createBaristaData,
			{
				headers: {
					Authorization: 'Bearer ' + getTokenFromLocalStorage(),
				},
			}
		)
		return data
	},
}