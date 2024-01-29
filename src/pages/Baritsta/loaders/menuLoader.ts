import axios from 'axios'
import { getTokenFromLocalStorage } from '../../../helper/localstorage.helper'
import { IMenuPositionWithRecipeData } from '../../../types/IMenuPositionWithRecipe'

export interface IMenuPositionWithRecipeDataLoader {
	menuPositions: IMenuPositionWithRecipeData[]
}

export const menuLoader = async () => {
	const menuPositionsData = await axios.get<IMenuPositionWithRecipeData>(
		`http://localhost:3000/api/barista/menu`,
		{
			headers: {
				Authorization: 'Bearer ' + getTokenFromLocalStorage(),
			},
		}
	)

	return {
		menuPositions: menuPositionsData.data,
	}
}
