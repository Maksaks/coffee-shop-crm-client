import { motion } from 'framer-motion'
import { FC, useState } from 'react'
import { useLoaderData } from 'react-router-dom'
import MenuPositionItem from '../../components/Barista/MenuPositionItem/MenuPositionItem'
import OrderPositionList from '../../components/Barista/OrderPositionList/OrderPositionList'
import { IMenuPositionWithRecipeData } from '../../types/IMenuPositionWithRecipe'
import { IMenuPositionWithRecipeDataLoader } from './loaders/menuLoader'

export interface SelectedPosition {
	position: IMenuPositionWithRecipeData
	amount: number
}

const CreateOrder: FC = () => {
	const { menuPositions } = useLoaderData() as IMenuPositionWithRecipeDataLoader
	const [selectedPositions, setSelectedPositions] = useState<
		SelectedPosition[]
	>([])

	const addPositionToOrderHandler = (position: IMenuPositionWithRecipeData) => {
		if (selectedPositions.find(item => item.position.id == position.id)) return
		setSelectedPositions(prev => [...prev, { position, amount: 1 }])
	}

	return (
		<motion.div
			initial={{ opacity: 0, y: -20 }}
			animate={{ opacity: 1, y: 0 }}
			exit={{ opacity: 0, y: -20 }}
			transition={{ duration: 0.7 }}
			className='w-[80%] h-[1100px] mt-20 mx-auto text-white font-roboto flex flex-row gap-20'
		>
			<div className='w-[60%] bg-zinc-700 rounded-3xl'>
				<h2 className='h-[5%] p-4 uppercase w-full text-center text-2xl font-bold border-b-4'>
					menu positions
				</h2>
				<div className='w-[95%] mx-auto max-h-[90%] grid grid-cols-4 gap-5 p-5 overflow-auto'>
					{menuPositions.map(item => {
						return (
							<MenuPositionItem
								addPositionToOrder={addPositionToOrderHandler}
								key={item.id}
								menuPosition={item}
							/>
						)
					})}
				</div>
			</div>
			<div className='w-[40%] bg-zinc-700 rounded-3xl'>
				<h2 className='h-[5%] p-4 uppercase w-full text-center text-2xl font-bold border-b-4'>
					current order info
				</h2>
				<OrderPositionList
					selectedPositions={selectedPositions}
					setSelectedPositions={setSelectedPositions}
				/>
			</div>
		</motion.div>
	)
}

export default CreateOrder
