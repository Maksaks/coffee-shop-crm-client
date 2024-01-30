import { IDiscountData } from './IDiscountData'
import { IIngredientData } from './IIngredientData'

export interface IMenuPositionWithRecipeData {
	id: number
	name: string
	description: string
	price: number
	recipe: {
		id: number
		stepsToReproduce: string[]
		ingredients: IIngredientData[]
	}
	category: {
		id: number
		title: string
	}
	discount?: IDiscountData
}
