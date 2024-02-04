import { motion } from 'framer-motion'
import { FC, useEffect, useState } from 'react'
import { useLoaderData } from 'react-router-dom'
import { toast } from 'react-toastify'
import {
	dateTimeFormatter,
	isoStringToDatetimeLocal,
} from '../../../helper/date-formater.helper'
import { StatisticsService } from '../../../services/Admin/StatisticsServices'
import { IBaristaShiftsAndSalaryData } from '../../../types/IBaristaShiftsAndSalaryData'
import {
	IBaristaShort,
	IBaristaShortAllDataLoader,
} from '../loaders/shiftsLoader'

const BaristaSalaryShifts: FC = () => {
	const { baristas } = useLoaderData() as IBaristaShortAllDataLoader
	const [searchedBaristas, setSearchedBaristas] = useState<IBaristaShort[]>()
	const [selectedBarista, setSelectedBarista] = useState<IBaristaShort>()
	const [salaryAndShifts, setSalaryAndShifts] =
		useState<IBaristaShiftsAndSalaryData>()

	const [fromDate, setFromDate] = useState<string>()
	const [toDate, setToDate] = useState<string>()

	useEffect(() => {
		if (baristas) {
			setSearchedBaristas(baristas)
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
			!selectedBarista
		)
			return
		const getInfo = async () => {
			try {
				const data = await StatisticsService.getBaristaShiftsAndSalaryByID(
					selectedBarista.id,
					{
						from: new Date(fromDate).toISOString(),
						to: new Date(toDate).toISOString(),
					}
				)
				if (data) {
					setSalaryAndShifts(data)
				}
			} catch (err: any) {
				const error = err.response?.data.message
				toast.error(error.toString())
			}
		}
		getInfo()
	}, [selectedBarista])

	useEffect(() => {
		if (
			!fromDate ||
			!fromDate.length ||
			!toDate ||
			!toDate.length ||
			!selectedBarista
		)
			return
		const getInfo = async () => {
			try {
				const data = await StatisticsService.getBaristaShiftsAndSalaryByID(
					selectedBarista.id,
					{
						from: new Date(fromDate).toISOString(),
						to: new Date(toDate).toISOString(),
					}
				)
				if (data) {
					setSalaryAndShifts(data)
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
			setSearchedBaristas(baristas)
			return
		}
		setSearchedBaristas(
			baristas?.filter(item => {
				const surnameName = item.name + ' ' + item.surname
				return surnameName.toLowerCase().includes(e.target.value.toLowerCase())
			})
		)
	}

	return (
		<motion.div
			initial={{ opacity: 0, y: -20 }}
			animate={{ opacity: 1, y: 0 }}
			exit={{ opacity: 0, y: -20 }}
			transition={{ duration: 0.7 }}
			className='w-[70%] h-[75vh] mx-auto  text-white font-roboto flex flex-row gap-4 rounded-2xl'
		>
			<div className='h-[100%] w-[35%] bg-zinc-600 rounded-3xl flex items-center flex-col relative'>
				<h2 className='w-full text-center text-[2vh] uppercase font-bold border-b-4 p-3'>
					BARISTAS
				</h2>
				<input
					className='w-[90%] py-2 px-5 my-3 rounded-2xl text-black text-[2vh]'
					placeholder='Search baristas by name...'
					onChange={searchHandler}
					disabled={!baristas.length}
				/>
				<div className='w-full h-[80%] flex flex-col items-center gap-2 overflow-auto'>
					{searchedBaristas?.length ? (
						searchedBaristas.map((item, indx) => {
							return (
								<button
									title='Select this point'
									key={indx}
									onClick={() => {
										setSelectedBarista(item)
									}}
									className={`p-[1vh] w-[90%] rounded-2xl hover:bg-zinc-400 text-[2vh] ${selectedBarista?.id == item.id ? 'bg-zinc-300 text-black underline uppercase font-bold' : 'bg-zinc-500'}`}
								>
									{item.surname + ' ' + item.name}
								</button>
							)
						})
					) : (
						<h2 className='uppercase text-[2vh] pt-5'>Not found</h2>
					)}
				</div>
			</div>
			<div className='h-[100%] w-[65%] bg-zinc-600 rounded-3xl flex items-center flex-col relative'>
				<h2 className='w-full text-center text-[2vh] uppercase font-bold border-b-4 p-3'>
					SALARY AND SHIFTS
				</h2>
				{selectedBarista && (
					<div className='grid grid-cols-6 gap-2 p-3 w-full border-b-4'>
						<small className='uppercase col-span-2 text-[1.8vh] text-right font-bold my-auto'>
							from:
						</small>
						<input
							className='col-span-4 p-1 rounded-xl text-[1.8vh] text-black'
							type='datetime-local'
							value={fromDate}
							onChange={e => setFromDate(e.target.value)}
						/>
						<small className='uppercase col-span-2 text-[1.8vh] text-right font-bold my-auto'>
							to:
						</small>
						<input
							className='col-span-4 p-1 rounded-xl text-[1.8vh] text-black'
							type='datetime-local'
							value={toDate}
							onChange={e => setToDate(e.target.value)}
						/>
					</div>
				)}
				{selectedBarista && salaryAndShifts && (
					<div className='w-[80%] border-2 h-[70%] mt-5 grid grid-cols-6 text-center text-[2vh]'>
						<label className='col-span-2 p-2 border-b-2 font-bold'>NAME</label>
						<label className='col-span-4 p-2 border-l-2 border-b-2'>
							{selectedBarista.name + ' ' + selectedBarista.surname}
						</label>
						<label className='col-span-2 p-2 border-b-2 font-bold'>EMAIL</label>
						<label className='col-span-4 p-2 border-l-2 border-b-2 '>
							{salaryAndShifts?.barista_email}
						</label>
						<label className='col-span-2 p-2 border-b-2 font-bold'>
							PHONE NUMBER:
						</label>
						<label className='col-span-4 p-2 border-l-2 border-b-2'>
							{salaryAndShifts?.barista_phone_number}
						</label>
						<label className='col-span-2 p-2 border-b-2 font-bold'>
							DATE OF EMPLOYMENT:
						</label>
						<label className='col-span-4 p-2 border-l-2 border-b-2'>
							{dateTimeFormatter(salaryAndShifts?.barista_date_of_employment)}
						</label>
						<label className='col-span-2 p-2 border-b-2 font-bold'>
							HOUR RATE:
						</label>
						<label className='col-span-4 p-2 border-l-2 border-b-2'>
							{salaryAndShifts.barista_hour_rate} UAH
						</label>
						<label className='col-span-2 p-2 border-b-2 font-bold'>
							PERCENT:
						</label>
						<label className='col-span-4 p-2 border-l-2 border-b-2'>
							{salaryAndShifts.barista_percent} %
						</label>
						<label className='col-span-2 p-2 border-b-2 font-bold'>
							SHIFTS COUNT:
						</label>
						<label className='col-span-4 p-2 border-l-2 border-b-2'>
							{salaryAndShifts.shifts_count}
						</label>
						<label className='col-span-2 p-2 border-b-2 font-bold'>
							SHIFTS TOTAL SALARY:
						</label>
						<label className='col-span-4 p-2 border-l-2 border-b-2'>
							{salaryAndShifts.totalSalary} UAH
						</label>
					</div>
				)}
			</div>
		</motion.div>
	)
}

export default BaristaSalaryShifts
