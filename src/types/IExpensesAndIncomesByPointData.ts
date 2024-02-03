export interface IExpensesAndIncomesByPointData {
	id: number
	name: string
	orders: {
		orders_count: number
		orders_sum: number
	}
	shifts: {
		shifts_count: number
		shifts_sum: number
	}
	profit: number
}
