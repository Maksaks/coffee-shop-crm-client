/* eslint-disable @typescript-eslint/no-explicit-any */
import { AnimatePresence, motion } from 'framer-motion'
import { FC, useState } from 'react'
import { useLoaderData, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import OrderInformationModal from '../../components/Modals/OrderInformationModal'
import { dateTimeFormatter } from '../../helper/date-formater.helper'
import { BaristaService } from '../../services/BaristaServices'
import { ICreatedOrderResultData } from '../../types/ICreatedOrderResultData'
import { IOrdersForCurrentShiftDataLoader } from './loaders/ordersLoader'

const OrdersInfo: FC = () => {
	const navigate = useNavigate()
	const { orders } = useLoaderData() as IOrdersForCurrentShiftDataLoader
	const [visibleOrderResultModal, setVisibleOrderResultModal] = useState(true)
	const [createdOrderResult, setCreatedOrderResult] =
		useState<ICreatedOrderResultData>()

	const updateStatusHandler = async (orderID: number) => {
		try {
			await BaristaService.completeOrder(orderID)
			toast.success(`Order #${orderID} was successfully completed`)
			navigate('/barista/orders')
		} catch (err: any) {
			const error = err.response?.data.message
			toast.error(error.toString())
		}
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
				className='w-[60%] h-[1000px] mt-20 mx-auto bg-zinc-700 rounded-3xl text-white font-roboto flex flex-col items-center gap-5 shadow-2xl'
			>
				<h1 className='p-4 w-full text-center text-[3vh] font-bold border-b-4'>
					ORDERS FOR CURRENT SHIFT
				</h1>
				<AnimatePresence>
					<motion.ul
						className='w-[90%] h-[90%] overflow-auto gap-3 flex flex-col'
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0, y: 20 }}
						transition={{ duration: 0.5 }}
					>
						{orders.length ? (
							orders.map((item, indx) => {
								return (
									<motion.li
										key={indx}
										className='w-full flex  pr-2'
										initial={{ opacity: 0, y: -20 }}
										animate={{ opacity: 1, y: 0 }}
										transition={{ duration: 0.5 }}
									>
										<div
											className='w-[90%] grid grid-cols-7 border-2 rounded-l-xl gap-x-5 bg-zinc-600 hover:bg-zinc-400 hover:cursor-pointer text-[2vh]'
											onClick={() => {
												setVisibleOrderResultModal(true)
												setCreatedOrderResult(item)
											}}
										>
											<span className='p-2 col-span-2'>{item.id}</span>
											<span className='col-span-2 text-right p-2'>
												{item.totalAmount} UAH
											</span>
											<span className='text-right p-2 col-span-2'>
												{dateTimeFormatter(item.createdAt)}
											</span>
										</div>
										<button
											className={`border-l-2 rounded-r-xl w-[10%] ${item.status == 'In Progress' ? 'bg-green-800 hover:bg-green-600' : 'bg-red-800'}`}
											onClick={() => updateStatusHandler(item.id)}
											disabled={item.status == 'Ready'}
										>
											{item.status}
										</button>
									</motion.li>
								)
							})
						) : (
							<h2 className='w-full text-center uppercase text-xl font-bold flex items-center justify-center h-full'>
								Orders for current shift were not found
							</h2>
						)}
					</motion.ul>
				</AnimatePresence>
			</motion.div>
		</>
	)
}

export default OrdersInfo
