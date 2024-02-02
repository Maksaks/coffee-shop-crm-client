import { motion } from 'framer-motion'
import React, { FC, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { CategoryService } from '../../services/Admin/CategoryService'

interface Props {
	setVisibleModal: (visible: boolean) => void
}

const CreateCategoryModal: FC<Props> = ({ setVisibleModal }) => {
	const [title, setTitle] = useState<string>('')
	const navigate = useNavigate()
	const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
		try {
			e.preventDefault()
			if (!title.length) return
			await CategoryService.createCategory(title)
			toast.success(`New category [${title}] was successfully created`)
			setVisibleModal(false)
			navigate('/admin/refresh')
			navigate(`/admin/categories`)
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
				className='w-[20%] h-[300px] bg-zinc-400 rounded-2xl flex flex-col justify-between font-roboto'
				onSubmit={submitHandler}
			>
				<h2 className='font-bold uppercase w-full text-center text-2xl border-b-2 p-3'>
					CREATING CATEGORY
				</h2>
				<div className='w-[70%] mx-auto'>
					<label htmlFor='title'>
						<small className='text-lg pl-2'>Title:</small>
						<input
							type='text'
							name='title'
							placeholder='Title...'
							value={title}
							onChange={e => setTitle(e.target.value)}
							className='text-xl w-full p-2 rounded-xl'
						/>
					</label>
				</div>
				<div className='flex items-center justify-end gap-5 w-full p-5'>
					<button
						className={`bg-zinc-700 text-white px-5 py-2 rounded-2xl text-xl hover:bg-zinc-300 hover:text-black uppercase disabled:cursor-not-allowed disabled:hover:bg-zinc-700 disabled:hover:text-white`}
						type='submit'
						disabled={!title.length}
					>
						CREATE
					</button>
					<button
						type='button'
						onClick={() => setVisibleModal(false)}
						className='bg-zinc-700 text-white px-5 py-2 rounded-2xl text-xl hover:bg-zinc-300 hover:text-black uppercase'
					>
						Close
					</button>
				</div>
			</form>
		</motion.div>
	)
}

export default CreateCategoryModal
