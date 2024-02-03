import { motion } from 'framer-motion'
import { Pencil, Plus, Trash2 } from 'lucide-react'
import { FC, useEffect, useState } from 'react'
import { useLoaderData, useNavigate, useSearchParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import CreatingIngredientModal from '../../components/Modals/CreatingIngredientModal'
import UpdateIngredientModal from '../../components/Modals/UpdateIngredientModal'
import { IngredientsService } from '../../services/Admin/IngredientsService'
import { IIngredientData } from '../../types/IIngredientData'
import { IPointWithIngredient } from '../../types/IPointWithIngredient'
import { IIngredientsWithPointLoader } from './loaders/ingredientsWithPointsLoader'

const Ingredients: FC = () => {
	const { points } = useLoaderData() as IIngredientsWithPointLoader
	const navigate = useNavigate()
	const [searchParams, setSearchParams] = useSearchParams()
	const [searchedPoints, setSearchedPoints] = useState<IPointWithIngredient[]>()
	const [selectedPoint, setSelectedPoint] = useState<IPointWithIngredient>()
	const [selectedIngredients, setSelectedIngredients] =
		useState<IIngredientData[]>()
	const [selectedIngredient, setSelectedIngredient] =
		useState<IIngredientData>()
	const [isUpdatingModalVisible, setIsUpdatingModalVisible] = useState(false)
	const [isCreatingModalVisible, setIsCreatingModalVisible] = useState(false)

	useEffect(() => {
		if (points) {
			setSearchedPoints(points)
		}
		const pointID = searchParams.get('point')
		if (pointID) {
			setSelectedPoint(points.find(item => item.id == +pointID))
		}
	}, [])

	useEffect(() => {
		setSelectedIngredients([])
		const getIngredientsForPoint = async () => {
			if (!selectedPoint) return
			try {
				const ingredients = await IngredientsService.getIngredientsForPoint(
					selectedPoint?.id
				)
				if (ingredients) {
					setSelectedIngredients(ingredients)
				}
			} catch (err: any) {
				const error = err.response?.data.message
				toast.error(error.toString())
			}
		}
		getIngredientsForPoint()
	}, [selectedPoint])

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

	const removeIngredientHandler = async (item: IIngredientData) => {
		try {
			await IngredientsService.deleteIngredientByID(item.id)
			toast.success(`Ingredient #${item.id} was successfully removed`)
			navigate('/admin/refresh')
			navigate(`/admin/ingredients?point=${selectedPoint?.id}`)
		} catch (err: any) {
			const error = err.response?.data.message
			toast.error(error.toString())
		}
	}

	return (
		<>
			{isUpdatingModalVisible && selectedIngredient && selectedPoint && (
				<UpdateIngredientModal
					ingredient={selectedIngredient}
					pointID={selectedPoint?.id}
					setVisibleModal={setIsUpdatingModalVisible}
				/>
			)}
			{isCreatingModalVisible && selectedPoint && (
				<CreatingIngredientModal
					pointID={selectedPoint?.id}
					setVisibleModal={setIsCreatingModalVisible}
				/>
			)}
			<motion.div
				initial={{ opacity: 0, y: -20 }}
				animate={{ opacity: 1, y: 0 }}
				exit={{ opacity: 0, y: -20 }}
				transition={{ duration: 0.7 }}
				className='w-[70%] h-[1000px] mt-20 mx-auto text-white font-roboto flex items-center gap-5 shadow-2xl'
			>
				<div className='h-[100%] w-[25%] bg-zinc-700 rounded-3xl flex items-center flex-col relative'>
					<h2 className='w-full text-center text-2xl uppercase font-bold border-b-4 p-3'>
						POINTS
					</h2>
					<button
						className='absolute top-2 right-2 z-10 w-10 h-10 hover:text-black hover:bg-zinc-300 rounded-full disabled:hover:bg-zinc-700 disabled:hover:text-white'
						disabled={!selectedPoint}
						onClick={() => {
							setIsCreatingModalVisible(true)
						}}
					>
						<Plus className='w-10 h-10' />
					</button>
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
										title='Select this barista'
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
				<div className='h-[100%] w-[75%] bg-zinc-700 rounded-3xl flex items-center flex-col relative'>
					<h2 className='w-full text-center text-2xl uppercase font-bold border-b-4 p-3'>
						INGREDIENTS ON POINT
					</h2>
					<div className='flex flex-col w-full items-center gap-2 h-[90%]'>
						<div className='w-[90%] bg-zinc-800/95 mt-3 h-[70px] rounded-t-2xl grid grid-cols-10 items-center px-5 py-2 font-bold text-xl'>
							<label>ID</label>
							<label className='col-span-4 text-center'>NAME</label>
							<label className='col-span-2 text-center'>PRICE</label>
							<label className='col-span-2 text-center'>QUANTITY</label>
						</div>
						<div className='h-[90%] overflow-auto w-[90%] flex flex-col items-center gap-2 p-2'>
							{selectedIngredients?.length ? (
								selectedIngredients.map((item, indx) => {
									return (
										<div
											key={indx}
											className='w-full bg-zinc-600/90 h-[60px] rounded-2xl grid grid-cols-10 items-center px-5 py-2 text-lg'
										>
											<label>{item.id}</label>
											<label className='col-span-4 text-center'>
												{item.name}
											</label>
											<label className='col-span-2 text-center'>
												{item.price.toFixed(2)} UAH
											</label>
											<label className='col-span-2 text-center'>
												{item.quantity}
											</label>
											<div className='col-span-1 flex justify-end'>
												<button
													className='w-10 rounded-full flex justify-end hover:bg-green-300 p-2'
													onClick={() => {
														setSelectedIngredient(item)
														setIsUpdatingModalVisible(true)
													}}
												>
													<Pencil />
												</button>
												<button
													className='w-10 rounded-full flex justify-end hover:bg-red-500 p-2'
													onClick={() => removeIngredientHandler(item)}
												>
													<Trash2 />
												</button>
											</div>
										</div>
									)
								})
							) : (
								<h2 className='uppercase text-white/70 font-bold text-xl w-full text-center'>
									Ingredients were not found
								</h2>
							)}
						</div>
					</div>
				</div>
			</motion.div>
		</>
	)
}

export default Ingredients
