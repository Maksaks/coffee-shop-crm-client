import axios from 'axios'
import { getTokenFromLocalStorage } from '../../../helper/localstorage.helper'
import { IAllBaristaShiftsAndSalaryData } from '../../../types/IAllBaristaShiftsAndSalaryData'

export interface IAllBaristaSalaryLoader {
	common: IAllBaristaShiftsAndSalaryData[]
}

export const allBaristasSalaryLoader = async () => {
	const currentDate = new Date()
	const lastMonthDate = new Date()
	lastMonthDate.setMonth(currentDate.getMonth() - 1)
	const commonData = await axios.post<IAllBaristaShiftsAndSalaryData[]>(
		`http://localhost:3000/api/statistics/baristas`,
		{
			from: lastMonthDate.toISOString(),
			to: currentDate.toISOString(),
		},
		{
			headers: {
				Authorization: 'Bearer ' + getTokenFromLocalStorage(),
			},
		}
	)
	return { common: commonData.data }
}
