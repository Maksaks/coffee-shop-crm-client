import { IIngredientData } from './IIngredientData'

export interface IPointWithIngredient {
	id: number
	name: string
	ingredients: IIngredientData[]
}
