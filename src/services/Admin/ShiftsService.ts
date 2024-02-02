import axios from 'axios'
import { getTokenFromLocalStorage } from '../../helper/localstorage.helper'
import { IShiftData } from '../../types/IShiftData'

export const ShiftsService = {
	async getShiftsByBarista(baristaID: number) {
		const { data } = await axios.get<IShiftData[]>(
			`http://localhost:3000/api/admin/shifts/barista/${baristaID}`,
			{
				headers: {
					Authorization: 'Bearer ' + getTokenFromLocalStorage(),
				},
			}
		)
		return data
	},
	async deleteShiftByID(shiftID: number) {
		await axios.delete<IShiftData[]>(
			`http://localhost:3000/api/admin/shifts/${shiftID}`,
			{
				headers: {
					Authorization: 'Bearer ' + getTokenFromLocalStorage(),
				},
			}
		)
	},
}
