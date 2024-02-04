import { motion } from 'framer-motion'
import { Trash2 } from 'lucide-react'
import { FC, useEffect, useState } from 'react'
import { useLoaderData, useNavigate, useSearchParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { dateTimeFormatter } from '../../helper/date-formater.helper'
import { OrdersService } from '../../services/Admin/OrdersService'
import { IOrderPositionData } from '../../types/ICreateOrderData'
import { IOrderData } from '../../types/IOrderData'
import { IPointShortData, IPointShortDataLoader } from './loaders/ordersLoader'

const Orders: FC = () => {
	const navigate = useNavigate()
	const { points } = useLoaderData() as IPointShortDataLoader
	const [searchedPoints, setSearchedPoints] = useState<IPointShortData[]>()
	const [selectedPoint, setSelectedPoint] = useState<IPointShortData>()
	const [orders, setOrders] = useState<IOrderData[]>()
	const [selectedOrder, setSelectedOrder] = useState<IOrderData>()
	const [fromDate, setFromDate] = useState<string>()
	const [toDate, setToDate] = useState<string>()
	const [selectedOrderList, setSelectedOrderList] =
		useState<IOrderPositionData[]>()
	const [searchParams, setSearchParams] = useSearchParams()

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
		if (selectedPoint) {
			setOrders(selectedPoint.orders)
			setFromDate('')
			setToDate('')
			setSelectedOrder(undefined)
			setSelectedOrderList([])
		}
	}, [selectedPoint])

	useEffect(() => {
		const getOrderList = async () => {
			try {
				if (!selectedOrder) return
				const orderList = await OrdersService.getOrderList(selectedOrder?.id)
				if (orderList) {
					setSelectedOrderList(orderList)
				}
			} catch (err: any) {
				const error = err.response?.data.message
				toast.error(error.toString())
			}
		}
		getOrderList()
	}, [selectedOrder])

	useEffect(() => {
		if (!fromDate || !fromDate.length || !toDate || !toDate.length) {
			if (orders?.length != selectedPoint?.orders.length)
				setOrders(selectedPoint?.orders)
			return
		}
		const ToDate = new Date(toDate)
		const FromDate = new Date(fromDate)
		setSelectedOrderList([])
		setOrders(
			selectedPoint?.orders.filter(item => {
				const itemDate = new Date(item.createdAt)
				return itemDate < ToDate && itemDate > FromDate
			})
		)
	}, [fromDate, toDate])

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

	const removeOrderHandler = async (item: IOrderData) => {
		try {
			await OrdersService.deleteOrder(item.id)
			toast.success(`Order #${item.id} was successfully removed`)
			navigate('/admin/refresh')
			navigate(`/admin/orders?point=${selectedPoint?.id}`)
		} catch (err: any) {
			const error = err.response?.data.message
			toast.error(error.toString())
		}
	}

	return (
		<motion.div
			initial={{ opacity: 0, y: -20 }}
			animate={{ opacity: 1, y: 0 }}
			exit={{ opacity: 0, y: -20 }}
			transition={{ duration: 0.7 }}
			className='w-[70%] h-[80vh] mt-[5vh] mx-auto text-white font-roboto flex items-center gap-5'
		>
			<div className='h-[100%] w-[30%] bg-zinc-700 rounded-3xl flex items-center flex-col relative shadow-2xl'>
				<h2 className='w-full h-[6%] p-3 border-b-4 uppercase text-center text-[2vh] font-bold'>
					Baristas
				</h2>
				<input
					className='w-[90%] py-2 px-5 my-3 rounded-2xl text-black text-[2vh]'
					placeholder='Search barista by surname or name...'
					onChange={searchHandler}
				/>
				<div className='w-full h-[80%] flex flex-col items-center gap-2 overflow-auto'>
					{searchedPoints?.length ? (
						searchedPoints.map((item, indx) => {
							return (
								<button
									title='Select this point'
									key={indx}
									onClick={() => {
										setSelectedPoint(item)
									}}
									className={`p-[1vh] w-[90%] rounded-2xl hover:bg-zinc-400 text-[2vh] ${selectedPoint?.id == item.id ? 'bg-zinc-300 text-black underline uppercase font-bold' : 'bg-zinc-500'}`}
								>
									{item.name}
								</button>
							)
						})
					) : (
						<h2 className='uppercase text-[2vh] pt-5'>Not found</h2>
					)}
				</div>
			</div>
			<div className='h-[100%] w-[70%] bg-zinc-700 rounded-3xl flex items-center flex-col relative shadow-2xl'>
				<h2 className='w-full h-[6%] p-3 border-b-4 uppercase text-center text-[2vh] font-bold'>
					ORDERS
				</h2>

				<div className='flex w-full h-[90%] flex-row p-3 gap-5'>
					<div className='h-full w-[40%] flex flex-col gap-2'>
						<div className='grid grid-cols-8 gap-2'>
							<small className='uppercase text-[1.1vh] font-bold my-auto'>
								from:
							</small>
							<input
								className='col-span-3 p-1 text-[1.3vh] rounded-xl text-black'
								type='datetime-local'
								value={fromDate}
								onChange={e => setFromDate(e.target.value)}
							/>
							<small className='uppercase text-[1.1vh]  font-bold my-auto'>
								to:
							</small>
							<input
								className='col-span-3 p-1 text-[1.3vh] rounded-xl text-black'
								type='datetime-local'
								value={toDate}
								onChange={e => setToDate(e.target.value)}
							/>
						</div>
						<div className='w-full bg-zinc-800/80 h-[6vh] rounded-t-2xl grid grid-cols-8 items-center px-5 py-2 font-bold text-[1.7vh]'>
							<label>ID</label>
							<label className='col-span-4 text-center'>CREATED AT</label>
							<label className='col-span-2 text-center'>TOTAL AMOUNT</label>
							<label className='col-span-1 text-center'></label>
						</div>
						<div className='w-full flex flex-col items-center h-[88%] overflow-auto gap-2 border-l-2 border-r-2 border-b-2 p-2 border-white/30'>
							{orders?.length ? (
								orders.map((item, indx) => {
									return (
										<div
											key={indx}
											className={`w-full h-[5vh] rounded-2xl grid grid-cols-8 items-center px-5 py-2 text-[1.5vh] hover:bg-zinc-400 hover:cursor-pointer ${item.id == selectedOrder?.id ? 'bg-zinc-400 text-black' : 'bg-zinc-600/90'}`}
											onClick={() => setSelectedOrder(item)}
										>
											<label className=' hover:cursor-pointer '>
												{item.id}
											</label>
											<label className='col-span-4  hover:cursor-pointer   border-l-2 text-center'>
												{dateTimeFormatter(item.createdAt)}
											</label>
											<label className=' hover:cursor-pointer col-span-2 text-center border-l-2 border-r-2'>
												{item.totalAmount} UAH
											</label>
											<div className='col-span-1 flex justify-end'>
												<button
													className='w-[1.5vw] h-[2.5vh] rounded-full flex justify-end hover:bg-red-500 p-1'
													onClick={() => removeOrderHandler(item)}
													title='Remove this shift'
												>
													<Trash2 className='w-[1.5vw] h-[2vh]' />
												</button>
											</div>
										</div>
									)
								})
							) : (
								<h2 className='uppercase font-bold text-[2vh] w-full text-center p-10 text-white/60'>
									orders were not found
								</h2>
							)}
						</div>
					</div>
					<div className='w-[58%] h-full border-l-4 flex flex-col gap-5 items-center'>
						<h2 className='w-full uppercase text-center text-[2vh] font-bold'>
							Orders list
						</h2>
						<div className='w-[90%] h-[90%] bg-zinc-500 rounded-2xl p-5'>
							<div className='grid grid-cols-7 border-b-2 items-center text-center font-bold text-[1.7vh]'>
								<label>ID</label>
								<label className='col-span-2'>NAME</label>
								<label className='col-span-2'>PRICE</label>
								<label className='col-span-2'>QUANTITY</label>
							</div>
							<div className='w-full h-[90%] overflow-auto'>
								{selectedOrderList?.length ? (
									selectedOrderList.map((item, indx) => {
										return (
											<div
												key={indx}
												className='grid grid-cols-7 py-2 items-center text-center font-bold text-[1.5vh]'
											>
												<label>{indx + 1}</label>
												<label className='col-span-2'>
													{item.menuPosition.name}
												</label>
												<label className='col-span-2'>
													{item.menuPosition.price?.toFixed(2)} UAH
												</label>
												<label className='col-span-2'>x{item.quantity}</label>
											</div>
										)
									})
								) : (
									<h2 className='uppercase font-bold text-[2vh] w-full text-center p-10 text-white/60'>
										List of positions is empty
									</h2>
								)}
							</div>
							<div className='w-full h-[5%] border-t-4 flex flex-col items-center'>
								<label className='p-3 text-[1.7vh]'>
									<b>TOTAL AMOUNT(WITH DISCOUNTS):</b>{' '}
									{selectedOrder?.totalAmount.toFixed(2)} UAH
								</label>
							</div>
						</div>
					</div>
				</div>
			</div>
		</motion.div>
	)
}

export default Orders
