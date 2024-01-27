export interface IMenuPosition {
	id: number
	name: string
	description: string
	price: number
	recipe: {
		id: number
		stepsToReproduce: string[]
	}
	category: {
		id: number
		title: string
	}
}
