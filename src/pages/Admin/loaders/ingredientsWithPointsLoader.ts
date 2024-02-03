import axios from 'axios'
import { getTokenFromLocalStorage } from '../../../helper/localstorage.helper'
import { IPointWithIngredient } from '../../../types/IPointWithIngredient'

export interface IIngredientsWithPointLoader {
	points: IPointWithIngredient[]
}

export const ingredientsWithPointsLoader = async () => {
	const points = await axios.get<IPointWithIngredient[]>(
		`http://localhost:3000/api/admin/points/ingredients`,
		{
			headers: {
				Authorization: 'Bearer ' + getTokenFromLocalStorage(),
			},
		}
	)
	return { points: points.data }
}
