import { motion } from 'framer-motion'
import { FC, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { isEmailValid } from '../../helper/validate-email.helper'
import { BaristasManagementService } from '../../services/Admin/BaristasManagementService'
import { ICreateBaristasData } from '../../types/ICreateBaristaData'

interface Props {
	setVisibleModal: (visible: boolean) => void
}

const CreateBaristaModal: FC<Props> = ({ setVisibleModal }) => {
	const [name, setName] = useState('')
	const [surname, setSurname] = useState('')
	const [email, setEmail] = useState('')
	const [phoneNumber, setPhoneNumber] = useState('')
	const [password, setPassword] = useState('')
	const [fixedHourRate, setFixedHourRate] = useState('')
	const [percentFromEarnings, setPercentFromEarnings] = useState('')
	const navigate = useNavigate()
	const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
		try {
			e.preventDefault()
			if (!isEmailValid(email)) return
			if (
				+fixedHourRate < 0 ||
				+percentFromEarnings < 0 ||
				+percentFromEarnings > 100
			)
				return
			const newBarista: ICreateBaristasData = {
				name,
				surname,
				email,
				phoneNumber,
				password,
				fixedHourRate: +fixedHourRate,
				percentFromEarnings: +percentFromEarnings,
			}
			const result = await BaristasManagementService.createBarista(newBarista)
			if (!result) return
			toast.success('Barista was successfully created')
			setVisibleModal(false)

			navigate(`/admin/refresh`)
			navigate(`/admin/baristas?id=${result.id}`)
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
					ADDING NEW BARISTA
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
					<label htmlFor='surname'>
						<small className='text-lg pl-2'>Surname:</small>
						<input
							required
							type='text'
							name='surname'
							value={surname}
							onChange={e => setSurname(e.target.value)}
							placeholder='Surname...'
							className='text-xl w-full p-2 rounded-xl'
						/>
					</label>
				</div>
				<div className='w-[70%] mx-auto'>
					<label htmlFor='email'>
						<small className='text-lg pl-2'>Email:</small>
						<input
							required
							type='text'
							name='email'
							value={email}
							onChange={e => setEmail(e.target.value)}
							placeholder='Email...'
							className={`text-xl ${email.length && !isEmailValid(email) ? 'border-red-700 border-2' : ''} w-full p-2 rounded-xl`}
						/>
					</label>
				</div>
				<div className='w-[70%] mx-auto'>
					<label htmlFor='phoneNumber'>
						<small className='text-lg pl-2'>Phone number:</small>
						<input
							required
							type='text'
							value={phoneNumber}
							onChange={e => setPhoneNumber(e.target.value)}
							name='phoneNumber'
							placeholder='Phone number...'
							className='text-xl w-full p-2 rounded-xl'
						/>
					</label>
				</div>
				<div className='w-[70%] mx-auto'>
					<label htmlFor='password'>
						<small className='text-lg pl-2'>Password:</small>
						<input
							required
							type='password'
							name='password'
							value={password}
							onChange={e => setPassword(e.target.value)}
							placeholder='Password...'
							className='text-xl w-full p-2 rounded-xl'
						/>
					</label>
				</div>
				<div className='w-[70%] mx-auto'>
					<label htmlFor='fixedHourRate'>
						<small className='text-lg pl-2'>Fixed hour rate:</small>
						<input
							required
							type='number'
							name='fixedHourRate'
							value={fixedHourRate}
							onChange={e => setFixedHourRate(e.target.value)}
							placeholder='Fixed hour rate...'
							className='text-xl w-full p-2 rounded-xl'
						/>
					</label>
				</div>
				<div className='w-[70%] mx-auto'>
					<label htmlFor='percentFromEarnings'>
						<small className='text-lg pl-2'>
							Percent from earnings(0-100%):
						</small>
						<input
							required
							type='number'
							value={percentFromEarnings}
							onChange={e => setPercentFromEarnings(e.target.value)}
							name='percentFromEarnings'
							placeholder='Percent from earnings...'
							className='text-xl w-full p-2 rounded-xl'
						/>
					</label>
				</div>
				<div className='flex items-center justify-end gap-5 w-full p-5'>
					<button
						className={`bg-zinc-700 text-white px-5 py-2 rounded-2xl text-xl hover:bg-zinc-300 hover:text-black uppercase disabled:cursor-not-allowed disabled:hover:bg-zinc-700 disabled:hover:text-white`}
						type='submit'
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

export default CreateBaristaModal
