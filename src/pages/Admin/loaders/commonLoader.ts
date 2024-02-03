import axios from 'axios'
import { getTokenFromLocalStorage } from '../../../helper/localstorage.helper'
import { IExpenseIncomesAllPointsData } from '../../../types/IExpenseIncomesAllPointsData'

export interface ICommonLoader {
	common: IExpenseIncomesAllPointsData[]
}

export const commonLoader = async () => {
	const currentDate = new Date()
	const lastMonthDate = new Date()
	lastMonthDate.setMonth(currentDate.getMonth() - 1)
	const commonData = await axios.post<IExpenseIncomesAllPointsData[]>(
		`http://localhost:3000/api/statistics/points`,
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
