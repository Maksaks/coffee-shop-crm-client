import { IPointData } from './IPointData'

export interface IShiftData {
	id: number
	status: string
	baristaSalary: number
	time: string
	point?: IPointData
}
