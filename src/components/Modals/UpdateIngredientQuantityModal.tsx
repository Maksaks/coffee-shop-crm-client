import { motion } from 'framer-motion'
import { FC, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { BaristaService } from '../../services/BaristaServices'
import { IIngredientData } from '../../types/IIngredientData'

interface Props {
	ingredient: IIngredientData
	setVisibleModal: (visible: boolean) => void
	pointID: number
}

const UpdateIngredientQuantityModal: FC<Props> = ({
	ingredient,
	setVisibleModal,
	pointID,
}) => {
	const [quantity, setQuantity] = useState('')
	const navigate = useNavigate()
	const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
		try {
			e.preventDefault()
			if (+quantity <= 0) return
			const quantityToSend = Math.round(+quantity)

			await BaristaService.updateIngredientQuantity(
				{ quantity: quantityToSend },
				ingredient.id,
				pointID
			)
			toast.success('Ingredients was successfully updated')
			setVisibleModal(false)
			navigate('/barista/ingredients')
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
			className='fixed w-full h-full bg-black/50 flex justify-center items-center'
		>
			<form
				className='w-[20%] h-[300px] bg-zinc-400 rounded-2xl flex flex-col justify-between font-roboto'
				onSubmit={submitHandler}
			>
				<h2 className='font-bold uppercase w-full text-center text-2xl border-b-2 p-3'>
					Adding "{ingredient.name}" quantity
				</h2>
				<div className='w-[70%] mx-auto'>
					<label htmlFor='title'>
						<small className='text-lg pl-2'>Quantity</small>
						<input
							type='number'
							name='quantity'
							value={quantity}
							onChange={e => setQuantity(e.target.value)}
							placeholder='Quantity...'
							className='text-xl w-full p-2 rounded-xl'
						/>
					</label>
				</div>
				<div className='flex items-center justify-end gap-5 w-full p-5'>
					<button
						className={`bg-zinc-700 text-white px-5 py-2 rounded-2xl text-xl hover:bg-zinc-300 hover:text-black disabled:cursor-not-allowed disabled:hover:bg-zinc-700 disabled:hover:text-white`}
						disabled={+quantity <= 0}
						type='submit'
					>
						Add
					</button>
					<button
						type='button'
						onClick={() => setVisibleModal(false)}
						className='bg-zinc-700 text-white px-5 py-2 rounded-2xl text-xl hover:bg-zinc-300 hover:text-black'
					>
						Close
					</button>
				</div>
			</form>
		</motion.div>
	)
}

export default UpdateIngredientQuantityModal
