import axios from 'axios'
import { getTokenFromLocalStorage } from '../../helper/localstorage.helper'
import { IAllBaristaShiftsAndSalaryData } from '../../types/IAllBaristaShiftsAndSalaryData'
import { IBaristaShiftsAndSalaryData } from '../../types/IBaristaShiftsAndSalaryData'
import { ICategoriesOrdersIncomesData } from '../../types/ICategoriesOrdersIncomesData'
import { IConsumptionIngredientsData } from '../../types/IConsumptionIngredientsData'
import { IExpenseIncomesAllPointsData } from '../../types/IExpenseIncomesAllPointsData'
import { IExpensesAndIncomesByPointData } from '../../types/IExpensesAndIncomesByPointData'
import { IPeriodData } from '../../types/IPeriodData'
import { IPositionPopularityByPointData } from '../../types/IPositionPopularityByPointData'

export const StatisticsService = {
	async getPositionsPopularityByPoint(pointID: number, period: IPeriodData) {
		const { data } = await axios.post<IPositionPopularityByPointData[]>(
			`http://localhost:3000/api/admin/statistics/positions/${pointID}`,
			period,
			{
				headers: {
					Authorization: 'Bearer ' + getTokenFromLocalStorage(),
				},
			}
		)
		return data
	},
	async getExpensesAndIncomesByPoint(pointID: number, period: IPeriodData) {
		const { data } = await axios.post<IExpensesAndIncomesByPointData[]>(
			`http://localhost:3000/api/admin/statistics/points/${pointID}`,
			period,
			{
				headers: {
					Authorization: 'Bearer ' + getTokenFromLocalStorage(),
				},
			}
		)
		return data
	},
	async getExpensesAndIncomesAllPoints(period: IPeriodData) {
		const { data } = await axios.post<IExpenseIncomesAllPointsData[]>(
			`http://localhost:3000/api/admin/statistics/points`,
			period,
			{
				headers: {
					Authorization: 'Bearer ' + getTokenFromLocalStorage(),
				},
			}
		)
		return data
	},
	async getBaristaShiftsAndSalaryByID(baristaID: number, period: IPeriodData) {
		const { data } = await axios.post<IBaristaShiftsAndSalaryData>(
			`http://localhost:3000/api/admin/statistics/baristas/${baristaID}`,
			period,
			{
				headers: {
					Authorization: 'Bearer ' + getTokenFromLocalStorage(),
				},
			}
		)
		return data
	},
	async getAllBaristasShiftsAndSalary(period: IPeriodData) {
		const { data } = await axios.post<IAllBaristaShiftsAndSalaryData[]>(
			`http://localhost:3000/api/admin/statistics/baristas`,
			period,
			{
				headers: {
					Authorization: 'Bearer ' + getTokenFromLocalStorage(),
				},
			}
		)
		return data
	},
	async getConsumptionOfIngredientsByPoint(
		pointID: number,
		period: IPeriodData
	) {
		const { data } = await axios.post<IConsumptionIngredientsData[]>(
			`http://localhost:3000/api/admin/statistics/ingredients/${pointID}`,
			period,
			{
				headers: {
					Authorization: 'Bearer ' + getTokenFromLocalStorage(),
				},
			}
		)
		return data
	},
	async getCountOrdersAndIncomesAllCategories(period: IPeriodData) {
		const { data } = await axios.post<ICategoriesOrdersIncomesData[]>(
			`http://localhost:3000/api/admin/statistics/categories`,
			period,
			{
				headers: {
					Authorization: 'Bearer ' + getTokenFromLocalStorage(),
				},
			}
		)
		return data
	},
}
