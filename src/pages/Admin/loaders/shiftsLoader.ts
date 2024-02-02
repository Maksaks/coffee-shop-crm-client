import axios from 'axios'
import { getTokenFromLocalStorage } from '../../../helper/localstorage.helper'

export interface IBaristaShort {
	id: number
	name: string
	surname: string
}

export interface IBaristaShortAllDataLoader {
	baristas: IBaristaShort[]
}

export const shiftsLoader = async () => {
	const baristasData = await axios.get<IBaristaShort[]>(
		`http://localhost:3000/api/admin/baristas/names`,
		{
			headers: {
				Authorization: 'Bearer ' + getTokenFromLocalStorage(),
			},
		}
	)

	return {
		baristas: baristasData.data,
	}
}
