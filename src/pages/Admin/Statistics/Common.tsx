/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
import { motion } from 'framer-motion'
import { FC, useEffect, useState } from 'react'
import { useLoaderData } from 'react-router-dom'
import { toast } from 'react-toastify'
import { isoStringToDatetimeLocal } from '../../../helper/date-formater.helper'
import { StatisticsService } from '../../../services/Admin/StatisticsServices'
import { IExpenseIncomesAllPointsData } from '../../../types/IExpenseIncomesAllPointsData'
import { ICommonLoader } from '../loaders/commonLoader'

const Common: FC = () => {
	const { common } = useLoaderData() as ICommonLoader
	const [expensesAndIncomes, setExpensesAndIncomes] = useState<
		IExpenseIncomesAllPointsData[]
	>([])

	const [fromDate, setFromDate] = useState<string>()
	const [toDate, setToDate] = useState<string>()

	useEffect(() => {
		if (common) {
			setExpensesAndIncomes(
				common.sort((a, b) => b.incomes - b.expenses - (a.incomes - a.expenses))
			)
			const currentDate = new Date()
			const lastMonthDate = new Date()
			lastMonthDate.setMonth(currentDate.getMonth() - 1)
			setFromDate(isoStringToDatetimeLocal(lastMonthDate.toString()))
			setToDate(isoStringToDatetimeLocal(currentDate.toString()))
		}
	}, [])

	useEffect(() => {
		if (!fromDate || !fromDate.length || !toDate || !toDate.length) return
		const getInfo = async () => {
			try {
				const data = await StatisticsService.getExpensesAndIncomesAllPoints({
					from: new Date(fromDate).toISOString(),
					to: new Date(toDate).toISOString(),
				})
				if (data) {
					setExpensesAndIncomes(
						data.sort(
							(a, b) => b.incomes - b.expenses - (a.incomes - a.expenses)
						)
					)
				}
			} catch (err: any) {
				const error = err.response?.data.message
				toast.error(error.toString())
			}
		}
		getInfo()
	}, [fromDate, toDate])

	return (
		<motion.div
			initial={{ opacity: 0, y: -20 }}
			animate={{ opacity: 1, y: 0 }}
			exit={{ opacity: 0, y: -20 }}
			transition={{ duration: 0.7 }}
			className='w-[60%] h-[80vh] mx-auto  text-white font-roboto flex flex-col gap-2 rounded-2xl bg-zinc-600 shadow-2xl items-center'
		>
			<h2 className='w-full h-[7%] text-center text-[2vh] uppercase font-bold border-b-4 p-3'>
				ALL POINTS EXPENSES AND INCOMES
			</h2>

			<div className='grid grid-cols-12 gap-2 p-3 w-full border-b-4'>
				<small className='uppercase col-start-3 text-[1.8vh] text-right font-bold my-auto'>
					from:
				</small>
				<input
					className='col-span-3 p-1 rounded-xl text-[1.8vh] text-black'
					type='datetime-local'
					value={fromDate}
					onChange={e => setFromDate(e.target.value)}
				/>
				<small className='uppercase text-[1.8vh] text-right font-bold my-auto'>
					to:
				</small>
				<input
					className='col-span-3 p-1 rounded-xl text-[1.8vh] text-black'
					type='datetime-local'
					value={toDate}
					onChange={e => setToDate(e.target.value)}
				/>
			</div>

			{expensesAndIncomes?.length ? (
				<div className='w-[90%] bg-zinc-700/95 h-[5vh] rounded-t-2xl grid grid-cols-10 items-center px-5 py-2 font-bold text-[2vh]'>
					<label>ID</label>
					<label className='col-span-4 text-center'>NAME</label>
					<label className='col-span-3 text-center'>EXPENSES</label>
					<label className='col-span-2 text-center'>INCOMES</label>
				</div>
			) : (
				<></>
			)}
			<div className='w-full h-[75%] flex flex-col items-center gap-3 overflow-auto'>
				{expensesAndIncomes?.length ? (
					expensesAndIncomes.map((item, indx) => {
						return (
							<div
								key={indx}
								className={`w-[90%] h-[5vh] rounded-2xl grid grid-cols-10 items-center px-5 py-2 text-[1.8vh] text-black/80 ${item.expenses > item.incomes ? 'bg-red-200' : 'bg-green-200'}`}
							>
								<label>{item.id}</label>
								<label className='col-span-4 text-center'>{item.name}</label>
								<label className='col-span-3 text-center'>
									{item.expenses} UAH
								</label>
								<label className='col-span-2 text-center'>
									{item.incomes} UAH
								</label>
							</div>
						)
					})
				) : (
					<h2 className='uppercase text-white/70 font-bold text-[2vh] w-full text-center'>
						No data
					</h2>
				)}
			</div>
		</motion.div>
	)
}

export default Common
