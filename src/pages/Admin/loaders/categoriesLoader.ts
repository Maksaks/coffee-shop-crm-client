import axios from 'axios'
import { getTokenFromLocalStorage } from '../../../helper/localstorage.helper'
import { ICategoryData } from '../../../types/ICategory'
import { IDiscountAllData } from '../../../types/IDiscountAllData'

export interface ICategoriesLoader {
	categories: ICategoryData[]
}

export const categoriesLoader = async () => {
	const categories = await axios.get<IDiscountAllData[]>(
		`http://localhost:3000/api/admin/categories`,
		{
			headers: {
				Authorization: 'Bearer ' + getTokenFromLocalStorage(),
			},
		}
	)
	return { categories: categories.data }
}
