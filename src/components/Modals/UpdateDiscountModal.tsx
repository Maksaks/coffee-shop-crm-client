import { motion } from 'framer-motion'
import React, { FC, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { isoStringToDatetimeLocal } from '../../helper/date-formater.helper'
import { DiscountsService } from '../../services/Admin/DiscountsService'
import { IDiscountAllData } from '../../types/IDiscountAllData'

interface Props {
	setVisibleModal: (visible: boolean) => void
	discount: IDiscountAllData
}

const UpdateDiscountModal: FC<Props> = ({ setVisibleModal, discount }) => {
	const [amount, setAmount] = useState<string>(discount.amount.toString())
	const [endAtDate, setEntAtDate] = useState<string>(
		isoStringToDatetimeLocal(discount.endAt)
	)
	const navigate = useNavigate()
	const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
		try {
			e.preventDefault()
			if (!amount || !endAtDate) return
			const endAt = new Date(endAtDate)
			if (endAt < new Date() || +amount <= 0 || +amount > 100) return
			await DiscountsService.updateDiscount(discount.menuPosition.id, {
				amount: +amount,
				endAt: endAt.toISOString(),
			})
			toast.success(
				`Discount for position ${discount.menuPosition.name} was successfully updated`
			)
			setVisibleModal(false)
			navigate('/admin/refresh')
			navigate(`/admin/discounts`)
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
			className='fixed w-full h-full z-10 bg-black/50 flex justify-center items-center'
		>
			<form
				className='w-[20%] h-[30vh] bg-zinc-400 rounded-2xl flex flex-col justify-between font-roboto'
				onSubmit={submitHandler}
			>
				<h2 className='font-bold uppercase w-full text-center text-[2vh] border-b-2 p-3'>
					UPDATING DISCOUNT #{discount.id}
				</h2>
				<div className='w-[70%] mx-auto'>
					<label htmlFor='title'>
						<small className='text-[1.8vh] pl-2'>Amount:</small>
						<input
							type='number'
							name='amount'
							placeholder='Amount...'
							value={amount}
							onChange={e => setAmount(e.target.value)}
							className='text-[2vh] w-full p-2 rounded-xl'
						/>
					</label>
					<label htmlFor='title'>
						<small className='text-[1.8vh] pl-2'>End at:</small>
						<input
							type='datetime-local'
							name='endAt'
							value={endAtDate}
							onChange={e => setEntAtDate(e.target.value)}
							placeholder='End at...'
							className='text-[2vh] w-full p-2 rounded-xl'
						/>
					</label>
				</div>
				<div className='flex items-center justify-end gap-[1vh] w-full p-[1vh]'>
					<button
						className={`bg-zinc-700 text-white px-5 py-2 rounded-2xl text-[2vh] hover:bg-zinc-300 hover:text-black uppercase disabled:cursor-not-allowed disabled:hover:bg-zinc-700 disabled:hover:text-white`}
						type='submit'
						disabled={
							!amount ||
							+amount < 0 ||
							+amount > 100 ||
							new Date(endAtDate) < new Date()
						}
					>
						UPDATE
					</button>
					<button
						type='button'
						onClick={() => setVisibleModal(false)}
						className='bg-zinc-700 text-white px-5 py-2 rounded-2xl text-[2vh] hover:bg-zinc-300 hover:text-black uppercase'
					>
						Close
					</button>
				</div>
			</form>
		</motion.div>
	)
}

export default UpdateDiscountModal
