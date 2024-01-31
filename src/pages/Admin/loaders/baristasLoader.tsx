import axios from 'axios'
import { getTokenFromLocalStorage } from '../../../helper/localstorage.helper'
import { IBaristaAllData } from '../../../types/IBaristaAllData'

export interface IBaristaAllDataLoader {
	baristas: IBaristaAllData
}

export const baristasLoader = async () => {
	const baristasData = await axios.get<IBaristaAllData>(
		`http://localhost:3000/api/admin/baristas`,
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
