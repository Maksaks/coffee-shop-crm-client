import { motion } from 'framer-motion'
import { Footprints, ListPlus, Pencil, Trash2 } from 'lucide-react'
import { FC, useEffect, useState } from 'react'
import { useLoaderData, useNavigate, useSearchParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import Button from '../../components/Button/Button'
import CreateMenuPositionModal from '../../components/Modals/CreateMenuPositionModal'
import UpdateIngredientsModal from '../../components/Modals/UpdateIngredientsModal'
import UpdateStepsMenuPositionModal from '../../components/Modals/UpdateStepsMenuPositionModal'
import { MenuPositionsService } from '../../services/Admin/MenuPositionsService'
import { ICategoryData } from '../../types/ICategory'
import { ICreateMenuPosition } from '../../types/ICreateMenuPosition'
import { IMenuPosition } from '../../types/IMenuPosition'
import { IMenuPositionWithRecipeData } from '../../types/IMenuPositionWithRecipe'
import { IPointAllData } from '../../types/IPointAllData'
import { IPositionAllDataLoader } from './loaders/positionsLoader'

const MenuPositions: FC = () => {
	const { points } = useLoaderData() as IPositionAllDataLoader
	const [categories, setCategories] = useState<ICategoryData[]>([])
	const [selectedPoint, setSelectedPoint] = useState<IPointAllData>()
	const [selectedPosition, setSelectedPosition] = useState<IMenuPosition>()
	const [searchedPointPositions, setSearchedPointPositions] = useState<
		IMenuPosition[]
	>([])
	const navigate = useNavigate()
	const [selectedPositionWithRecipe, setSelectedPositionWithRecipe] =
		useState<IMenuPositionWithRecipeData>()
	const [name, setName] = useState('')
	const [category, setCategory] = useState<number>()
	const [price, setPrice] = useState<number>(0)
	const [description, setDescription] = useState('')
	const [searchParams, setSearchParams] = useSearchParams()
	const [isCreatingModalVisible, setIsCreatingModalVisible] = useState(false)
	const [isUpdatingStepsModalVisible, setIsUpdatingStepsModalVisible] =
		useState(false)
	const [
		isUpdatingIngredientsModalVisible,
		setIsUpdatingIngredientsModalVisible,
	] = useState(false)

	const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
		try {
			e.preventDefault()
			let dataToUpdate: ICreateMenuPosition = {}
			if (!selectedPositionWithRecipe || !category || !selectedPoint) return
			if (name !== selectedPositionWithRecipe.name) {
				dataToUpdate = { ...dataToUpdate, name }
			}
			if (category !== selectedPositionWithRecipe.category.id) {
				dataToUpdate = { ...dataToUpdate, category }
			}
			if (price !== selectedPositionWithRecipe.price) {
				dataToUpdate = { ...dataToUpdate, price }
			}
			if (description !== selectedPositionWithRecipe.description) {
				dataToUpdate = { ...dataToUpdate, description }
			}

			await MenuPositionsService.updateMenuPosition(
				selectedPoint.id,
				selectedPositionWithRecipe.id,
				dataToUpdate
			)
			navigate('/admin/refresh')
			navigate(
				`/admin/positions?point=${selectedPoint.id}&position=${selectedPositionWithRecipe.id}`
			)
			toast.success(
				`Menu Position #${selectedPositionWithRecipe.id} data was successfully updated`
			)
		} catch (err: any) {
			const error = err.response?.data.message
			toast.error(error.toString())
		}
	}

	useEffect(() => {
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
		getAllCategories()
		const pointID = searchParams.get('point')
		const positionID = searchParams.get('position')
		if (pointID) {
			const point = points.find(item => item.id == +pointID)
			if (!point) return
			setSelectedPoint(point)
			setSearchedPointPositions(point?.menuPositions)
			if (positionID) {
				setSelectedPosition(
					point?.menuPositions.find(item => item.id == +positionID)
				)
			}
		}
	}, [])

	useEffect(() => {
		const getMenuPositionInfoByID = async () => {
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
		getMenuPositionInfoByID()
	}, [selectedPosition])

	const searchHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (!selectedPoint) return
		if (!e.target.value.length) {
			setSearchedPointPositions(selectedPoint?.menuPositions)
			return
		}
		setSearchedPointPositions(
			selectedPoint?.menuPositions.filter(item =>
				item.name.toLowerCase().includes(e.target.value.toLowerCase())
			)
		)
	}

	const deletePositionHandler = async () => {
		try {
			if (!selectedPositionWithRecipe || !selectedPoint) return
			await MenuPositionsService.deleteMenuPositionByID(
				selectedPoint?.id,
				selectedPositionWithRecipe.id
			)
			toast.success(
				`Menu Position [${selectedPositionWithRecipe.name}] was removed`
			)
			setName('')
			setCategory(-1)
			setPrice(0)
			setDescription('')
			setSelectedPositionWithRecipe(undefined)
			setSelectedPosition(undefined)
			navigate('/admin/refresh')
			navigate(`/admin/positions?point=${selectedPoint.id}`)
		} catch (err: any) {
			const error = err.response?.data.message
			toast.error(error.toString())
		}
	}

	return (
		<>
			{isUpdatingIngredientsModalVisible &&
				selectedPosition &&
				selectedPositionWithRecipe &&
				selectedPoint && (
					<UpdateIngredientsModal
						currentIngredients={selectedPositionWithRecipe?.recipe.ingredients}
						pointID={selectedPoint.id}
						pointIngredients={selectedPoint.ingredients}
						positionID={selectedPosition?.id}
						setVisibleModal={setIsUpdatingIngredientsModalVisible}
					/>
				)}
			{isUpdatingStepsModalVisible &&
				selectedPoint &&
				selectedPositionWithRecipe && (
					<UpdateStepsMenuPositionModal
						pointID={selectedPoint.id}
						positionID={selectedPositionWithRecipe.id}
						stepsToReproduce={
							selectedPositionWithRecipe.recipe.stepsToReproduce
						}
						setVisibleModal={setIsUpdatingStepsModalVisible}
					/>
				)}
			{isCreatingModalVisible && categories && selectedPoint && (
				<CreateMenuPositionModal
					pointID={selectedPoint.id}
					categories={categories}
					setVisibleModal={setIsCreatingModalVisible}
				/>
			)}
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
					<button
						className='absolute right-5 top-1 py-1 px-2 bg-zinc-900 font-bold hover:bg-zinc-400 rounded-xl hover:text-black disabled:hover:bg-zinc-900 disabled:hover:text-white'
						disabled={!selectedPoint}
						onClick={() => setIsCreatingModalVisible(true)}
					>
						<ListPlus className='w-10 h-10' />
					</button>
					<small className='w-[80%] text-sm uppercase font-bold mt-2 text-left'>
						positions for point:
					</small>
					<select
						id='selectPoint'
						className='p-3 text-black h-[5%] rounded-xl text-xl  w-[85%] mb-3 font-roboto hover:cursor-pointer'
						value={selectedPoint?.id}
						onChange={e => {
							setName('')
							setCategory(-1)
							setPrice(0)
							setDescription('')
							setSelectedPositionWithRecipe(undefined)
							setSelectedPosition(undefined)
							setSelectedPoint(() => {
								const point = points.find(item => item.id == +e.target.value)
								if (point) setSearchedPointPositions(point?.menuPositions)
								return point
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
						{selectedPoint && (
							<input
								className='w-[90%] py-2 px-5 my-3 rounded-2xl text-black text-xl'
								placeholder='Search position by name...'
								onChange={searchHandler}
								disabled={!selectedPoint.menuPositions.length}
							/>
						)}
						{selectedPoint ? (
							searchedPointPositions.length ? (
								searchedPointPositions.map((item, indx) => {
									return (
										<button
											key={indx}
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
						className='grid grid-cols-6 px-12 pt-10 grid-rows-3 w-full h-[35%] items-center border-b-4 relative'
						onSubmit={submitHandler}
					>
						<button
							className='absolute top-3 right-3'
							disabled={!selectedPositionWithRecipe}
							onClick={deletePositionHandler}
							type='button'
						>
							<Trash2
								className={`w-16 h-16 p-2 rounded-full ${selectedPositionWithRecipe ? 'hover:stroke-black hover:bg-zinc-400' : ''}`}
							/>
						</button>
						<label className='text-2xl font-bold p-3 flex items-center'>
							Name:
						</label>
						<input
							required
							name='name'
							className='w-[80%] h-[60px] col-span-2 bg-gradient-to-r from-zinc-500 to-zinc-400 p-3 rounded-2xl hover:border-2 placeholder:text-white/70 placeholder:text-lg text-xl disabled:hover:border-0'
							placeholder='Enter name...'
							value={name}
							disabled={!selectedPositionWithRecipe}
							onChange={e => setName(e.target.value)}
						/>
						<label className='text-2xl col-start-4 col-span-1 font-bold p-3  flex items-center'>
							Description:
						</label>
						<textarea
							required
							name='description'
							className='w-full h-[90%] row-start-2 col-start-4 col-span-3 row-span-3 bg-gradient-to-r from-zinc-500 to-zinc-400 p-3 rounded-2xl hover:border-2 overflow-auto placeholder:text-white/70 placeholder:text-lg text-xl disabled:hover:border-0'
							placeholder='Enter description...'
							value={description}
							disabled={!selectedPositionWithRecipe}
							onChange={e => setDescription(e.target.value)}
						/>
						<label className='text-2xl font-bold p-3  flex items-center'>
							Category:
						</label>
						<select
							required
							name='category'
							className={`w-[80%] h-[60px] col-span-2 bg-gradient-to-r from-zinc-500 to-zinc-400 p-3 rounded-2xl hover:border-2 placeholder:text-white/70 placeholder:text-lg text-xl disabled:hover:border-0`}
							defaultValue={-1}
							value={category}
							disabled={!selectedPositionWithRecipe}
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
							className='w-[80%] h-[60px] col-span-2 bg-gradient-to-r from-zinc-500 to-zinc-400 p-3 rounded-2xl hover:border-2 placeholder:text-white/70 placeholder:text-lg text-xl disabled:hover:border-0'
							placeholder='Enter price...'
							value={price}
							disabled={!selectedPositionWithRecipe}
							onChange={e => setPrice(+e.target.value)}
						/>

						<Button
							className='col-start-5 row-start-1 col-span-2 w-[50%] mx-auto px-10 uppercase disabled:hover:text-white disabled:hover:bg-zinc-800'
							title='Update'
							disabled={!selectedPositionWithRecipe}
							type='submit'
						/>
					</form>
					<h2 className='w-full h-[4%] text-center uppercase text-2xl font-bold p-2'>
						Recipe
					</h2>
					<div className='w-full h-[60%] p-5 flex gap-5'>
						<div className='w-[50%] flex flex-col gap-3 h-full bg-zinc-600 rounded-2xl relative'>
							<button
								className='absolute right-1 top-1 rounded-full hover:bg-zinc-400 p-2 hover:text-black disabled:hover:bg-zinc-600 disabled:hover:text-white'
								onClick={() => setIsUpdatingStepsModalVisible(true)}
								disabled={!selectedPoint || !selectedPositionWithRecipe}
							>
								<Pencil className='w-7 h-7' />
							</button>
							<h2 className='w-full border-b-4 uppercase text-center p-3 font-bold text-xl'>
								steps to reproduce
							</h2>
							<div className='w-[90%] mx-auto h-[80%] rounded-2xl overflow-auto flex flex-col gap-2'>
								{selectedPositionWithRecipe &&
									selectedPositionWithRecipe.recipe.stepsToReproduce.map(
										(item, indx) => {
											return (
												<label
													key={indx}
													className='w-full p-3 bg-zinc-500 min-h-10 rounded-2xl flex gap-2'
												>
													<Footprints />
													{item}
												</label>
											)
										}
									)}
							</div>
						</div>
						<div className='w-[50%] flex flex-col gap-3 h-full bg-zinc-600 rounded-2xl relative'>
							<h2 className='w-full border-b-4 uppercase text-center p-3 font-bold text-xl'>
								ingredients
							</h2>
							<button
								className='absolute right-1 top-1 rounded-full hover:bg-zinc-400 p-2 hover:text-black disabled:hover:bg-zinc-600 disabled:hover:text-white'
								disabled={!selectedPoint || !selectedPositionWithRecipe}
								onClick={() => setIsUpdatingIngredientsModalVisible(true)}
							>
								<Pencil className='w-7 h-7' />
							</button>
							<div className='w-[90%] mx-auto h-[80%] rounded-2xl overflow-auto flex flex-col gap-2'>
								{selectedPositionWithRecipe &&
									selectedPositionWithRecipe.recipe.ingredients.map(item => {
										return (
											<label
												key={item.id}
												className='w-full p-3 bg-zinc-500 min-h-10 rounded-2xl flex gap-2'
											>
												<Footprints />
												{item.name}
											</label>
										)
									})}
							</div>
						</div>
					</div>
				</div>
			</motion.div>
		</>
	)
}

export default MenuPositions
