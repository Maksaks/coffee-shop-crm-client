import axios from 'axios'
import { motion } from 'framer-motion'
import { User } from 'lucide-react'
import { FC, useState } from 'react'
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import Button from '../../components/Button/Button'
import { getTokenFromLocalStorage } from '../../helper/localstorage.helper'
import { isEmailValid } from '../../helper/validate-email.helper'
import { useAppSelector } from '../../store/hooks'
import { updateAdminInfo } from '../../store/slice/admin.slice'
import { IUpdateAdminInfo } from '../../types/IUpdateAdminInfo'

const Admin: FC = () => {
	const admin = useAppSelector(state => state.admin.admin)
	const dispatch = useDispatch()
	const [name, setName] = useState(admin?.name)
	const [surname, setSurname] = useState(admin?.surname)
	const [email, setEmail] = useState(admin?.email)
	const [password, setPassword] = useState('')

	const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
		try {
			e.preventDefault()
			if (!admin || !email?.length || !name?.length || !surname?.length) return
			if (!isEmailValid(email)) return
			let dataToUpdate: IUpdateAdminInfo = {}
			if (name !== admin.name) {
				dataToUpdate = { ...dataToUpdate, name }
			}
			if (surname !== admin.surname) {
				dataToUpdate = { ...dataToUpdate, surname }
			}
			if (email !== admin.email) {
				dataToUpdate = { ...dataToUpdate, email }
			}
			if (password.length) {
				dataToUpdate = { ...dataToUpdate, password }
			}
			if (
				dataToUpdate.email ||
				dataToUpdate.name ||
				dataToUpdate.password ||
				dataToUpdate.surname
			) {
				await axios.patch(`http://localhost:3000/api/admin`, dataToUpdate, {
					headers: {
						Authorization: 'Bearer ' + getTokenFromLocalStorage(),
					},
				})
				toast.success('Data was successfully updated')
				dispatch(updateAdminInfo(dataToUpdate))
			}
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
			className='bg-zinc-700 mx-auto mt-20 w-[40%] rounded-3xl flex items-center h-[60vh] shadow-2xl text-white font-roboto'
		>
			<User className='w-[50%] h-full border-r-4' />
			<form
				className='w-[50%] h-full bg-zinc-500 rounded-r-3xl p-3 flex flex-col gap-[1vh] justify-center'
				onSubmit={submitHandler}
			>
				<label className='text-[2vh] uppercase font-bold px-3'>Name:</label>
				<input
					required
					name='name'
					value={name}
					onChange={e => setName(e.target.value)}
					className='w-full bg-gradient-to-r from-zinc-800 to-zinc-700 p-3 rounded-2xl hover:border-2 placeholder:text-black/50 placeholder:text-lg text-[2vh]'
					placeholder='Enter your name...'
				/>
				<label className='text-[2vh] uppercase font-bold px-3'>Surname:</label>
				<input
					required
					name='surname'
					className='w-full bg-gradient-to-r from-zinc-800 to-zinc-700 p-3 rounded-2xl hover:border-2 placeholder:text-black/50 placeholder:text-lg text-[2vh]'
					value={surname}
					onChange={e => setSurname(e.target.value)}
					placeholder='Enter your surname...'
				/>
				<label className='text-[2vh] uppercase font-bold px-3'>Email:</label>
				<input
					required
					name='email'
					value={email}
					onChange={e => setEmail(e.target.value)}
					className={`w-full bg-gradient-to-r from-zinc-800 to-zinc-700 p-3 rounded-2xl hover:border-2 placeholder:text-black/50 placeholder:text-lg text-[2vh] ${email?.length && !isEmailValid(email) ? 'border-red-700 border-2' : ''}`}
					placeholder='Enter your email...'
				/>
				<label className='text-[2vh] uppercase font-bold px-3'>Password:</label>
				<input
					name='password'
					value={password}
					onChange={e => setPassword(e.target.value)}
					className={`w-full bg-gradient-to-r from-zinc-800 to-zinc-700 p-3 rounded-2xl hover:border-2 placeholder:text-white/90 placeholder:text-lg text-[2vh]`}
					placeholder='Enter your password...'
				/>
				<Button
					className='uppercase mt-[2vh] w-[50%] mx-auto'
					title='Update'
					type='submit'
				/>
			</form>
		</motion.div>
	)
}

export default Admin
