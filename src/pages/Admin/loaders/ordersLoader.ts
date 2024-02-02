import axios from 'axios'
import { getTokenFromLocalStorage } from '../../../helper/localstorage.helper'
import { IOrderData } from '../../../types/IOrderData'

export interface IPointShortData {
	id: number
	name: string
	orders: IOrderData[]
}

export interface IPointShortDataLoader {
	points: IPointShortData[]
}

export const ordersPointsLoader = async () => {
	const points = await axios.get<IPointShortData[]>(
		`http://localhost:3000/api/admin/points/short`,
		{
			headers: {
				Authorization: 'Bearer ' + getTokenFromLocalStorage(),
			},
		}
	)
	return { points: points.data }
}
