import { FC, useState } from 'react'
import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import Button from '../../components/Button/Button'
import Input from '../../components/Input/Input'
import MessageBox from '../../components/MessageBox/MessageBox'
import { AuthService } from '../../services/AuthService'

const ChangePassword: FC = () => {
	const [message, setMessage] = useState<string>('')
	const { token } = useParams()
	const [password, setPassword] = useState<string>('')

	const updateHandler = async (e: React.FormEvent<HTMLFormElement>) => {
		try {
			e.preventDefault()
			const data = await AuthService.updatePasswordForAdmin(
				token || '',
				password
			)
			if (data) {
				setMessage(data)
			}
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
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
						CHANGE FORM
					</h2>
					<form className='flex flex-col' onSubmit={updateHandler}>
						<div className='flex flex-col gap-5'>
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
								required
								labelName='Confirm password:'
								type='password'
								placeholder='Confirm password...'
							/>
						</div>
						<Button title='Change' type='submit' className='mt-20 uppercase' />
					</form>
				</>
			) : (
				<MessageBox message={message} />
			)}
		</>
	)
}

export default ChangePassword
