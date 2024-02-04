/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
import { motion } from 'framer-motion'
import { FC, useEffect, useState } from 'react'
import { useLoaderData } from 'react-router-dom'
import { toast } from 'react-toastify'
import { isoStringToDatetimeLocal } from '../../../helper/date-formater.helper'
import { StatisticsService } from '../../../services/Admin/StatisticsServices'
import { IPositionPopularityByPointData } from '../../../types/IPositionPopularityByPointData'
import {
	IPointNameAndID,
	IPointNameAndIDLoader,
} from '../loaders/pointsShortLoader'

const Popularity: FC = () => {
	const { points } = useLoaderData() as IPointNameAndIDLoader
	const [searchedPoints, setSearchedPoints] = useState<IPointNameAndID[]>()
	const [selectedPoint, setSelectedPoint] = useState<IPointNameAndID>()
	const [positionsPopularity, setPositionsPopularity] = useState<
		IPositionPopularityByPointData[]
	>([])

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
				const data = await StatisticsService.getPositionsPopularityByPoint(
					selectedPoint.id,
					{
						from: new Date(fromDate).toISOString(),
						to: new Date(toDate).toISOString(),
					}
				)
				if (data) {
					setPositionsPopularity(
						data.sort((a, b) => b.number_of_ordering - a.number_of_ordering)
					)
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
				const data = await StatisticsService.getPositionsPopularityByPoint(
					selectedPoint.id,
					{
						from: new Date(fromDate).toISOString(),
						to: new Date(toDate).toISOString(),
					}
				)
				if (data) {
					setPositionsPopularity(
						data.sort((a, b) => b.number_of_ordering - a.number_of_ordering)
					)
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
			className='w-[60%] h-[80vh] mx-auto  text-white font-roboto flex flex-row gap-4 rounded-2xl'
		>
			<div className='h-[100%] w-[35%] bg-zinc-600 rounded-3xl flex items-center flex-col relative shadow-2xl'>
				<h2 className='w-full text-center text-[2vh] uppercase font-bold border-b-4 p-3'>
					POINTS
				</h2>
				<input
					className='w-[90%] py-2 px-5 my-3 rounded-2xl text-black text-[2vh]'
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
									className={`p-[1vh] w-[90%] rounded-2xl hover:bg-zinc-400 text-[2vh] ${selectedPoint?.id == item.id ? 'bg-zinc-300 text-black underline uppercase font-bold' : 'bg-zinc-500'}`}
								>
									{item.name}
								</button>
							)
						})
					) : (
						<h2 className='uppercase text-[2vh] pt-5'>Not found</h2>
					)}
				</div>
			</div>
			<div className='h-[100%] w-[65%] bg-zinc-600 rounded-3xl flex items-center flex-col relative shadow-2xl gap-1'>
				<h2 className='w-full text-center text-[2vh] uppercase font-bold border-b-4 p-3'>
					POINT`S MENU POSITIONS POPULARITY
				</h2>
				{selectedPoint && (
					<div className='grid grid-cols-12 gap-2 p-1 w-full border-b-4'>
						<small className='col-span-2 uppercase text-[1.8vh] text-right font-bold my-auto'>
							from:
						</small>
						<input
							className='col-span-4 p-1 rounded-xl text-black text-[1.8vh]'
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
				{positionsPopularity?.length ? (
					<div className='w-[90%] bg-zinc-700/95 h-[7vh] rounded-t-2xl grid grid-cols-10 items-center px-5 py-2 font-bold text-[1.9vh]'>
						<label>ID</label>
						<label className='col-span-4 text-center'>TITLE</label>
						<label className='col-span-3 text-center'>CATEGORY</label>
						<label className='col-span-2 text-center'>COUNT OF ORDERINGS</label>
					</div>
				) : (
					<></>
				)}
				<div className='w-[90%] h-[75%] flex flex-col items-center gap-3 py-3 overflow-auto'>
					{positionsPopularity?.length ? (
						positionsPopularity.map((item, indx) => {
							return (
								<div
									key={indx}
									className='w-[100%] bg-zinc-400 h-[5vh] rounded-2xl grid grid-cols-10 items-center px-5 py-2 text-[1.8vh] text-black/80'
								>
									<label>{item.id}</label>
									<label className='col-span-4 text-center'>{item.name}</label>
									<label className='col-span-3 text-center'>
										{item.category}
									</label>
									<label className='col-span-2 text-center'>
										{item.number_of_ordering}
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
			</div>
		</motion.div>
	)
}

export default Popularity
