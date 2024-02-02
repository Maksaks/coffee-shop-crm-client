import axios from 'axios'
import { getTokenFromLocalStorage } from '../../helper/localstorage.helper'
import { IUpdateDiscountData } from '../../types/IUpdateDiscountData'

export const DiscountsService = {
	async deleteDiscount(discountID: number) {
		await axios.delete(
			`http://localhost:3000/api/admin/discounts/${discountID}`,
			{
				headers: {
					Authorization: 'Bearer ' + getTokenFromLocalStorage(),
				},
			}
		)
	},
	async updateDiscount(
		discountID: number,
		updateDiscount: IUpdateDiscountData
	) {
		await axios.patch(
			`http://localhost:3000/api/admin/discounts/${discountID}`,
			updateDiscount,
			{
				headers: {
					Authorization: 'Bearer ' + getTokenFromLocalStorage(),
				},
			}
		)
	},
}
