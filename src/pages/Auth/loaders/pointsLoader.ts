import axios from 'axios'
import { getTokenFromLocalStorage } from '../../../helper/localstorage.helper'
import { IPointData } from '../../../types/IPointData'

export interface IPointsLoaderResponse {
	points: IPointData[]
}

export const pointsLoader = async () => {
	const points = await axios.get<IPointData[]>(
		`http://localhost:3000/api/barista/points`,
		{
			headers: {
				Authorization: 'Bearer ' + getTokenFromLocalStorage(),
			},
		}
	)

	return {
		points: points.data,
	}
}
