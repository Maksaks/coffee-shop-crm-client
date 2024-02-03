import { motion } from 'framer-motion'
import { FC, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

const Points: FC = () => {
	const navigate = useNavigate()
	const [searchedPoints, setSearchedPoints] = useState()
	const [selectedPoint, setSelectedPoint] = useState()
	const searchHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (!e.target.value.length) {
			// setSearchedPoints(points)
			return
		}
		// setSearchedPoints(
		// 	points?.filter(item => {
		// 		return item.name.toLowerCase().includes(e.target.value.toLowerCase())
		// 	})
		// )
	}

	const removeIngredientHandler = async item => {
		try {
			toast.success(`Order #${item.id} was successfully removed`)
			navigate('/admin/refresh')
			navigate(`/admin/ingredients?point=${selectedPoint?.id}`)
		} catch (err: any) {
			const error = err.response?.data.message
			toast.error(error.toString())
		}
	}

	return (
		<motion.div
			initial={{ opacity: 0, y: -20 }}
			animate={{ opacity: 1, y: 0 }}
			exit={{ opacity: 0, y: -20 }}
			transition={{ duration: 0.7 }}
			className='w-[60%] h-[1000px] mt-20 mx-auto text-white font-roboto flex items-center gap-5 shadow-2xl'
		>
			<div className='h-[100%] w-[35%] bg-zinc-700 rounded-3xl flex items-center flex-col relative'>
				<h2 className='w-full text-center text-2xl uppercase font-bold border-b-4 p-3'>
					POINTS
				</h2>
			</div>
			<div className='h-[100%] w-[65%] bg-zinc-700 rounded-3xl flex items-center flex-col relative'>
				<h2 className='w-full text-center text-2xl uppercase font-bold border-b-4 p-3'>
					POINT INFO
				</h2>
			</div>
		</motion.div>
	)
}

export default Points
