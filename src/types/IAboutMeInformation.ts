import { IPointData } from './IPointData'
import { IShiftData } from './IShiftData'

export interface IAboutMeInformation {
	id: number
	name: string
	surname: string
	email: string
	phoneNumber: string
	dateOfEmployment: string
	fixedHourRate: number
	percentFromEarnings: number
	points: IPointData[]
	totalShiftsSalary: number
	shifts: IShiftData[]
}
