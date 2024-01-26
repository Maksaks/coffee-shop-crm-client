import { FC } from 'react'
import { Link } from 'react-router-dom'

interface Props {
	message: string
}

const MessageBox: FC<Props> = ({ message }) => {
	return (
		<>
			<p className='text-white font-roboto text-center px-20 text-3xl'>
				{message}
			</p>
			<Link
				to={'/auth/login'}
				className='mt-10 border-2 rounded-xl px-10 py-3 text-lg text-white bg-zinc-800 uppercase font-bold hover:bg-zinc-300 hover:text-black hover:border-black'
			>
				To Login
			</Link>
		</>
	)
}

export default MessageBox
