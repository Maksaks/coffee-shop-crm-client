import { motion } from 'framer-motion'
import { FC, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { MenuPositionsService } from '../../services/Admin/MenuPositionsService'
import { IIngredientData } from '../../types/IIngredientData'

interface Props {
	currentIngredients: IIngredientData[]
	pointIngredients: IIngredientData[]
	setVisibleModal: (visible: boolean) => void
	pointID: number
	positionID: number
}

const UpdateIngredientsModal: FC<Props> = ({
	currentIngredients,
	pointIngredients,
	setVisibleModal,
	pointID,
	positionID,
}) => {
	const navigate = useNavigate()
	const [ingredients, setIngredients] = useState<IIngredientData[]>()
	const [noUseIngredients, setNoUseIngredients] = useState<IIngredientData[]>()

	useEffect(() => {
		setIngredients(currentIngredients)
		const arrIndexCur = currentIngredients.map(item => item.id)
		setNoUseIngredients(
			pointIngredients.filter(item => !arrIndexCur.includes(item.id))
		)
	}, [currentIngredients, pointIngredients])

	const addIngredientHandler = (ingredient: IIngredientData) => {
		if (!ingredients) return
		setIngredients([...ingredients, ingredient])
		setNoUseIngredients(prev => prev?.filter(item => item.id != ingredient.id))
	}

	const removeIngredientHandler = (ingredient: IIngredientData) => {
		if (!noUseIngredients) return
		setIngredients(prev => prev?.filter(item => item.id != ingredient.id))
		setNoUseIngredients([...noUseIngredients, ingredient])
	}

	const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
		try {
			e.preventDefault()
			if (!ingredients) return
			await MenuPositionsService.updateMenuPositionIngredients(
				pointID,
				positionID,
				{ ingredients }
			)
			toast.success(
				`Recipe of position #${positionID} was successfully updated`
			)
			setVisibleModal(false)
			navigate('/admin/refresh')
			navigate(`/admin/positions?point=${pointID}&position=${positionID}`)
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
			className='fixed z-10 w-full h-full bg-black/50 flex justify-center items-center'
		>
			<form
				className='w-[40%] h-[800px] bg-zinc-400 rounded-2xl flex flex-col justify-between font-roboto'
				onSubmit={submitHandler}
			>
				<h2 className='font-bold uppercase w-full text-center text-2xl border-b-2 p-3 h-[10%]'>
					Update ingredients menu position #{positionID}
				</h2>
				<div className='w-full px-5 h-[80%] flex p-2 gap-5'>
					<div className='w-full h-[95%] mt-2 bg-zinc-300 rounded-2xl flex flex-col gap-5 overflow-auto'>
						<h2 className='w-full text-center p-2 uppercase text-xl font-bold border-b-2 border-black'>
							Point ingredients
						</h2>
						{noUseIngredients &&
							noUseIngredients?.map((item, indx) => {
								return (
									<button
										key={indx}
										type='button'
										className='rounded-xl bg-zinc-400 w-[90%] mx-auto p-3 uppercase text-xl hover:bg-zinc-200'
										onClick={() => addIngredientHandler(item)}
									>
										{item.name}
									</button>
								)
							})}
					</div>
					<div className='w-full h-[95%] mt-2 bg-zinc-300 rounded-2xl flex flex-col gap-5 overflow-auto'>
						<h2 className='w-full text-center p-2 uppercase text-xl font-bold border-b-2 border-black'>
							Recipe ingredients
						</h2>
						{ingredients &&
							ingredients?.map((item, indx) => {
								return (
									<button
										type='button'
										key={indx}
										className='rounded-xl bg-zinc-400 w-[90%] mx-auto p-3 uppercase text-xl hover:bg-zinc-200'
										onClick={() => removeIngredientHandler(item)}
									>
										{item.name}
									</button>
								)
							})}
					</div>
				</div>
				<div className='flex h-[10%] items-center justify-end gap-5 w-full p-5'>
					<button
						className={`bg-zinc-700 text-white px-5 py-2 rounded-2xl text-xl hover:bg-zinc-300 hover:text-black uppercase disabled:cursor-not-allowed disabled:hover:bg-zinc-700 disabled:hover:text-white`}
						type='submit'
					>
						UPDATE
					</button>
					<button
						type='button'
						onClick={() => setVisibleModal(false)}
						className='bg-zinc-700 text-white px-5 py-2 rounded-2xl text-xl hover:bg-zinc-300 hover:text-black uppercase'
					>
						Close
					</button>
				</div>
			</form>
		</motion.div>
	)
}

export default UpdateIngredientsModal
