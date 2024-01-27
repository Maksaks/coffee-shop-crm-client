import axios from 'axios'
import { getTokenFromLocalStorage } from '../helper/localstorage.helper'
import { IAdminData } from '../store/types/IAdminData'
import { IBaristaData } from '../store/types/IBaristaData'
import { ILoginData } from '../types/ILoginData'
import { ILoginResponseData } from '../types/ILoginResponseData'
import { IPointAllData } from '../types/IPointAllData'
import { IRegistrationData } from '../types/IRegistrationData'
import { IShiftData } from '../types/IShiftData'

export const AuthService = {
	async registration(
		registrationData: IRegistrationData
	): Promise<string | undefined> {
		const { data } = await axios.post<string>(
			'http://localhost:3000/api/auth/registration',
			registrationData
		)
		return data
	},
	async confirmEmail(token: string): Promise<string> {
		const { data } = await axios.get<string>(
			`http://localhost:3000/api/auth/confirming/${token}`
		)
		return data
	},
	async restorePasswordRequest(email: string): Promise<string> {
		const { data } = await axios.post<string>(
			'http://localhost:3000/api/auth/password/restore',
			{
				email,
			}
		)
		return data
	},
	async updatePasswordForAdmin(
		token: string,
		password: string
	): Promise<string> {
		const { data } = await axios.post<string>(
			`http://localhost:3000/api/auth/password/update/${token}`,
			{
				password,
			}
		)
		return data
	},
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
	async startBaristaShiftOnPoint(pointID: number) {
		const { data } = await axios.get<IShiftData>(
			`http://localhost:3000/api/barista/shift/start/${pointID}`,
			{
				headers: {
					Authorization: 'Bearer ' + getTokenFromLocalStorage(),
				},
			}
		)
		return data
	},
	async endBaristaShiftOnPoint(pointID: number) {
		const { data } = await axios.get<IShiftData>(
			`http://localhost:3000/api/barista/shift/end/${pointID}`,
			{
				headers: {
					Authorization: 'Bearer ' + getTokenFromLocalStorage(),
				},
			}
		)
		return data
	},
	async getBaristaPoint(pointID: number) {
		const { data } = await axios.get<IPointAllData>(
			`http://localhost:3000/api/barista/points/${pointID}`,
			{
				headers: {
					Authorization: 'Bearer ' + getTokenFromLocalStorage(),
				},
			}
		)
		return data
	},
}
