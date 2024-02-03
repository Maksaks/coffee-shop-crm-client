import { IPointData } from './IPointData'

export interface IOnlyPointInfo extends IPointData {
	baristaCount: number
	ingredientsCount: number
	menuPositionsCount: number
}
