import { motion } from 'framer-motion'
import { Coffee } from 'lucide-react'
import { FC } from 'react'
import { Link, Outlet } from 'react-router-dom'
import AuthRoutesProtector from './AuthRoutesProtector'

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
				<motion.div
					initial={{ opacity: 0, y: -20 }}
					animate={{ opacity: 1, y: 0 }}
					exit={{ opacity: 0, y: -20 }}
					transition={{ duration: 0.7 }}
					className='bg-zinc-600 w-[500px] h-auto py-28 rounded-[50px] flex  flex-col items-center justify-start shadow-[0_15px_15px_10px_rgba(161,161,170,0.2)]'
				>
					<AuthRoutesProtector>
						<Outlet />
					</AuthRoutesProtector>
				</motion.div>
			</div>
		</div>
	)
}

export default AuthLayout
