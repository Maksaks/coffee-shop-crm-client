import { FC, useState } from 'react'
import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import Button from '../../components/Button/Button'
import MessageBox from '../../components/MessageBox/MessageBox'
import { AuthService } from '../../services/AuthService'

const ConfirmingEmail: FC = () => {
	const { token } = useParams()
	const [message, setMessage] = useState<string>('')
	const confirmingHandler = async (e: React.FormEvent<HTMLFormElement>) => {
		try {
			e.preventDefault()
			const data = await AuthService.confirmEmail(token || '')
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
						CONFIRMING EMAIL
					</h2>
					<form className='flex flex-col' onSubmit={confirmingHandler}>
						<Button title='CONFIRM' type='submit' className='mt-20 uppercase' />
					</form>
				</>
			) : (
				<MessageBox message={message} />
			)}
		</>
	)
}

export default ConfirmingEmail
