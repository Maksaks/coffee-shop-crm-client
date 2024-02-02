import axios from 'axios'
import { getTokenFromLocalStorage } from '../../helper/localstorage.helper'

export const CategoryService = {
	async createCategory(title: string) {
		await axios.post<string>(
			`http://localhost:3000/api/admin/categories`,
			{ title },
			{
				headers: {
					Authorization: 'Bearer ' + getTokenFromLocalStorage(),
				},
			}
		)
	},
	async updateCategory(categoryID: number, title: string) {
		await axios.patch<string>(
			`http://localhost:3000/api/admin/categories/${categoryID}`,
			{ title },
			{
				headers: {
					Authorization: 'Bearer ' + getTokenFromLocalStorage(),
				},
			}
		)
	},
	async deleteCategory(categoryID: number) {
		await axios.delete<string>(
			`http://localhost:3000/api/admin/categories/${categoryID}`,
			{
				headers: {
					Authorization: 'Bearer ' + getTokenFromLocalStorage(),
				},
			}
		)
	},
}
