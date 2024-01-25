import { Coffee } from 'lucide-react'
import { FC } from 'react'
import { Link } from 'react-router-dom'

interface Props {
	children: JSX.Element
	title: string
}

const BaseForm: FC<Props> = ({ children, title }) => {
	return (
		<div className='flex flex-col h-screen items-center bg-zinc-900'>
			<div className='h-[5%] w-screen pl-10 flex flex-row items-center gap-10'>
				<Link to={'/'} className='w-[50px] h-[50px]'>
					<Coffee size={50} color='white' />
				</Link>
				<h1 className='text-3xl font-bold text-white'>COFFEE CRM</h1>
			</div>
			<div className='h-[95%] flex items-center'>
				<div className='bg-zinc-600 w-[500px] h-auto py-28 rounded-[50px] flex flex-col items-center justify-start'>
					<h2 className='text-white text-[40px] font-bold leading-[50px] mb-[70px] border-b-4 text-center uppercase'>
						{title}
					</h2>
					{children}
				</div>
			</div>
		</div>
	)
}

export default BaseForm
