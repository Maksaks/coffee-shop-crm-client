import axios from 'axios'
import { getTokenFromLocalStorage } from '../../../helper/localstorage.helper'
import { IPointData } from '../../../types/IPointData'

export interface IPointInfoDataLoader {
	point: IPointData
}

export const currentPointInfoLoader = async () => {
	const pointInfo = await axios.get<IPointData>(
		`http://localhost:3000/api/barista/points`,
		{
			headers: {
				Authorization: 'Bearer ' + getTokenFromLocalStorage(),
			},
		}
	)

	return {
		point: pointInfo.data,
	}
}
