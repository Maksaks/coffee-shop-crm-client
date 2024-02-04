/* eslint-disable @typescript-eslint/no-explicit-any */
import { motion } from 'framer-motion'
import { FC, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { MenuPositionsService } from '../../services/Admin/MenuPositionsService'
import { ICategoryData } from '../../types/ICategory'
import { ICreateMenuPosition } from '../../types/ICreateMenuPosition'

interface Props {
	setVisibleModal: (visible: boolean) => void
	categories: ICategoryData[]
	pointID: number
}

const CreateMenuPositionModal: FC<Props> = ({
	setVisibleModal,
	categories,
	pointID,
}) => {
	const navigate = useNavigate()
	const [name, setName] = useState('')
	const [category, setCategory] = useState<number>()
	const [price, setPrice] = useState<number>(0)
	const [description, setDescription] = useState('')

	const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
		try {
			e.preventDefault()
			if (!category) return
			if (price <= 0 || category == -1) return
			const newPosition: ICreateMenuPosition = {
				name,
				description,
				price,
				category,
			}
			const creatingPosit = await MenuPositionsService.createMenuPosition(
				pointID,
				newPosition
			)
			toast.success('Menu position was successfully created')
			setVisibleModal(false)
			navigate(`/admin/refresh`)
			navigate(`/admin/positions?point=${pointID}&position=${creatingPosit.id}`)
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
			className='fixed w-full h-full bg-black/50 flex justify-center items-center z-10'
		>
			<form
				className='w-[20%] h-[70vh] bg-zinc-400 rounded-2xl flex flex-col justify-between font-roboto gap-[1vh]'
				onSubmit={submitHandler}
			>
				<h2 className='font-bold uppercase w-full text-center text-[2vh] border-b-2 p-3 bg-zinc-600 text-white rounded-t-2xl'>
					CREATING NEW POSITION
				</h2>
				<div className='w-[70%] mx-auto'>
					<label htmlFor='name'>
						<small className='text-[1.8vh] pl-2'>Name:</small>
						<input
							required
							type='text'
							name='name'
							value={name}
							onChange={e => setName(e.target.value)}
							placeholder='Name...'
							className='text-[2vh] w-full p-2 rounded-xl'
						/>
					</label>
				</div>
				<div className='w-[70%] mx-auto'>
					<label htmlFor='name'>
						<small className='text-[1.8vh] pl-2'>Category:</small>
						<select
							required
							name='category'
							className={`text-[2vh] w-full p-2 rounded-xl ${category == -1 ? 'text-zinc-400' : ''}`}
							defaultValue={-1}
							value={category}
							onChange={e => setCategory(+e.target.value)}
						>
							<option className='text-black' value={-1}>
								Select category...
							</option>
							{categories.map(item => {
								return (
									<option className='text-black' key={item.id} value={item.id}>
										{item.title}
									</option>
								)
							})}
						</select>
					</label>
				</div>

				<div className='w-[70%] mx-auto'>
					<label htmlFor='price'>
						<small className='text-[1.8vh] pl-2'>Price:</small>
						<input
							required
							type='text'
							name='price'
							value={price}
							onChange={e => setPrice(+e.target.value)}
							placeholder='Price...'
							className='text-[2vh] w-full p-2 rounded-xl'
						/>
					</label>
				</div>
				<div className='w-[70%] mx-auto'>
					<label htmlFor='description'>
						<small className='text-[1.8vh] pl-2'>Description:</small>
						<textarea
							required
							name='description'
							value={description}
							onChange={e => setDescription(e.target.value)}
							placeholder='Description...'
							className='text-[2vh] w-full p-2 rounded-xl min-h-[15vh] max-h-[15vh]'
						/>
					</label>
				</div>
				<div className='flex items-center justify-end gap-[1vh] w-full p-[1vh]'>
					<button
						className={`bg-zinc-700 text-white px-5 py-2 rounded-2xl text-[2vh] hover:bg-zinc-300 hover:text-black uppercase disabled:cursor-not-allowed disabled:hover:bg-zinc-700 disabled:hover:text-white`}
						type='submit'
						disabled={!name || category == -1 || !price || !description}
					>
						CREATE
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

export default CreateMenuPositionModal
