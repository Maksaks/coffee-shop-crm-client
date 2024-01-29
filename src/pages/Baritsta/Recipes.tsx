import { AnimatePresence, motion } from 'framer-motion'
import { ChefHat } from 'lucide-react'
import { FC, useState } from 'react'
import { useLoaderData } from 'react-router-dom'
import { IMenuPositionWithRecipeData } from '../../types/IMenuPositionWithRecipe'
import { IMenuPositionWithRecipeDataLoader } from './loaders/menuLoader'

const Recipes: FC = () => {
	const { menuPositions } = useLoaderData() as IMenuPositionWithRecipeDataLoader
	const [selectedPosition, setSelectedPosition] = useState<
		IMenuPositionWithRecipeData | undefined
	>(menuPositions.length ? menuPositions[0] : undefined)
	console.log(menuPositions)
	return (
		<div className='w-[80%] h-[1000px] mt-20 mx-auto text-white flex gap-[1%] font-roboto'>
			<motion.div
				initial={{ opacity: 0, y: -20 }}
				animate={{ opacity: 1, y: 0 }}
				exit={{ opacity: 0, y: -20 }}
				transition={{ duration: 0.7 }}
				className='bg-zinc-700 rounded-3xl py-5 w-[30%] flex flex-col'
			>
				<h2 className='h-[5%] w-full uppercase border-b-4 text-center pb-3 text-2xl font-bold'>
					Menu positions
				</h2>
				<AnimatePresence>
					<motion.ul
						className='h-[95%] w-full p-5 gap-3 flex flex-col overflow-auto'
						initial={{ opacity: 0, y: -20 }}
						animate={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0, y: -20 }}
						transition={{ duration: 1 }}
					>
						{menuPositions.map(pos => {
							return (
								<motion.li
									key={pos.id}
									className={`w-full hover:cursor-pointer border-2 p-5 flex items-center justify-center gap-2 rounded-xl text-xl hover:bg-zinc-600 ${selectedPosition?.id === pos.id ? 'bg-zinc-600' : 'bg-zinc-800'}`}
									onClick={() => setSelectedPosition(pos)}
								>
									{pos.name}
								</motion.li>
							)
						})}
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
						''
					)}
				</h2>
				<div className='w-full h-full flex flex-col gap-2'>
					<div className='grid grid-cols-4 p-10 border-b-4 h-[40%]'>
						<ChefHat className='w-[80%] h-[80%]' />
						<div className='col-span-3 grid grid-cols-5 w-full gap-y-5  text-xl'>
							<label>Category:</label>
							<label className='col-span-4'>
								{selectedPosition?.category.title}
							</label>
							<label>Price:</label>
							<label className='col-span-4'>{selectedPosition?.price}</label>
							<label>Description:</label>
							<label className='col-span-4 max-h-[70%] overflow-auto'>
								{selectedPosition?.description}
							</label>
						</div>
					</div>
					<div className='flex h-[60%]'>
						<div className='flex flex-col w-[50%] p-3 gap-5'>
							<h2 className='w-full h-[5%] uppercase text-2xl font-bold text-center'>
								Steps to reproduce
							</h2>
							<div className='h-[80%] p-5 flex flex-col gap-2 overflow-auto'>
								{selectedPosition?.recipe.stepsToReproduce.map(step => {
									return (
										<label className='p-3 border-[1px] rounded-xl'>
											{step}
										</label>
									)
								})}
							</div>
						</div>
						<div className='flex flex-col w-[50%] p-3 gap-5'>
							<h2 className='w-full h-[5%] uppercase text-2xl font-bold text-center'>
								INGREDIENTS
							</h2>
							<div className='h-[80%] p-5 flex flex-col gap-2 overflow-auto'>
								{selectedPosition?.recipe.ingredients.map(step => {
									return (
										<label className='p-3 border-[1px] rounded-xl'>
											{step.name}
										</label>
									)
								})}
							</div>
						</div>
					</div>
				</div>
			</motion.div>
		</div>
	)
}

export default Recipes
