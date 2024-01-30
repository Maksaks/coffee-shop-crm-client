import { Trash2 } from 'lucide-react'
import { FC } from 'react'
import { SelectedPosition } from '../../../pages/Baritsta/CreateOrder'

interface Props {
	orderPosition: SelectedPosition
	removePosition: (position: SelectedPosition) => void
	updatePosition: (position: SelectedPosition) => void
}

const OrderPositionItem: FC<Props> = ({
	orderPosition,
	removePosition,
	updatePosition,
}) => {
	return (
		<div className='w-[90%] h-32 bg-zinc-500 rounded-2xl py-3 text-xl'>
			<div className='flex flex-row h-[50%] border-b-2 pb-2 items-center px-5'>
				<label className='text-xl w-full uppercase font-bold'>
					{orderPosition.position.name}
				</label>
				<button
					className='h-full w-auto'
					onClick={() => removePosition(orderPosition)}
				>
					<Trash2 className='h-full w-auto hover:bg-zinc-600 p-1 rounded-xl' />
				</button>
			</div>

			<div className='flex h-[50%] items-center justify-between gap-1 px-5'>
				<label className='text-end'>
					{orderPosition.position.discount
						? (
								Math.round(
									(orderPosition.position.price *
										(100 - orderPosition.position.discount.amount)) /
										100
								) * orderPosition.amount
							).toFixed(2)
						: (orderPosition.position.price * orderPosition.amount).toFixed(
								2
							)}{' '}
					UAH
				</label>
				<div className='flex h-16 items-center gap-2'>
					<button
						className='text-5xl hover:bg-zinc-400 py-2 px-3 h-[70%] flex justify-center items-center rounded-xl'
						onClick={() => {
							if (orderPosition.amount >= 100) return
							orderPosition.amount += 1
							updatePosition(orderPosition)
						}}
					>
						+
					</button>
					<input
						className='text-xl text-center w-20 text-black py-1 px-3 rounded-xl cursor-default disabled:bg-white'
						type='number'
						max='100'
						min='0'
						value={orderPosition.amount}
						step='1'
						disabled
					/>
					<button
						className='text-5xl hover:bg-zinc-400 py-2 px-4 h-[70%] flex justify-center items-center rounded-xl'
						onClick={() => {
							if (orderPosition.amount <= 1) return
							orderPosition.amount -= 1
							updatePosition(orderPosition)
						}}
					>
						-
					</button>
				</div>
			</div>
		</div>
	)
}

export default OrderPositionItem
