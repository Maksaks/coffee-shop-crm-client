import axios from 'axios'
import { getTokenFromLocalStorage } from '../../../helper/localstorage.helper'

export interface IPointNameAndIDLoader {
	points: IPointNameAndID[]
}

export interface IPointNameAndID {
	id: number
	name: string
}

export const pointsShortLoader = async () => {
	const points = await axios.get<IPointNameAndID[]>(
		`http://localhost:3000/api/admin/points/names`,
		{
			headers: {
				Authorization: 'Bearer ' + getTokenFromLocalStorage(),
			},
		}
	)
	return { points: points.data }
}
