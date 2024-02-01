import axios from 'axios'
import { getTokenFromLocalStorage } from '../../../helper/localstorage.helper'
import { IPointAllData } from '../../../types/IPointAllData'

export interface IPositionAllDataLoader {
	points: IPointAllData[]
}

export const positionLoader = async () => {
	const pointsWithPositionsData = await axios.get<IPointAllData[]>(
		`http://localhost:3000/api/admin/points`,
		{
			headers: {
				Authorization: 'Bearer ' + getTokenFromLocalStorage(),
			},
		}
	)
	return { points: pointsWithPositionsData.data }
}
