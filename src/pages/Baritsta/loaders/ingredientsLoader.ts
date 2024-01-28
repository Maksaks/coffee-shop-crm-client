import axios from 'axios'
import { getTokenFromLocalStorage } from '../../../helper/localstorage.helper'
import { IIngredientData } from '../../../types/IIngredientData'

export interface IIngredientDataLoader {
	ingredients: IIngredientData[]
}

export const ingredientsLoader = async () => {
	const ingredientsData = await axios.get<IIngredientData>(
		`http://localhost:3000/api/barista/ingredients`,
		{
			headers: {
				Authorization: 'Bearer ' + getTokenFromLocalStorage(),
			},
		}
	)

	return {
		ingredients: ingredientsData.data,
	}
}
