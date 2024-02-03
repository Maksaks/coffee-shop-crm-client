/* eslint-disable @typescript-eslint/no-explicit-any */
import { motion } from 'framer-motion'
import React, { FC, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { PointsService } from '../../services/Admin/PointsService'
import { ICreatePointData } from '../../types/ICreatePointData'

interface Props {
	setVisibleModal: (visible: boolean) => void
}

export const CreatingPointModal: FC<Props> = ({ setVisibleModal }) => {
	const [name, setName] = useState('')
	const [address, setAddress] = useState('')
	const [workingHours, setWorkingHours] = useState('')
	const [description, setDescription] = useState('')
	const [pointMoney, setPointMoney] = useState('')
	const navigate = useNavigate()
	const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
		try {
			e.preventDefault()
			if (!name || !address || !workingHours || !description || !pointMoney)
				return
			const newPoint: ICreatePointData = {
				name,
				address,
				description,
				pointMoney: +pointMoney,
				workingHours,
			}
			const result = await PointsService.createPoint(newPoint)
			if (!result) return
			toast.success('Point was successfully created')
			setVisibleModal(false)

			navigate(`/admin/refresh`)
			navigate(`/admin/points?id=${result.id}`)
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
				className='w-[20%] min-h-[300px] bg-zinc-400 rounded-2xl flex flex-col justify-between font-roboto gap-5'
				onSubmit={submitHandler}
			>
				<h2 className='font-bold uppercase w-full text-center text-2xl border-b-2 p-3 bg-zinc-600 text-white rounded-t-2xl'>
					ADDING NEW POINT
				</h2>
				<div className='w-[70%] mx-auto'>
					<label htmlFor='name'>
						<small className='text-lg pl-2'>Name:</small>
						<input
							required
							type='text'
							name='name'
							value={name}
							onChange={e => setName(e.target.value)}
							placeholder='Name...'
							className='text-xl w-full p-2 rounded-xl'
						/>
					</label>
				</div>
				<div className='w-[70%] mx-auto'>
					<label htmlFor='address'>
						<small className='text-lg pl-2'>Address:</small>
						<input
							required
							type='text'
							name='address'
							value={address}
							onChange={e => setAddress(e.target.value)}
							placeholder='Address...'
							className='text-xl w-full p-2 rounded-xl'
						/>
					</label>
				</div>
				<div className='w-[70%] mx-auto'>
					<label htmlFor='workingHours'>
						<small className='text-lg pl-2'>Working hours:</small>
						<input
							required
							type='text'
							name='workingHours'
							value={workingHours}
							onChange={e => setWorkingHours(e.target.value)}
							placeholder='Email...'
							className={`text-xl w-full p-2 rounded-xl`}
						/>
					</label>
				</div>
				<div className='w-[70%] mx-auto'>
					<label htmlFor='pointMoney'>
						<small className='text-lg pl-2'>Point money:</small>
						<input
							required
							type='number'
							name='pointMoney'
							value={pointMoney}
							onChange={e => setPointMoney(e.target.value)}
							placeholder='Point money...'
							className='text-xl w-full p-2 rounded-xl'
						/>
					</label>
				</div>
				<div className='w-[70%] mx-auto'>
					<label htmlFor='description'>
						<small className='text-lg pl-2'>Description:</small>
						<textarea
							required
							name='description'
							value={description}
							onChange={e => setDescription(e.target.value)}
							placeholder='Description...'
							className='text-xl w-full p-2 rounded-xl min-h-28 max-h-28'
						/>
					</label>
				</div>
				<div className='flex items-center justify-end gap-5 w-full p-5'>
					<button
						className={`bg-zinc-700 text-white px-5 py-2 rounded-2xl text-xl hover:bg-zinc-300 hover:text-black uppercase disabled:cursor-not-allowed disabled:hover:bg-zinc-700 disabled:hover:text-white`}
						type='submit'
						disabled={
							!name.length ||
							!address.length ||
							!workingHours.length ||
							!pointMoney.length ||
							!description.length
						}
					>
						Add
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
