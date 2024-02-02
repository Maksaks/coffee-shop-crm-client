import axios from 'axios'
import { getTokenFromLocalStorage } from '../../helper/localstorage.helper'
import { IOrderPositionData } from '../../types/ICreateOrderData'

export const OrdersService = {
	async getOrderList(orderID: number) {
		const { data } = await axios.get<IOrderPositionData[]>(
			`http://localhost:3000/api/admin/orders/${orderID}/list`,
			{
				headers: {
					Authorization: 'Bearer ' + getTokenFromLocalStorage(),
				},
			}
		)
		return data
	},
	async deleteOrder(orderID: number) {
		await axios.delete(`http://localhost:3000/api/admin/orders/${orderID}`, {
			headers: {
				Authorization: 'Bearer ' + getTokenFromLocalStorage(),
			},
		})
	},
}
