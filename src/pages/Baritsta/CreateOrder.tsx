/* eslint-disable react-hooks/exhaustive-deps */
import { motion } from 'framer-motion'
import { FC, useEffect, useState } from 'react'
import { useLoaderData } from 'react-router-dom'
import MenuPositionItem from '../../components/Barista/MenuPositionItem/MenuPositionItem'
import OrderPositionList from '../../components/Barista/OrderPositionList/OrderPositionList'
import OrderInformationModal from '../../components/Modals/OrderInformationModal'
import { ICreatedOrderResultData } from '../../types/ICreatedOrderResultData'
import { IMenuPositionWithRecipeData } from '../../types/IMenuPositionWithRecipe'
import { IMenuPositionWithRecipeDataLoader } from './loaders/menuLoader'

const CreateOrder: FC = () => {
	const { menuPositions } = useLoaderData() as IMenuPositionWithRecipeDataLoader
	const [searchedPosition, setSearchedPositions] =
		useState<IMenuPositionWithRecipeData[]>()

	const [visibleOrderResultModal, setVisibleOrderResultModal] = useState(false)
	const [createdOrderResult, setCreatedOrderResult] =
		useState<ICreatedOrderResultData>()

	useEffect(() => {
		setSearchedPositions(menuPositions)
	}, [])

	const searchHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (!e.target.value.length) {
			setSearchedPositions(menuPositions)
			return
		}
		setSearchedPositions(
			menuPositions?.filter(item =>
				item.name.toLowerCase().includes(e.target.value.toLowerCase())
			)
		)
	}

	return (
		<>
			{visibleOrderResultModal && createdOrderResult && (
				<OrderInformationModal
					result={createdOrderResult}
					setVisibleModal={setVisibleOrderResultModal}
				/>
			)}
			<motion.div
				initial={{ opacity: 0, y: -20 }}
				animate={{ opacity: 1, y: 0 }}
				exit={{ opacity: 0, y: -20 }}
				transition={{ duration: 0.7 }}
				className='w-[80%] h-[1100px] mt-20 mx-auto text-white font-roboto flex flex-row gap-20'
			>
				<div className='w-[60%] bg-zinc-700 rounded-3xl flex items-center flex-col'>
					<h2 className='h-[5%] p-4 uppercase w-full text-center text-2xl font-bold border-b-4'>
						menu positions
					</h2>
					<input
						className='w-[90%] py-2 px-5 my-5 rounded-2xl text-black text-xl'
						placeholder='Search position by name...'
						onChange={searchHandler}
					/>
					<div className='w-[95%] mx-auto max-h-[80%] grid grid-cols-4 gap-5 p-5 overflow-auto'>
						{searchedPosition?.length ? (
							searchedPosition.map(item => {
								return <MenuPositionItem key={item.id} menuPosition={item} />
							})
						) : (
							<h2 className='col-span-4 w-full text-center p-10 text-2xl font-bold'>
								Any positions were not found
							</h2>
						)}
					</div>
				</div>
				<div className='w-[40%] bg-zinc-700 rounded-3xl'>
					<h2 className='h-[5%] p-4 uppercase w-full text-center text-2xl font-bold border-b-4'>
						current order info
					</h2>
					<OrderPositionList
						setOrderResult={setCreatedOrderResult}
						setVisibleModal={setVisibleOrderResultModal}
					/>
				</div>
			</motion.div>
		</>
	)
}

export default CreateOrder
