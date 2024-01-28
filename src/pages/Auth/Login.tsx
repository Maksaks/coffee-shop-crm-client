/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import Button from '../../components/Button/Button'
import Input from '../../components/Input/Input'
import { setTokenToLocalStorage } from '../../helper/localstorage.helper'
import { AuthService } from '../../services/AuthService'
import { loginAdmin } from '../../store/slice/admin.slice'
import { loginBarista, setPointData } from '../../store/slice/barista.slice'

const Login: FC = () => {
	const navigate = useNavigate()
	const [email, setEmail] = useState<string>('')
	const [password, setPassword] = useState<string>('')
	const dispatch = useDispatch()

	const loginHandler = async (e: React.FormEvent<HTMLFormElement>) => {
		try {
			e.preventDefault()
			const data = await AuthService.login({ email, password })
			if (data) {
				setTokenToLocalStorage(data.token)
				if (data.role === 'barista') {
					const profile = await AuthService.getProfileBarista()
					if (profile) {
						dispatch(loginBarista(profile))
						toast.success(
							`Hello, ${profile.name}. You are successfully login as ${profile.role}!`
						)

						if (profile.lastPoint) {
							dispatch(setPointData(profile.lastPoint))
							navigate('/barista')
						} else {
							navigate('/auth/select')
						}
					}
				} else if (data.role === 'admin') {
					const profile = await AuthService.getProfileAdmin()
					if (profile) {
						dispatch(loginAdmin(profile))
						toast.success(`Hello, ${profile.role}. You are successfully login!`)
						navigate('/admin')
					}
				}
			}
		} catch (err: any) {
			const error = err.response?.data.message
			toast.error(error.toString())
		}
	}

	return (
		<>
			<h2 className='text-white text-[40px] font-bold leading-[50px] mb-[30px] border-b-4 text-center uppercase'>
				Login form
			</h2>
			<form className='flex flex-col' onSubmit={loginHandler}>
				<div className='flex flex-col gap-5'>
					<Input
						name='email'
						labelName='Email:'
						type='text'
						placeholder='Your email...'
						required
						value={email}
						onChange={e => setEmail(e.target.value)}
					/>
					<Input
						name='password'
						required
						labelName='Password:'
						type='password'
						placeholder='Your password...'
						value={password}
						onChange={e => setPassword(e.target.value)}
					/>
				</div>
				<Link
					to={'/auth/restore'}
					className='text-white/70 hover:text-white cursor-pointer mt-1'
				>
					I forgot my password...
				</Link>
				<Button title='Login' type='submit' className='mt-20 uppercase' />
			</form>
		</>
	)
}

export default Login
