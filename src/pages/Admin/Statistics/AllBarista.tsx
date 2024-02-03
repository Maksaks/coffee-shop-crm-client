import { motion } from 'framer-motion'
import { FC, useEffect, useState } from 'react'
import { useLoaderData } from 'react-router-dom'
import { toast } from 'react-toastify'
import { isoStringToDatetimeLocal } from '../../../helper/date-formater.helper'
import { StatisticsService } from '../../../services/Admin/StatisticsServices'
import { IAllBaristaShiftsAndSalaryData } from '../../../types/IAllBaristaShiftsAndSalaryData'
import { IAllBaristaSalaryLoader } from '../loaders/allBaristasSalaryLoader'

const AllBarista: FC = () => {
	const { common } = useLoaderData() as IAllBaristaSalaryLoader
	const [salaryAndShifts, setSalaryAndShifts] = useState<
		IAllBaristaShiftsAndSalaryData[]
	>([])

	const [fromDate, setFromDate] = useState<string>()
	const [toDate, setToDate] = useState<string>()

	useEffect(() => {
		if (common) {
			setSalaryAndShifts(common.sort((a, b) => b.salary - a.salary))
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
				const data = await StatisticsService.getAllBaristasShiftsAndSalary({
					from: new Date(fromDate).toISOString(),
					to: new Date(toDate).toISOString(),
				})
				if (data) {
					setSalaryAndShifts(data.sort((a, b) => b.salary - a.salary))
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
			className='w-[50%] h-[1000px] mx-auto  text-white font-roboto flex flex-col gap-2 rounded-2xl bg-zinc-600 shadow-2xl items-center'
		>
			<h2 className='w-full h-[6%] text-center text-2xl uppercase font-bold border-b-4 p-3'>
				ALL BARISTAS SALARIES AND SHIFTS
			</h2>

			<div className='grid grid-cols-12 gap-2 p-3 w-full border-b-4'>
				<small className='uppercase col-start-3 text-lg text-right font-bold my-auto'>
					from:
				</small>
				<input
					className='col-span-3 p-1 rounded-xl text-black'
					type='datetime-local'
					value={fromDate}
					onChange={e => setFromDate(e.target.value)}
				/>
				<small className='uppercase text-lg text-right font-bold my-auto'>
					to:
				</small>
				<input
					className='col-span-3 p-1 rounded-xl text-black'
					type='datetime-local'
					value={toDate}
					onChange={e => setToDate(e.target.value)}
				/>
			</div>

			{salaryAndShifts?.length ? (
				<div className='w-[90%] bg-zinc-700/95 h-[70px] rounded-t-2xl grid grid-cols-10 items-center px-5 py-2 font-bold text-xl'>
					<label>ID</label>
					<label className='col-span-4 text-center'>NAME</label>
					<label className='col-span-3 text-center'>COUNT OF SHIFTS</label>
					<label className='col-span-2 text-center'>SALARY</label>
				</div>
			) : (
				<></>
			)}
			<div className='w-full h-[80%] flex flex-col items-center gap-3 py-3 overflow-auto'>
				{salaryAndShifts?.length ? (
					salaryAndShifts.map((item, indx) => {
						return (
							<div
								key={indx}
								className={`w-[90%] h-[60px] rounded-2xl grid grid-cols-10 items-center px-5 py-2 text-lg text-black/80 bg-zinc-300`}
							>
								<label>{item.id}</label>
								<label className='col-span-4 text-center'>{item.name}</label>
								<label className='col-span-3 text-center'>
									{item.count_of_shifts}
								</label>
								<label className='col-span-2 text-center'>
									{item.salary} UAH
								</label>
							</div>
						)
					})
				) : (
					<h2 className='uppercase text-white/70 font-bold text-xl w-full text-center'>
						No data
					</h2>
				)}
			</div>
		</motion.div>
	)
}

export default AllBarista
