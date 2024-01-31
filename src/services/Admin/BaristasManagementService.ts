import axios from 'axios'
import { getTokenFromLocalStorage } from '../../helper/localstorage.helper'
import { IBaristaUpdateData } from '../../types/IBaristaUpdateData'
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
}
