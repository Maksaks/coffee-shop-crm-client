import { motion } from 'framer-motion'
import { FC, useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import Button from '../../components/Button/Button'
import { MenuPositionsService } from '../../services/Admin/MenuPositionsService'
import { ICategoryData } from '../../types/ICategory'
import { IMenuPosition } from '../../types/IMenuPosition'
import { IMenuPositionWithRecipeData } from '../../types/IMenuPositionWithRecipe'
import { IPointAllData } from '../../types/IPointAllData'

const MenuPositions: FC = () => {
	const [points, setPoints] = useState<IPointAllData[]>([])
	const [categories, setCategories] = useState<ICategoryData[]>([])
	const [selectedPoint, setSelectedPoint] = useState<IPointAllData>()
	const [selectedPosition, setSelectedPosition] = useState<IMenuPosition>()
	const [selectedPositionWithRecipe, setSelectedPositionWithRecipe] =
		useState<IMenuPositionWithRecipeData>()
	const [name, setName] = useState('')
	const [category, setCategory] = useState<number>()
	const [price, setPrice] = useState<number>()
	const [description, setDescription] = useState('')

	const submitHandler = e => {}

	useEffect(() => {
		const getPointsWithPositions = async () => {
			try {
				const pointsWithPositionsData =
					await MenuPositionsService.getPointsWithPositions()
				if (pointsWithPositionsData) {
					setPoints(pointsWithPositionsData)
				}
			} catch (err: any) {
				const error = err.response?.data.message
				toast.error(error.toString())
			}
		}
		const getAllCategories = async () => {
			try {
				const categoriesData = await MenuPositionsService.getCategories()
				if (categoriesData) {
					setCategories(categoriesData)
				}
			} catch (err: any) {
				const error = err.response?.data.message
				toast.error(error.toString())
			}
		}
		getPointsWithPositions()
		getAllCategories()
	}, [])

	useEffect(() => {
		const getPointsWithPositions = async () => {
			if (!selectedPoint || !selectedPosition) return
			try {
				const menuPosition = await MenuPositionsService.getMenuPositionInfoByID(
					selectedPoint?.id,
					selectedPosition?.id
				)
				if (menuPosition) {
					setSelectedPositionWithRecipe(menuPosition)
					setName(menuPosition.name)
					setCategory(menuPosition.category.id)
					setPrice(menuPosition.price)
					setDescription(menuPosition.description)
				}
			} catch (err: any) {
				const error = err.response?.data.message
				toast.error(error.toString())
			}
		}
		getPointsWithPositions()
	}, [selectedPosition])

	return (
		<motion.div
			initial={{ opacity: 0, y: -20 }}
			animate={{ opacity: 1, y: 0 }}
			exit={{ opacity: 0, y: -20 }}
			transition={{ duration: 0.7 }}
			className='w-[80%] h-[1000px] mt-20 mx-auto text-white font-roboto flex items-center gap-5'
		>
			<div className='h-[100%] w-[25%] bg-zinc-700 rounded-3xl flex items-center flex-col relative'>
				<h2 className='w-full h-[6%] p-3 border-b-4 uppercase text-center text-2xl font-bold'>
					Menu positions
				</h2>
				<small className='w-[85%] text-sm uppercase font-bold mt-2 text-left'>
					positions for point:
				</small>
				<select
					id='selectPoint'
					className='p-3 text-black h-[5%] rounded-xl text-xl  w-[90%] mb-3 font-roboto hover:cursor-pointer'
					onChange={e => {
						setSelectedPositionWithRecipe(undefined)
						setSelectedPosition(undefined)
						setSelectedPoint(() => {
							return points.find(item => item.id == +e.target.value)
						})
					}}
					required
					defaultValue={-1}
				>
					<option value={-1}>Select point...</option>
					{points.map(item => {
						return (
							<option key={item.id} value={item.id}>
								{item.name}
							</option>
						)
					})}
				</select>
				<div className='flex flex-col h-[83%] w-full border-t-4 p-3 overflow-auto items-center gap-3'>
					{selectedPoint ? (
						selectedPoint.menuPositions.length ? (
							selectedPoint.menuPositions.map(item => {
								return (
									<button
										className='p-3 w-[90%] bg-zinc-500 uppercase font-bold text-xl rounded-2xl hover:bg-zinc-300 hover:text-black'
										onClick={() => setSelectedPosition(item)}
									>
										{item.name}
									</button>
								)
							})
						) : (
							<h2 className='w-full p-3 uppercase text-center text-2xl font-bold'>
								Any menu positions
								<br /> were not found
							</h2>
						)
					) : (
						<h2 className='w-full p-3 uppercase text-center text-2xl font-bold'>
							Select point to search...
						</h2>
					)}
				</div>
			</div>
			<div className='h-[100%] w-[75%] bg-zinc-700 rounded-3xl flex items-center flex-col relative'>
				<form
					className='grid grid-cols-6 px-12 pt-10 grid-rows-3 w-full h-[30%] items-center border-b-4'
					onSubmit={submitHandler}
				>
					<label className='text-2xl font-bold p-3 flex items-center'>
						Name:
					</label>
					<input
						required
						name='name'
						className='w-[80%] h-[60px] col-span-2 bg-gradient-to-r from-zinc-500 to-zinc-400 p-3 rounded-2xl hover:border-2 placeholder:text-white/70 placeholder:text-lg text-xl'
						placeholder='Enter name...'
						value={name}
						onChange={e => setName(e.target.value)}
					/>
					<label className='text-2xl col-start-4 col-span-2 font-bold p-3  flex items-center'>
						Description:
					</label>
					<textarea
						required
						name='description'
						className='w-full h-[90%] row-start-2 col-start-4 col-span-3 row-span-3 bg-gradient-to-r from-zinc-500 to-zinc-400 p-3 rounded-2xl hover:border-2 overflow-auto placeholder:text-white/70 placeholder:text-lg text-xl'
						placeholder='Enter description...'
						value={description}
						onChange={e => setDescription(e.target.value)}
					/>
					<label className='text-2xl font-bold p-3  flex items-center'>
						Category:
					</label>
					<select
						required
						name='category'
						className={`w-[80%] h-[60px] col-span-2 bg-gradient-to-r from-zinc-500 to-zinc-400 p-3 rounded-2xl hover:border-2 placeholder:text-white/70 placeholder:text-lg text-xl`}
						defaultValue={-1}
						value={category}
						onChange={e => setCategory(+e.target.value)}
					>
						<option className='text-black' value={-1}>
							Select category...
						</option>
						{categories.map(item => {
							return (
								<option className='text-black' key={item.id} value={item.id}>
									{item.title}
								</option>
							)
						})}
					</select>
					<label className='text-2xl font-bold p-3  flex items-center'>
						Price:
					</label>
					<input
						required
						name='price'
						className='w-[80%] h-[60px] col-span-2 bg-gradient-to-r from-zinc-500 to-zinc-400 p-3 rounded-2xl hover:border-2 placeholder:text-white/70 placeholder:text-lg text-xl'
						placeholder='Enter price...'
						value={price}
						onChange={e => setPrice(+e.target.value)}
					/>

					<Button
						className='col-start-6 row-start-1 px-10 uppercase disabled:hover:text-white disabled:hover:bg-zinc-800'
						title='Update'
						type='submit'
					/>
				</form>
				<div className='w-full h-[60%] border-2'></div>
			</div>
		</motion.div>
	)
}

export default MenuPositions
