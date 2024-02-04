import { motion } from 'framer-motion'
import { X } from 'lucide-react'
import { FC } from 'react'
import { dateTimeFormatter } from '../../helper/date-formater.helper'
import { useAppSelector } from '../../store/hooks'
import { ICreatedOrderResultData } from '../../types/ICreatedOrderResultData'

export interface Props {
	result: ICreatedOrderResultData
	setVisibleModal: (visible: boolean) => void
}

const OrderInformationModal: FC<Props> = ({ result, setVisibleModal }) => {
	const barista = useAppSelector(state => state.barista)

	return (
		<motion.div
			initial={{ opacity: 0, y: -20 }}
			animate={{ opacity: 1, y: 0 }}
			exit={{ opacity: 0, y: -20 }}
			transition={{ duration: 0.7 }}
			className='fixed w-full h-full bg-black/50 flex justify-center items-center z-10 font-roboto'
			onClick={() => setVisibleModal(false)}
		>
			<div
				className='w-[30%] h-[70vh] bg-zinc-300 rounded-3xl relative flex flex-col items-center'
				onClick={e => e.stopPropagation()}
			>
				<button
					className='absolute top-1 right-1 rounded-full hover:bg-zinc-500'
					onClick={() => setVisibleModal(false)}
				>
					<X className='w-[1.5vw] h-[3vh]' />
				</button>
				<h2 className='text-[2vh] h-[9%] uppercase py-3 px-10 font-bold w-full  border-b-4 text-center border-black bg-zinc-400 rounded-t-3xl flex items-center justify-center'>
					Order #{result.id} from {dateTimeFormatter(result.createdAt)}
				</h2>
				<div className='w-full h-[71%] flex flex-col items-center p-5 gap-2 overflow-auto'>
					{result.orderList.map((item, indx) => {
						return (
							<div
								key={indx}
								className='w-full h-[60px] rounded-xl bg-zinc-400 flex flex-row justify-between p-2 items-center text-[2vh]'
							>
								<label>{item.menuPosition.name}</label>
								<label>x {item.quantity}</label>
							</div>
						)
					})}
				</div>
				<div className='w-full h-[20%] grid grid-cols-2 bg-zinc-400 rounded-b-3xl border-t-4 border-black py-3 px-5 text-[2vh]'>
					<label className='font-bold uppercase'>Total amount:</label>
					<label className='text-right'>
						{result.totalAmount.toFixed(2)} UAH
					</label>
					<label className='font-bold uppercase'>Received amount:</label>
					<label className='text-right'>
						{result.receivedAmount.toFixed(2)} UAH
					</label>
					<label className='font-bold uppercase'>Barista:</label>
					<label className='text-right'>
						{barista.barista?.surname + ' ' + barista.barista?.name}
					</label>
					<label className='font-bold uppercase'>Point:</label>
					<label className='text-right'>
						{barista.point?.name} ({barista.point?.address})
					</label>
				</div>
			</div>
		</motion.div>
	)
}

export default OrderInformationModal
