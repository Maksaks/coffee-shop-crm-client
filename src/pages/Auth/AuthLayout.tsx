import { Coffee } from 'lucide-react'
import { FC } from 'react'
import { Link, Outlet } from 'react-router-dom'

const AuthLayout: FC = () => {
	return (
		<div className='flex flex-col h-screen items-center bg-zinc-900'>
			<div className='h-[5%] w-screen pl-10 flex flex-row items-center gap-10'>
				<Link to={'/auth/login'} className='w-[50px] h-[50px]'>
					<Coffee size={50} color='white' />
				</Link>
				<h1 className='text-3xl font-bold text-white'>COFFEE CRM</h1>
			</div>
			<div className='h-[95%] flex items-center'>
				<div className='bg-zinc-600 w-[500px] h-auto py-28 rounded-[50px] flex flex-col items-center justify-start'>
					<Outlet />
				</div>
			</div>
		</div>
	)
}

export default AuthLayout
