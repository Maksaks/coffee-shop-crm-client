import { FC, useState } from 'react'
import { useAppSelector } from '../../../store/hooks'
import OrderPositionItem from '../OrderPositionItem/OrderPositionItem'

const OrderPositionList: FC = () => {
	const orderList = useAppSelector(state => state.order)
	const [paymentMethod, setPaymentMethod] = useState('cash')
	const [recivedAmount, setRecivedAmount] = useState('0')

	const paymentChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
		setPaymentMethod(e.target.value)
	}

	const recivedAmountChangeHandler = (
		e: React.ChangeEvent<HTMLInputElement>
	) => {
		setRecivedAmount(e.target.value)
	}

	const submitHandler = (e: React.MouseEvent<HTMLButtonElement>) => {}

	return (
		<div className='w-full h-[95%]'>
			<div className='grid grid-cols-6 h-[20%] border-b-4 p-5 text-xl items-center gap-x-5 gap-y-3'>
				<label className='col-span-3 uppercase font-bold text-center'>
					Total amount:
				</label>
				<label className='col-span-3 uppercase font-bold text-center'>
					Recived amount:
				</label>
				<label className='col-span-3 w-full h-[55px] bg-gradient-to-r from-zinc-500 to-zinc-400 flex items-center p-3 rounded-2xl cursor-default placeholder:text-black/50 placeholder:text-lg text-2xl'>
					{orderList.totalAmount} UAH
				</label>
				<input
					type='number'
					min={0}
					disabled={paymentMethod == 'card'}
					value={recivedAmount}
					onChange={recivedAmountChangeHandler}
					className='col-span-3 w-full h-[55px] bg-gradient-to-r from-zinc-500 to-zinc-400 flex items-center p-3 rounded-2xl  placeholder:text-black/50 placeholder:text-lg text-2xl'
				/>

				<h2 className='col-span-2 uppercase font-bold'>Payment method:</h2>
				<label className='col-span-1 flex gap-1'>
					<input
						type='radio'
						name='paymentMethod'
						value='card'
						checked={paymentMethod === 'card'}
						onChange={paymentChangeHandler}
					/>
					By card
				</label>

				<label className='col-span-1 flex gap-1'>
					<input
						type='radio'
						name='paymentMethod'
						value='cash'
						checked={paymentMethod === 'cash'}
						onChange={paymentChangeHandler}
					/>
					By cash
				</label>
				<button
					className='border-2 w-[200px] h-[70px] rounded-2xl bg-zinc-900 uppercase font-bold hover:text-black hover:bg-zinc-300 disabled:hover:bg-zinc-900 disabled:hover:text-white disabled:hover:cursor-not-allowed'
					onClick={submitHandler}
					disabled={
						+recivedAmount < orderList.totalAmount && paymentMethod == 'cash'
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
