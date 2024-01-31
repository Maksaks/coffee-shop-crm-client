import { IOrderData } from './IOrderData'
import { IPointData } from './IPointData'
import { IShiftData } from './IShiftData'

export interface IBaristaAllData {
	id: number
	name: string
	surname: string
	email: string
	phoneNumber: string
	fixedHourRate: number
	percentFromEarnings: number
	dateOfEmployment: string
	points: IPointData[]
	orders: IOrderData[]
	shifts: IShiftData[]
}
