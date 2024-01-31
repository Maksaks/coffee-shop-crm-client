import { IMenuPositionWithRecipeData } from './IMenuPositionWithRecipe'

export interface ICreatedOrderResultData {
	id: number
	createdAt: string
	status: string
	orderList: {
		menuPosition: IMenuPositionWithRecipeData
		quantity: number
	}[]
	paymentMethod: string
	receivedAmount: number
	totalAmount: number
}
