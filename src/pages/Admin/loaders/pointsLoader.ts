import axios from 'axios'
import { getTokenFromLocalStorage } from '../../../helper/localstorage.helper'
import { IOnlyPointInfo } from '../../../types/IOnlyPointInfo'

export interface IPointLoader {
	points: IOnlyPointInfo[]
}

export const pointsLoader = async () => {
	const points = await axios.get<IOnlyPointInfo[]>(
		`http://localhost:3000/api/admin/points/only`,
		{
			headers: {
				Authorization: 'Bearer ' + getTokenFromLocalStorage(),
			},
		}
	)
	return { points: points.data }
}
