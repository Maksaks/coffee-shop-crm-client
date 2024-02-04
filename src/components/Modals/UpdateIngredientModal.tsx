import { motion } from 'framer-motion'
import React, { FC, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { IngredientsService } from '../../services/Admin/IngredientsService'
import { IIngredientData } from '../../types/IIngredientData'
import { IUpdateIngredient } from '../../types/IUpdateIngredientData'

interface Props {
	setVisibleModal: (visible: boolean) => void
	ingredient: IIngredientData
	pointID: number
}

const UpdateIngredientModal: FC<Props> = ({
	ingredient,
	setVisibleModal,
	pointID,
}) => {
	const [name, setName] = useState<string>(ingredient.name)
	const [price, setPrice] = useState<string>(ingredient.price.toString())
	const [quantity, setQuantity] = useState<string>(
		ingredient.quantity.toString()
	)
	const navigate = useNavigate()
	const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
		try {
			e.preventDefault()
			if (!name.length || !price.length || !quantity.length) return
			let updateData: IUpdateIngredient = {}
			if (name != ingredient.name) {
				updateData = { ...updateData, name }
			}
			if (+price != ingredient.price) {
				updateData = { ...updateData, price: +price }
			}
			if (+quantity != ingredient.quantity) {
				updateData = { ...updateData, quantity: +quantity }
			}
			await IngredientsService.updateIngredient(ingredient.id, updateData)
			toast.success(`Ingredient #${ingredient.id} was successfully updated`)
			navigate('/admin/refresh')
			navigate(`/admin/ingredients?point=${pointID}`)
			setVisibleModal(false)
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
				className='w-[20%] h-[40vh] bg-zinc-400 rounded-2xl flex flex-col justify-between font-roboto'
				onSubmit={submitHandler}
			>
				<h2 className='font-bold uppercase w-full text-center text-[2vh] border-b-2 p-3'>
					UPDATING INGREDIENT
				</h2>
				<div className='w-[70%] mx-auto'>
					<label htmlFor='title'>
						<small className='text-[1.8vh] pl-2'>Name:</small>
						<input
							type='text'
							name='name'
							placeholder='Name...'
							value={name}
							onChange={e => setName(e.target.value)}
							className='text-[2vh] w-full p-2 rounded-xl'
						/>
					</label>
					<label htmlFor='price'>
						<small className='text-[1.8vh] pl-2'>Price(UAH):</small>
						<input
							type='number'
							name='price'
							placeholder='Price...'
							value={price}
							onChange={e => setPrice(e.target.value)}
							className='text-[2vh] w-full p-2 rounded-xl'
						/>
					</label>
					<label htmlFor='quantity'>
						<small className='text-[1.8vh] pl-2'>Quantity:</small>
						<input
							type='number'
							name='quantity'
							placeholder='Quantity...'
							value={quantity}
							onChange={e => setQuantity(e.target.value)}
							className='text-[2vh] w-full p-2 rounded-xl'
						/>
					</label>
				</div>
				<div className='flex items-center justify-end gap-[1vh] w-full p-[1vh]'>
					<button
						className={`bg-zinc-700 text-white px-5 py-2 rounded-2xl text-[2vh] hover:bg-zinc-300 hover:text-black uppercase disabled:cursor-not-allowed disabled:hover:bg-zinc-700 disabled:hover:text-white`}
						type='submit'
						disabled={
							!name.length ||
							!price.length ||
							!quantity.length ||
							(name == ingredient.name &&
								+price == ingredient.price &&
								+quantity == ingredient.quantity)
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

export default UpdateIngredientModal
