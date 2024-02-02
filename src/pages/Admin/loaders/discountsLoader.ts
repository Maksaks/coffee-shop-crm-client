import axios from 'axios'
import { getTokenFromLocalStorage } from '../../../helper/localstorage.helper'
import { IDiscountAllData } from '../../../types/IDiscountAllData'

export interface IDiscountLoader {
	discounts: IDiscountAllData[]
}

export const discountsLoader = async () => {
	const discounts = await axios.get<IDiscountAllData[]>(
		`http://localhost:3000/api/admin/discounts`,
		{
			headers: {
				Authorization: 'Bearer ' + getTokenFromLocalStorage(),
			},
		}
	)
	return { discounts: discounts.data }
}
