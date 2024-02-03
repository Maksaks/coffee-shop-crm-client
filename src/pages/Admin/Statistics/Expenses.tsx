import { motion } from 'framer-motion'
import { FC, useEffect, useState } from 'react'
import { useLoaderData } from 'react-router-dom'
import {
	IPointNameAndID,
	IPointNameAndIDLoader,
} from '../loaders/pointsShortLoader'

const Expenses: FC = () => {
	const { points } = useLoaderData() as IPointNameAndIDLoader
	const [searchedPoints, setSearchedPoints] = useState<IPointNameAndID[]>()
	const [selectedPoint, setSelectedPoint] = useState<IPointNameAndID>()

	useEffect(() => {
		if (points) {
			setSearchedPoints(points)
		}
	}, [])

	useEffect(() => {}, [selectedPoint])

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
			className='w-[60%] h-[1000px] mx-auto  text-white font-roboto flex flex-row gap-4 rounded-2xl'
		>
			<div className='h-[100%] w-[35%] bg-zinc-600 rounded-3xl flex items-center flex-col relative'>
				<h2 className='w-full text-center text-2xl uppercase font-bold border-b-4 p-3'>
					POINTS
				</h2>
				<input
					className='w-[90%] py-2 px-5 my-3 rounded-2xl text-black text-xl'
					placeholder='Search point by name...'
					onChange={searchHandler}
					disabled={!points.length}
				/>
				<div className='w-full h-[80%] flex flex-col items-center gap-2'>
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
			<div className='h-[100%] w-[65%] bg-zinc-600 rounded-3xl flex items-center flex-col relative'>
				<h2 className='w-full h-[6%] text-center text-2xl uppercase font-bold border-b-4 p-3'>
					POINT`S MENU POSITIONS POPULARITY
				</h2>
			</div>
		</motion.div>
	)
}

export default Expenses
