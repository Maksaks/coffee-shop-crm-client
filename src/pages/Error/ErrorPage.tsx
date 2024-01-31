import { ShieldAlert } from 'lucide-react'
import { FC } from 'react'
import { Link } from 'react-router-dom'

const ErrorPage: FC = () => {
	return (
		<div className='min-h-screen bg-zinc-900 font-roboto text-white flex justify-center items-center flex-col gap-10'>
			<ShieldAlert size={350} />
			<Link
				to={'/'}
				className='bg-zinc-100 rounded-xl h-[70px] w-[250px] text-zinc-700 text-[30px] flex justify-center items-center font-bold'
			>
				TO MAIN PAGE
			</Link>
		</div>
	)
}

export default ErrorPage
