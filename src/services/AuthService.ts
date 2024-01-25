import axios from 'axios'
import { getTokenFromLocalStorage } from '../helper/localstorage.helper'
import { IAdminData } from '../store/types/IAdminData'
import { IBaristaData } from '../store/types/IBaristaData'
import { ILoginData } from '../types/ILoginData'
import { ILoginResponseData } from '../types/ILoginResponseData'

export const AuthService = {
	// async registration(
	// 	userData: IUserData
	// ): Promise<IResponseUserData | undefined> {
	// 	const { data } = await instance.post<IResponseUserData>('profile', userData)
	// 	return data
	// },
	async login(loginData: ILoginData): Promise<ILoginResponseData | undefined> {
		const { data } = await axios.post<ILoginResponseData>(
			'http://localhost:3000/api/auth/login',
			loginData
		)
		return data
	},
	async getProfileBarista(): Promise<IBaristaData | undefined> {
		const { data } = await axios.get<IBaristaData>(
			'http://localhost:3000/api/auth/profile',
			{
				headers: {
					Authorization: 'Bearer ' + getTokenFromLocalStorage(),
				},
			}
		)
		if (data) return data
	},
	async getProfileAdmin(): Promise<IAdminData | undefined> {
		const { data } = await axios.get<IAdminData>(
			'http://localhost:3000/api/auth/profile',
			{
				headers: {
					Authorization: 'Bearer ' + getTokenFromLocalStorage(),
				},
			}
		)
		if (data) return data
	},
}
