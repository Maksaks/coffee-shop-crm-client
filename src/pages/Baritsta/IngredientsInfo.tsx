/* eslint-disable react-hooks/exhaustive-deps */
import { motion } from 'framer-motion'
import { Plus } from 'lucide-react'
import { FC, useEffect, useState } from 'react'
import { useLoaderData } from 'react-router-dom'
import UpdateIngredientQuantityModal from '../../components/Modals/UpdateIngredientQuantityModal'
import { useAppSelector } from '../../store/hooks'
import { IIngredientData } from '../../types/IIngredientData'
import { IIngredientDataLoader } from './loaders/ingredientsLoader'

const IngredientsInfo: FC = () => {
	const { ingredients } = useLoaderData() as IIngredientDataLoader
	const [isModalVisible, setIsModalVisible] = useState(false)
	const [searchedIngredients, setSearchedIngredients] =
		useState<IIngredientData[]>()

	useEffect(() => {
		setSearchedIngredients(ingredients)
	}, [])

	const searchHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (!e.target.value.length) {
			setSearchedIngredients(ingredients)
			return
		}
		setSearchedIngredients(
			ingredients?.filter(item =>
				item.name.toLowerCase().includes(e.target.value.toLowerCase())
			)
		)
	}

	const pointID = useAppSelector(state => state.barista.point?.id)
	const [selectedIngredient, setSelectedIngredient] =
		useState<IIngredientData>()

	const updateIngredientHandler = (itemID: IIngredientData) => {
		setSelectedIngredient(itemID)
		setIsModalVisible(true)
	}

	return (
		<>
			{isModalVisible && selectedIngredient && pointID && (
				<UpdateIngredientQuantityModal
					setVisibleModal={setIsModalVisible}
					ingredient={selectedIngredient}
					pointID={pointID}
				/>
			)}
			<motion.div
				initial={{ opacity: 0, y: -20 }}
				animate={{ opacity: 1, y: 0 }}
				exit={{ opacity: 0, y: -20 }}
				transition={{ duration: 0.7 }}
				className='w-[50%] h-[80vh] mt-[5vh] mx-auto bg-zinc-700 rounded-3xl text-white font-roboto flex flex-col items-center gap-5 shadow-2xl'
			>
				<h1 className='h-[6vh] p-[1vh] uppercase w-full text-center text-[3vh] font-bold border-b-4'>
					INGREDIENT ON CURRENT POINT
				</h1>
				<input
					className='w-[90%] py-2 px-5 rounded-2xl text-black text-[2vh]'
					placeholder='Search ingredients by name...'
					onChange={searchHandler}
				/>
				<div className='h-[80%] overflow-auto w-[90%]'>
					<table className='table-auto w-full text-center border-collapse mx-auto'>
						<thead>
							<tr className='sticky top-0 text-[2vh] bg-zinc-800'>
								<th className='w-[5%] p-2 border border-white'>ID</th>
								<th className='w-[70%] p-2 border border-white'>NAME</th>
								<th className='w-[20%] p-2 border border-white'>QUANTITY</th>
								<th className='w-[5%] p-2 border border-white'>ADD</th>
							</tr>
						</thead>
						<tbody className='text-[2vh]'>
							{searchedIngredients?.length ? (
								searchedIngredients.map((item, indx) => {
									return (
										<tr key={indx} className='bg-zinc-600'>
											<td className='p-2 border border-white'>{indx + 1}</td>
											<td className='border border-white text-left pl-5'>
												{item.name}
											</td>
											<td className='border border-white'>{item.quantity}</td>
											<td
												className='border border-white hover:bg-zinc-700 flex items-center justify-center hover:cursor-pointer p-2'
												onClick={() => updateIngredientHandler(item)}
											>
												<Plus className='w-10 h-10' />
											</td>
										</tr>
									)
								})
							) : (
								<tr className='bg-zinc-600'>
									<td className='p-2 border border-white'></td>
									<td className='border border-white text-left pl-5'>
										NOT FOUND
									</td>
									<td className='border border-white'></td>
								</tr>
							)}
						</tbody>
					</table>
				</div>
			</motion.div>
		</>
	)
}

export default IngredientsInfo
