export interface IOrderPositionData {
	menuPosition: { id: number }
	quantity: number
}

export interface ICreateOrderData {
	paymentMethod: 'By Card' | 'By Cash' | string
	receivedAmount: number
	totalAmount: number
	point: { id: number }
	orderList: IOrderPositionData[]
}
