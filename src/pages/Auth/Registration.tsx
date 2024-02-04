import { FC, useState } from 'react'
import { toast } from 'react-toastify'
import Button from '../../components/Button/Button'
import Input from '../../components/Input/Input'
import MessageBox from '../../components/MessageBox/MessageBox'
import { isEmailValid } from '../../helper/validate-email.helper'
import { AuthService } from '../../services/AuthService'

const Registration: FC = () => {
	const [message, setMessage] = useState<string>('')
	const [name, setName] = useState<string>('')
	const [surname, setSurname] = useState<string>('')
	const [email, setEmail] = useState<string>('')
	const [password, setPassword] = useState<string>('')
	const [repeatPassword, setRepeatPassword] = useState<string>('')

	const registrationHandler = async (e: React.FormEvent<HTMLFormElement>) => {
		try {
			e.preventDefault()
			if (!isEmailValid(email)) {
				toast.error('Email is invalid')
				return
			}
			const data = await AuthService.registration({
				name,
				surname,
				email,
				password,
			})
			if (data) {
				setMessage(data)
			}
		} catch (err: any) {
			const error = err.response?.data.message
			toast.error(error.toString())
		}
	}

	return (
		<>
			{!message.length ? (
				<>
					<h2 className='text-white text-[40px] font-bold leading-[50px] mb-[30px] border-b-4 text-center uppercase'>
						REGISTRATION FORM
					</h2>
					<form className='flex flex-col' onSubmit={registrationHandler}>
						<div className='flex flex-col gap-4'>
							<Input
								name='name'
								labelName='Name:'
								type='text'
								placeholder='Name...'
								required
								value={name}
								onChange={e => setName(e.target.value)}
							/>
							<Input
								name='Surname'
								labelName='Surname:'
								type='text'
								placeholder='Surname...'
								required
								value={surname}
								onChange={e => setSurname(e.target.value)}
							/>
							<Input
								name='email'
								labelName='Email:'
								type='text'
								placeholder='Email...'
								required
								value={email}
								onChange={e => setEmail(e.target.value)}
							/>
							<Input
								name='password'
								labelName='Password:'
								type='password'
								placeholder='Password...'
								required
								value={password}
								onChange={e => setPassword(e.target.value)}
							/>
							<Input
								name='confirmPassword'
								labelName='Confirm password:'
								type='password'
								placeholder='Confirm password...'
								value={repeatPassword}
								onChange={e => setRepeatPassword(e.target.value)}
								required
							/>
						</div>
						<Button
							title='Register'
							type='submit'
							className='mt-16 uppercase disabled:hover:bg-zinc-800 disabled:hover:text-white'
							disabled={
								!repeatPassword.length ||
								!password.length ||
								!name.length ||
								!surname.length ||
								!email.length ||
								repeatPassword != password
							}
						/>
					</form>
				</>
			) : (
				<MessageBox message={message} />
			)}
		</>
	)
}

export default Registration
