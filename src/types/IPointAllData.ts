import { IIngredientData } from './IIngredientData'
import { IMenuPosition } from './IMenuPosition'
import { IOrderData } from './IOrderData'
import { IPointData } from './IPointData'
import { IShiftData } from './IShiftData'

export interface IPointAllData extends IPointData {
	ingredients: IIngredientData[]
	orders: IOrderData[]
	shifts: IShiftData[]
	menuPositions: IMenuPosition[]
}
