import { motion } from 'framer-motion'
import { ChevronDown, ChevronUp, Trash2 } from 'lucide-react'
import { FC, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { MenuPositionsService } from '../../services/Admin/MenuPositionsService'

interface Props {
	stepsToReproduce: string[]
	setVisibleModal: (visible: boolean) => void
	pointID: number
	positionID: number
}

const UpdateStepsMenuPositionModal: FC<Props> = ({
	setVisibleModal,
	stepsToReproduce,
	pointID,
	positionID,
}) => {
	const navigate = useNavigate()
	const [steps, setSteps] = useState<string[]>()
	const [newStep, setNewStep] = useState<string>('')

	useEffect(() => {
		setSteps(stepsToReproduce)
	}, [stepsToReproduce])

	const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
		try {
			e.preventDefault()
			if (!steps) return
			await MenuPositionsService.updateMenuPositionSteps(pointID, positionID, {
				stepsToReproduce: steps,
			})
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

	const addStepHandler = () => {
		if (!steps || !newStep || !newStep.length) return
		setSteps([...steps, newStep])
	}

	const removeStepHandler = (removeItem: string) => {
		if (!steps) return
		setSteps(steps.filter(item => item != removeItem))
	}

	const stepUpHandler = (step: string) => {
		if (!steps) return
		const newSteps = steps
		const stepIndex = newSteps.findIndex(item => item == step)
		const tempPrevStep = newSteps[stepIndex - 1]
		newSteps[stepIndex - 1] = step
		newSteps[stepIndex] = tempPrevStep
		setSteps([...newSteps])
	}
	const stepDownHandler = (step: string) => {
		if (!steps) return
		const newSteps = steps
		const stepIndex = newSteps.findIndex(item => item == step)
		const tempPrevStep = newSteps[stepIndex + 1]
		newSteps[stepIndex + 1] = step
		newSteps[stepIndex] = tempPrevStep
		setSteps([...newSteps])
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
				className='w-[20%] h-[800px] bg-zinc-400 rounded-2xl flex flex-col justify-between font-roboto'
				onSubmit={submitHandler}
			>
				<h2 className='font-bold uppercase w-full text-center text-2xl border-b-2 p-3 h-[10%]'>
					Update steps menu position #{positionID}
				</h2>
				<div className='w-full px-5 h-[80%] flex flex-col p-2'>
					<div className='w-full h-[50px] flex justify-start'>
						<input
							type='text'
							name='step'
							placeholder='New step...'
							className='text-xl w-[85%] p-2 rounded-l-xl'
							onChange={e => setNewStep(e.target.value)}
							value={newStep}
						/>
						<button
							type='button'
							className='w-[15%] bg-zinc-900 text-white h-full rounded-r-xl uppercase font-bold hover:bg-green-500 hover:text-black'
							onClick={addStepHandler}
						>
							Add
						</button>
					</div>
					<div className='w-full h-[95%] mt-2 bg-zinc-300 rounded-2xl p-3 flex flex-col gap-5 overflow-auto'>
						{steps?.length
							? steps.map((item, indx) => {
									return (
										<div
											key={indx}
											className='w-full rounded-xl p-2 bg-zinc-400 flex justify-between'
										>
											{item}
											<div className='flex flex-col gap-1'>
												<button
													type='button'
													className='rounded-full hover:bg-zinc-300 p-1 disabled:bg-zinc-400'
													onClick={() => stepUpHandler(item)}
													disabled={steps[0] == item}
												>
													<ChevronUp />
												</button>
												<button
													type='button'
													className='rounded-full hover:bg-zinc-300 p-1 disabled:bg-zinc-400'
													onClick={() => removeStepHandler(item)}
												>
													<Trash2 />
												</button>
												<button
													type='button'
													className='rounded-full hover:bg-zinc-300 p-1 disabled:bg-zinc-400'
													onClick={() => stepDownHandler(item)}
													disabled={steps[steps.length - 1] == item}
												>
													<ChevronDown />
												</button>
											</div>
										</div>
									)
								})
							: ''}
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

export default UpdateStepsMenuPositionModal
