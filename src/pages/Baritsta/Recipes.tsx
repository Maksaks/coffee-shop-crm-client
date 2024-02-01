/* eslint-disable react-hooks/exhaustive-deps */
import { AnimatePresence, motion } from 'framer-motion'
import { ChefHat, Footprints, Puzzle } from 'lucide-react'
import { FC, useEffect, useState } from 'react'
import { useLoaderData } from 'react-router-dom'
import { IMenuPositionWithRecipeData } from '../../types/IMenuPositionWithRecipe'
import { IMenuPositionWithRecipeDataLoader } from './loaders/menuLoader'

const Recipes: FC = () => {
	const { menuPositions } = useLoaderData() as IMenuPositionWithRecipeDataLoader
	const [selectedPosition, setSelectedPosition] = useState<
		IMenuPositionWithRecipeData | undefined
	>(menuPositions.length ? menuPositions[0] : undefined)
	const [searchedPositions, setSearchedPositions] = useState<
		IMenuPositionWithRecipeData[]
	>([])

	useEffect(() => {
		setSearchedPositions(menuPositions)
	}, [])

	useEffect(() => {
		setSelectedPosition(
			searchedPositions.length ? searchedPositions[0] : undefined
		)
	}, [searchedPositions])

	const searchHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (!e.target.value.length) {
			setSearchedPositions(menuPositions)
			setSelectedPosition(menuPositions.length ? menuPositions[0] : undefined)
			return
		}
		setSearchedPositions(
			menuPositions?.filter(item =>
				item.name.toLowerCase().includes(e.target.value.toLowerCase())
			)
		)
	}

	return (
		<div className='w-[80%] h-[1000px] mt-20 mx-auto text-white flex gap-[1%] font-roboto'>
			<motion.div
				initial={{ opacity: 0, y: -20 }}
				animate={{ opacity: 1, y: 0 }}
				exit={{ opacity: 0, y: -20 }}
				transition={{ duration: 0.7 }}
				className='bg-zinc-700 rounded-3xl py-5 w-[30%] flex flex-col items-center gap-8'
			>
				<h2 className='h-[5%] w-full uppercase border-b-4 text-center pb-3 text-2xl font-bold'>
					Menu positions
				</h2>
				<input
					className='w-[90%] py-2 px-5 rounded-2xl text-black text-xl'
					placeholder='Search ingredients by name...'
					onChange={searchHandler}
				/>
				<AnimatePresence>
					<motion.ul
						className='h-[95%] w-full px-5 gap-3 flex flex-col overflow-auto'
						initial={{ opacity: 0, y: -20 }}
						animate={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0, y: -20 }}
						transition={{ duration: 1 }}
					>
						{searchedPositions?.length ? (
							searchedPositions.map(pos => {
								return (
									<motion.li
										key={pos.id}
										className={`w-full hover:cursor-pointer border-2 p-5 flex items-center justify-center gap-2 rounded-xl text-xl hover:bg-zinc-600 ${selectedPosition?.id === pos.id ? 'bg-zinc-600' : 'bg-zinc-800'}`}
										onClick={() => setSelectedPosition(pos)}
									>
										{pos.name}
									</motion.li>
								)
							})
						) : (
							<motion.li
								className={`w-full p-5 flex items-center justify-center gap-2 rounded-xl text-xl`}
							>
								NOT FOUND
							</motion.li>
						)}
					</motion.ul>
				</AnimatePresence>
			</motion.div>
			<motion.div
				initial={{ opacity: 0, y: -20 }}
				animate={{ opacity: 1, y: 0 }}
				exit={{ opacity: 0, y: -20 }}
				transition={{ duration: 0.7 }}
				className='bg-zinc-700 rounded-3xl py-5 w-[69%] h-full'
			>
				<h2 className='w-full uppercase border-b-4 text-center pb-3 text-2xl font-bold flex gap-5 items-center justify-center'>
					recipe for{' '}
					{selectedPosition ? (
						<span className='border-2 rounded-lg px-4 bg-zinc-300 text-black'>
							{selectedPosition.name}
						</span>
					) : (
						'NOT FOUND'
					)}
				</h2>
				<div className='w-full h-full flex flex-col gap-2'>
					<div className='grid grid-cols-4 p-10 border-b-4 h-[45%]'>
						<ChefHat className='w-[80%] h-[80%]' />
						<div className='col-span-3 grid grid-cols-5 w-full gap-y-5  text-xl'>
							<label className='flex items-center h-[55px]'>Category:</label>
							<label className='col-span-4 w-full h-[55px] bg-gradient-to-r from-zinc-500 to-zinc-400 flex items-center p-3 rounded-2xl cursor-default placeholder:text-black/50 placeholder:text-lg text-xl'>
								{selectedPosition
									? selectedPosition.category.title
									: 'NOT FOUND'}
							</label>
							<label className='flex items-center h-[55px]'>Price:</label>
							<label className='col-span-4 w-full h-[55px] bg-gradient-to-r from-zinc-500 to-zinc-400 flex items-center p-3 rounded-2xl cursor-default placeholder:text-black/50 placeholder:text-lg text-xl'>
								{selectedPosition
									? `${selectedPosition.price} UAH`
									: 'NOT FOUND'}
							</label>
							{selectedPosition &&
								selectedPosition.discount &&
								new Date(selectedPosition.discount.endAt) > new Date() && (
									<>
										{' '}
										<label className='flex items-center h-[55px]'>
											Discount:
										</label>
										<label className='col-span-4 w-full h-[55px] bg-gradient-to-r from-zinc-500 to-zinc-400 flex items-center p-3 rounded-2xl cursor-default placeholder:text-black/50 placeholder:text-lg text-xl'>
											{selectedPosition.discount?.amount} %
										</label>
									</>
								)}
							<label className='flex items-center h-[55px]'>Description:</label>
							<label className='col-span-4 max-h-[50%] min-h-[55px]  overflow-auto bg-gradient-to-r from-zinc-500 to-zinc-400 px-3 py-3 rounded-2xl cursor-default placeholder:text-black/50 placeholder:text-lg text-xl'>
								{selectedPosition ? selectedPosition.description : 'NOT FOUND'}
							</label>
						</div>
					</div>
					<div className='flex h-[55%]'>
						<div className='flex flex-col w-[50%] p-3 gap-5'>
							<h2 className='w-full h-[5%] uppercase text-2xl font-bold text-center'>
								Steps to reproduce
							</h2>
							<div className='h-[80%] p-5 flex flex-col gap-2 overflow-auto'>
								{selectedPosition
									? selectedPosition.recipe.stepsToReproduce.map(
											(step, indx) => {
												return (
													<label
														key={indx}
														className='p-3 border-[1px] rounded-xl flex gap-3'
													>
														<Footprints />
														{step}
													</label>
												)
											}
										)
									: 'NOT FOUND'}
							</div>
						</div>
						<div className='flex flex-col w-[50%] p-3 gap-5'>
							<h2 className='w-full h-[5%] uppercase text-2xl font-bold text-center'>
								INGREDIENTS
							</h2>
							<div className='h-[80%] p-5 flex flex-col gap-2 overflow-auto'>
								{selectedPosition
									? selectedPosition.recipe.ingredients.map(
											(ingredient, indx) => {
												return (
													<label
														key={indx}
														className='p-3 border-[1px] rounded-xl flex gap-3'
													>
														<Puzzle />
														{ingredient.name}
													</label>
												)
											}
										)
									: 'NOT FOUND'}
							</div>
						</div>
					</div>
				</div>
			</motion.div>
		</div>
	)
}

export default Recipes
