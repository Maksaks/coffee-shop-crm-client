import axios from 'axios'
import { getTokenFromLocalStorage } from '../../../helper/localstorage.helper'
import { IAboutMeInformation } from '../../../types/IAboutMeInformation'

export interface IAboutMeDataLoader {
	aboutMe: IAboutMeInformation
}

export const aboutMeLoader = async () => {
	const meInfo = await axios.get<IAboutMeInformation>(
		`http://localhost:3000/api/barista/me`,
		{
			headers: {
				Authorization: 'Bearer ' + getTokenFromLocalStorage(),
			},
		}
	)
	console.log(meInfo)

	return {
		aboutMe: meInfo.data,
	}
}
