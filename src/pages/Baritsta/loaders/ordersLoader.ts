import axios from 'axios'
import { getTokenFromLocalStorage } from '../../../helper/localstorage.helper'
import { ICreatedOrderResultData } from '../../../types/ICreatedOrderResultData'

export interface IOrdersForCurrentShiftDataLoader {
	orders: ICreatedOrderResultData[]
}

export const ordersLoader = async () => {
	const ordersData = await axios.get<ICreatedOrderResultData>(
		`http://localhost:3000/api/barista/orders`,
		{
			headers: {
				Authorization: 'Bearer ' + getTokenFromLocalStorage(),
			},
		}
	)

	return {
		orders: ordersData.data,
	}
}
