import { motion } from 'framer-motion'
import { Pencil, Trash2 } from 'lucide-react'
import { FC, useEffect, useState } from 'react'
import { useLoaderData, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import UpdateDiscountModal from '../../components/Modals/UpdateDiscountModal'
import { dateTimeFormatter } from '../../helper/date-formater.helper'
import { DiscountsService } from '../../services/Admin/DiscountsService'
import { IDiscountAllData } from '../../types/IDiscountAllData'
import { IDiscountLoader } from './loaders/discountsLoader'

const Discounts: FC = () => {
	const navigate = useNavigate()
	const { discounts } = useLoaderData() as IDiscountLoader
	const [selectedDiscount, setSelectedDiscount] = useState<IDiscountAllData>()
	const [searchedDiscounts, setSearchedDiscounts] =
		useState<IDiscountAllData[]>()
	const [isUpdateDiscountModalVisible, setIsUpdateDiscountModalVisible] =
		useState(false)

	useEffect(() => {
		setSearchedDiscounts(discounts)
	}, [])

	const searchHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (!e.target.value.length) {
			setSearchedDiscounts(discounts)
			return
		}
		setSearchedDiscounts(
			discounts?.filter(item => {
				return item.menuPosition.name
					.toLowerCase()
					.includes(e.target.value.toLowerCase())
			})
		)
	}

	const removeDiscountHandler = async (item: IDiscountAllData) => {
		try {
			await DiscountsService.deleteDiscount(item.id)
			toast.success(
				`Discount for position ${item.menuPosition.name} was removed`
			)
			navigate('/admin/refresh')
			navigate(`/admin/discounts`)
		} catch (err: any) {
			const error = err.response?.data.message
			toast.error(error.toString())
		}
	}

	return (
		<>
			{isUpdateDiscountModalVisible && selectedDiscount && (
				<UpdateDiscountModal
					discount={selectedDiscount}
					setVisibleModal={setIsUpdateDiscountModalVisible}
				/>
			)}
			<motion.div
				initial={{ opacity: 0, y: -20 }}
				animate={{ opacity: 1, y: 0 }}
				exit={{ opacity: 0, y: -20 }}
				transition={{ duration: 0.7 }}
				className='w-[50%] h-[75vh] mt-[5vh] mx-auto bg-zinc-500 text-white font-roboto flex flex-col gap-4 rounded-2xl shadow-2xl'
			>
				<h2 className='w-full text-center p-3 border-b-4 text-[2vh] font-bold rounded-t-2xl bg-zinc-700'>
					DISCOUNTS FOR POSITIONS
				</h2>
				<input
					className='w-[95%] py-2 px-5 mx-auto rounded-2xl text-black text-[2vh]'
					placeholder='Search discount by position name...'
					onChange={searchHandler}
				/>
				<div className='w-[95%] p-3 h-[75%] overflow-auto bg-zinc-400 mx-auto rounded-2xl shadow-xl flex flex-col items-center gap-2'>
					{searchedDiscounts?.length ? (
						<div className='w-[95%] bg-zinc-700/95 h-[5vh] rounded-t-2xl grid grid-cols-12 items-center px-5 py-2 font-bold text-[2vh]'>
							<label>ID</label>
							<label className='col-span-3 text-center'>POSITION</label>
							<label className='col-span-1 text-center'>AMOUNT</label>
							<label className='col-span-3 text-center'>STARTED AT</label>
							<label className='col-span-3 text-center'>ENDED AT</label>
							<label className='col-span-1 text-center'></label>
						</div>
					) : (
						<></>
					)}
					{searchedDiscounts?.length ? (
						searchedDiscounts.map((item, indx) => {
							return (
								<div
									key={indx}
									className='w-[95%] bg-zinc-600/90 h-[5vh] rounded-2xl grid grid-cols-12 items-center px-5 py-2 text-[1.7vh]'
								>
									<label>{item.id}</label>
									<label className='col-span-3 text-center'>
										{item.menuPosition.name}
									</label>
									<label className='col-span-1 text-center'>
										{item.amount} %
									</label>
									<label className='col-span-3 text-center'>
										{dateTimeFormatter(item.startedAt)}
									</label>
									<label className='col-span-3 text-center'>
										{dateTimeFormatter(item.endAt)}
									</label>
									<div className='col-span-1 flex justify-end'>
										<button
											className='w-[2vw] h-[3.5vh] rounded-full flex justify-end hover:bg-green-300 p-1'
											onClick={() => {
												setSelectedDiscount(item)
												setIsUpdateDiscountModalVisible(true)
											}}
										>
											<Pencil className='w-[1.5vw] h-[2.5vh]' />
										</button>
										<button
											className='w-[2vw] h-[3.5vh] rounded-full flex justify-end hover:bg-red-500 p-1'
											onClick={() => removeDiscountHandler(item)}
										>
											<Trash2 className='w-[1.5vw] h-[2.5vh]' />
										</button>
									</div>
								</div>
							)
						})
					) : (
						<h2 className='uppercase text-black/70 font-bold text-[2vh] w-full text-center'>
							Discounts were not found
						</h2>
					)}
				</div>
			</motion.div>
		</>
	)
}

export default Discounts
