import { motion } from 'framer-motion'
import { FC, useEffect, useState } from 'react'
import { useLoaderData } from 'react-router-dom'
import { toast } from 'react-toastify'
import { isoStringToDatetimeLocal } from '../../../helper/date-formater.helper'
import { StatisticsService } from '../../../services/Admin/StatisticsServices'
import { IExpensesAndIncomesByPointData } from '../../../types/IExpensesAndIncomesByPointData'
import {
	IPointNameAndID,
	IPointNameAndIDLoader,
} from '../loaders/pointsShortLoader'

const Expenses: FC = () => {
	const { points } = useLoaderData() as IPointNameAndIDLoader
	const [searchedPoints, setSearchedPoints] = useState<IPointNameAndID[]>()
	const [selectedPoint, setSelectedPoint] = useState<IPointNameAndID>()
	const [expensesIncomesData, setExpensesIncomesData] =
		useState<IExpensesAndIncomesByPointData>()

	const [fromDate, setFromDate] = useState<string>()
	const [toDate, setToDate] = useState<string>()
	useEffect(() => {
		if (points) {
			setSearchedPoints(points)
			const currentDate = new Date()
			const lastMonthDate = new Date()
			lastMonthDate.setMonth(currentDate.getMonth() - 1)
			setFromDate(isoStringToDatetimeLocal(lastMonthDate.toString()))
			setToDate(isoStringToDatetimeLocal(currentDate.toString()))
		}
	}, [])

	useEffect(() => {
		if (
			!fromDate ||
			!fromDate.length ||
			!toDate ||
			!toDate.length ||
			!selectedPoint
		)
			return
		const getInfo = async () => {
			try {
				const data = await StatisticsService.getExpensesAndIncomesByPoint(
					selectedPoint.id,
					{
						from: new Date(fromDate).toISOString(),
						to: new Date(toDate).toISOString(),
					}
				)
				if (data) {
					setExpensesIncomesData(data)
				}
			} catch (err: any) {
				const error = err.response?.data.message
				toast.error(error.toString())
			}
		}
		getInfo()
	}, [selectedPoint])

	useEffect(() => {
		if (
			!fromDate ||
			!fromDate.length ||
			!toDate ||
			!toDate.length ||
			!selectedPoint
		)
			return
		const getInfo = async () => {
			try {
				const data = await StatisticsService.getExpensesAndIncomesByPoint(
					selectedPoint.id,
					{
						from: new Date(fromDate).toISOString(),
						to: new Date(toDate).toISOString(),
					}
				)
				if (data) {
					setExpensesIncomesData(data)
				}
			} catch (err: any) {
				const error = err.response?.data.message
				toast.error(error.toString())
			}
		}
		getInfo()
	}, [fromDate, toDate])

	const searchHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (!e.target.value.length) {
			setSearchedPoints(points)
			return
		}
		setSearchedPoints(
			points?.filter(item => {
				return item.name.toLowerCase().includes(e.target.value.toLowerCase())
			})
		)
	}
	return (
		<motion.div
			initial={{ opacity: 0, y: -20 }}
			animate={{ opacity: 1, y: 0 }}
			exit={{ opacity: 0, y: -20 }}
			transition={{ duration: 0.7 }}
			className='w-[50%] h-[700px] mx-auto  text-white font-roboto flex flex-row gap-4 rounded-2xl'
		>
			<div className='h-[100%] w-[40%] bg-zinc-600 rounded-3xl flex items-center flex-col relative'>
				<h2 className='w-full text-center text-2xl uppercase font-bold border-b-4 p-3'>
					POINTS
				</h2>
				<input
					className='w-[90%] py-2 px-5 my-3 rounded-2xl text-black text-xl'
					placeholder='Search point by name...'
					onChange={searchHandler}
					disabled={!points.length}
				/>
				<div className='w-full h-[80%] flex flex-col items-center gap-2 overflow-auto'>
					{searchedPoints?.length ? (
						searchedPoints.map((item, indx) => {
							return (
								<button
									title='Select this point'
									key={indx}
									onClick={() => {
										setSelectedPoint(item)
									}}
									className={`p-4 w-[90%] rounded-2xl hover:bg-zinc-400 text-xl ${selectedPoint?.id == item.id ? 'bg-zinc-300 text-black underline uppercase font-bold' : 'bg-zinc-500'}`}
								>
									{item.name}
								</button>
							)
						})
					) : (
						<h2 className='uppercase text-2xl pt-5'>Not found</h2>
					)}
				</div>
			</div>
			<div className='h-[100%] w-[45%] bg-zinc-600 rounded-3xl flex items-center flex-col relative'>
				<h2 className='w-full text-center text-2xl uppercase font-bold border-b-4 p-3'>
					Expenses and Incomes
				</h2>
				{selectedPoint && (
					<div className='grid grid-cols-6 gap-2 p-3 w-full border-b-4'>
						<small className='uppercase col-span-2 text-lg text-right font-bold my-auto'>
							from:
						</small>
						<input
							className='col-span-4 p-1 rounded-xl text-black'
							type='datetime-local'
							value={fromDate}
							onChange={e => setFromDate(e.target.value)}
						/>
						<small className='uppercase col-span-2 text-lg text-right font-bold my-auto'>
							to:
						</small>
						<input
							className='col-span-4 p-1 rounded-xl text-black'
							type='datetime-local'
							value={toDate}
							onChange={e => setToDate(e.target.value)}
						/>
					</div>
				)}
				{selectedPoint && (
					<div className='w-full h-[40%] grid grid-cols-6 text-center text-xl'>
						<label className='col-span-2 p-2 border-b-2 font-bold'>ID</label>
						<label className='col-span-4 p-2 border-l-2 border-b-2'>
							{expensesIncomesData?.id}
						</label>
						<label className='col-span-2 p-2 border-b-2 font-bold'>NAME</label>
						<label className='col-span-4 p-2 border-l-2 border-b-2 '>
							{expensesIncomesData?.name}
						</label>
						<label className='col-span-2 p-2 border-b-2 font-bold'>
							ORDERS COUNT:
						</label>
						<label className='col-span-4 p-2 border-l-2 border-b-2'>
							{expensesIncomesData?.orders.orders_count}
						</label>
						<label className='col-span-2 p-2 border-b-2 font-bold'>
							ORDERS SUM:
						</label>
						<label className='col-span-4 p-2 border-l-2 border-b-2'>
							{expensesIncomesData?.orders.orders_sum} UAH
						</label>
						<label className='col-span-2 p-2 border-b-2 font-bold'>
							SHIFTS COUNT:
						</label>
						<label className='col-span-4 p-2 border-l-2 border-b-2'>
							{expensesIncomesData?.shifts.shifts_count}
						</label>
						<label className='col-span-2 p-2 border-b-2 font-bold'>
							SHIFTS SUM:
						</label>
						<label className='col-span-4 p-2 border-l-2 border-b-2'>
							{expensesIncomesData?.shifts.shifts_sum} UAH
						</label>
						<label
							className={`col-span-2 p-2 border-b-2 font-bold ${expensesIncomesData && expensesIncomesData?.profit >= 0 ? 'bg-green-300 text-black' : 'bg-red-300 text-black'}`}
						>
							PROFIT:
						</label>
						<label
							className={`col-span-4 p-2 border-l-2 border-b-2 ${expensesIncomesData && expensesIncomesData?.profit >= 0 ? 'bg-green-300 text-black' : 'bg-red-300 text-black'}`}
						>
							{expensesIncomesData?.profit} UAH
						</label>
					</div>
				)}
			</div>
		</motion.div>
	)
}

export default Expenses
