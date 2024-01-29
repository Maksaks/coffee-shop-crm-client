import { motion } from 'framer-motion'
import { Store } from 'lucide-react'
import { FC } from 'react'

const CurrentPointInfo: FC = () => {
	return (
		<motion.div
			initial={{ opacity: 0, y: -20 }}
			animate={{ opacity: 1, y: 0 }}
			exit={{ opacity: 0, y: -20 }}
			transition={{ duration: 0.7 }}
			className='w-[70%] h-[1000px] mt-20 mx-auto text-white flex gap-[1%] font-roboto bg-zinc-700 rounded-2xl py-5 flex-col'
		>
			<h2 className='h-[5%] w-full uppercase border-b-4 text-center pb-3 text-2xl font-bold'>
				Menu positions
			</h2>
			<Store className='w-20 h-20' />
		</motion.div>
	)
}

export default CurrentPointInfo
