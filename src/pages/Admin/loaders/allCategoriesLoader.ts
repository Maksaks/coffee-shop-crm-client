import axios from 'axios'
import { getTokenFromLocalStorage } from '../../../helper/localstorage.helper'
import { ICategoriesOrdersIncomesData } from '../../../types/ICategoriesOrdersIncomesData'

export interface IAllCategoriesIncomesLoader {
	common: ICategoriesOrdersIncomesData[]
}

export const allCategoriesLoader = async () => {
	const currentDate = new Date()
	const lastMonthDate = new Date()
	lastMonthDate.setMonth(currentDate.getMonth() - 1)
	const commonData = await axios.post<ICategoriesOrdersIncomesData[]>(
		`http://localhost:3000/api/statistics/categories`,
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
