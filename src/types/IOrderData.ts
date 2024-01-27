export interface IOrderData {
	id: number
	status: string
	createdAt: string
	paymentMethod: string
	totalAmount: number
	receivedAmount: number
	costOfIngredients: number
}
