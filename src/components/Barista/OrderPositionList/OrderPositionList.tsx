/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC, useState } from 'react'
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import { BaristaService } from '../../../services/BaristaServices'
import { useAppSelector } from '../../../store/hooks'
import { putMoneyOnPointBalance } from '../../../store/slice/barista.slice'
import { clearOrder } from '../../../store/slice/order.slice'
import {
	ICreateOrderData,
	IOrderPositionData,
} from '../../../types/ICreateOrderData'
import { ICreatedOrderResultData } from '../../../types/ICreatedOrderResultData'
import OrderPositionItem from '../OrderPositionItem/OrderPositionItem'

interface Props {
	setVisibleModal: (visible: boolean) => void
	setOrderResult: (visible: ICreatedOrderResultData) => void
}

const OrderPositionList: FC<Props> = ({ setVisibleModal, setOrderResult }) => {
	const orderList = useAppSelector(state => state.order)
	const point = useAppSelector(state => state.barista.point)
	const [paymentMethod, setPaymentMethod] = useState('By Cash')
	const [receivedAmount, setReceivedAmount] = useState('0')

	const dispatch = useDispatch()

	const paymentChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
		setPaymentMethod(e.target.value)
	}

	const receivedAmountChangeHandler = (
		e: React.ChangeEvent<HTMLInputElement>
	) => {
		setReceivedAmount(e.target.value)
	}

	const submitHandler = async () => {
		try {
			if (point && +receivedAmount - orderList.totalAmount > point.pointMoney) {
				toast.warning(
					'Not enough money on point for giving the rest from this amount'
				)
				return
			}
			if (point) {
				const orderPositions: IOrderPositionData[] =
					orderList.selectedMenuPositions.map(item => {
						return {
							menuPosition: { id: item.position.id },
							quantity: item.amount,
						}
					})
				const newOrder: ICreateOrderData = {
					receivedAmount:
						+receivedAmount > 0 ? +receivedAmount : orderList.totalAmount,
					paymentMethod: paymentMethod,
					point: { id: point?.id },
					totalAmount: orderList.totalAmount,
					orderList: orderPositions,
				}
				setOrderResult(await BaristaService.createOrder(newOrder))
				setVisibleModal(true)
				setReceivedAmount('0')
				dispatch(putMoneyOnPointBalance(orderList.totalAmount))
				dispatch(clearOrder())
				toast.success('Order was successfully created!')
			}
		} catch (err: any) {
			const error = err.response?.data.message
			toast.error(error.toString())
		}
	}

	return (
		<div className='w-full h-[95%]'>
			<div className='grid grid-cols-6 h-[20%] border-b-4 p-5 text-xl items-center gap-x-5 gap-y-3'>
				<label className='col-span-3 uppercase font-bold text-center'>
					Total amount:
				</label>
				<label className='col-span-3 uppercase font-bold text-center'>
					Received amount:
				</label>
				<label className='col-span-3 w-full h-[55px] bg-gradient-to-r from-zinc-500 to-zinc-400 flex items-center p-3 rounded-2xl cursor-default placeholder:text-black/50 placeholder:text-lg text-2xl'>
					{orderList.totalAmount} UAH
				</label>
				<input
					type='number'
					min={0}
					disabled={paymentMethod == 'By Card'}
					value={receivedAmount}
					onChange={receivedAmountChangeHandler}
					className='col-span-3 w-full h-[55px] bg-gradient-to-r from-zinc-500 to-zinc-400 flex items-center p-3 rounded-2xl  placeholder:text-black/50 placeholder:text-lg text-2xl'
				/>

				<h2 className='col-span-2 uppercase font-bold'>Payment method:</h2>
				<label className='col-span-1 flex gap-1'>
					<input
						type='radio'
						name='paymentMethod'
						value='By Card'
						checked={paymentMethod === 'By Card'}
						onChange={paymentChangeHandler}
					/>
					By card
				</label>

				<label className='col-span-1 flex gap-1'>
					<input
						type='radio'
						name='paymentMethod'
						value='By Cash'
						checked={paymentMethod === 'By Cash'}
						onChange={paymentChangeHandler}
					/>
					By cash
				</label>
				<button
					className='border-2 w-[200px] h-[70px] rounded-2xl bg-zinc-900 uppercase font-bold hover:text-black hover:bg-zinc-300 disabled:hover:bg-zinc-900 disabled:hover:text-white disabled:hover:cursor-not-allowed'
					onClick={submitHandler}
					disabled={
						(+receivedAmount < orderList.totalAmount &&
							paymentMethod == 'By Cash') ||
						!orderList.selectedMenuPositions.length
					}
				>
					Submit order
				</button>
			</div>
			<div className='w-[95%] mx-auto h-[80%] flex flex-col items-center gap-5 p-5 overflow-auto'>
				<h2 className='border-b-4 w-full text-center pb-5 rounded-full text-xl font-bold'>
					ORDER LIST
				</h2>
				{orderList.selectedMenuPositions.map((item, indx) => {
					return <OrderPositionItem key={indx} orderPosition={item} />
				})}
			</div>
		</div>
	)
}

export default OrderPositionList
