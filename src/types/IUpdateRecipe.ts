import { IIngredientData } from './IIngredientData'

export interface IUpdateRecipeSteps {
	stepsToReproduce: string[]
}

export interface IUpdateRecipeIngredients {
	ingredients: IIngredientData[]
}
