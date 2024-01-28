import { Plus } from 'lucide-react'
import { FC, useState } from 'react'
import { useLoaderData } from 'react-router-dom'
import UpdateIngredientQuantityModal from '../../components/Modals/UpdateIngredientQuantityModal'
import { useAppSelector } from '../../store/hooks'
import { IIngredientData } from '../../types/IIngredientData'
import { IIngredientDataLoader } from './loaders/ingredientsLoader'

const IngredientsInfo: FC = () => {
	const { ingredients } = useLoaderData() as IIngredientDataLoader
	const [isModalVisible, setIsModalVisible] = useState(false)

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
			<div className='w-[80%] min-h-[1000px] mt-20 mx-auto bg-zinc-700 rounded-3xl p-10 text-white'>
				<table className='table-auto w-[90%] text-center border-collapse mx-auto'>
					<thead>
						<tr className='text-2xl bg-zinc-800'>
							<th className='w-[5%] p-2 border border-white'>ID</th>
							<th className='w-[70%] p-2 border border-white'>NAME</th>
							<th className='w-[20%] p-2 border border-white'>QUANTITY</th>
							<th className='w-[5%] p-2 border border-white'>ADD</th>
						</tr>
					</thead>
					<tbody className='text-xl'>
						{ingredients.map((item, indx) => {
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
										<Plus className='w-8 h-8' />
									</td>
								</tr>
							)
						})}
					</tbody>
				</table>
			</div>
		</>
	)
}

export default IngredientsInfo
