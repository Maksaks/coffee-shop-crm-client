import { motion } from 'framer-motion'
import { FC } from 'react'

const Baristas: FC = () => {
	return (
		<motion.div
			initial={{ opacity: 0, y: -20 }}
			animate={{ opacity: 1, y: 0 }}
			exit={{ opacity: 0, y: -20 }}
			transition={{ duration: 0.7 }}
			className='w-[80%] h-[1000px] mt-20 mx-auto bg-zinc-700 rounded-3xl p-5 text-white font-roboto flex flex-col items-center gap-5'
		></motion.div>
	)
}

export default Baristas
