import { FC, useState } from 'react'
import { toast } from 'react-toastify'
import Button from '../../components/Button/Button'
import Input from '../../components/Input/Input'
import MessageBox from '../../components/MessageBox/MessageBox'
import { AuthService } from '../../services/AuthService'

const RestorePassword: FC = () => {
	const [message, setMessage] = useState<string>('')
	const [email, setEmail] = useState<string>('')

	const restoreHandler = async (e: React.FormEvent<HTMLFormElement>) => {
		try {
			e.preventDefault()
			const data = await AuthService.restorePasswordRequest(email)
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
						RESTORE FORM
					</h2>
					<form className='flex flex-col gap-10' onSubmit={restoreHandler}>
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
						</div>
						<Button title='Restore' type='submit' className='mt-20 uppercase' />
					</form>
				</>
			) : (
				<MessageBox message={message} />
			)}
		</>
	)
}

export default RestorePassword
