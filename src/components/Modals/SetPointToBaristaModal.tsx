/* eslint-disable @typescript-eslint/no-explicit-any */
import { motion } from 'framer-motion'
import { FC, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { BaristasManagementService } from '../../services/Admin/BaristasManagementService'
import { IBaristaAllData } from '../../types/IBaristaAllData'
import { IPointAllData } from '../../types/IPointAllData'

interface Props {
	selectedBaristas: IBaristaAllData
	setVisibleModal: (visible: boolean) => void
}

const SetPointToBaristaModal: FC<Props> = ({
	selectedBaristas,
	setVisibleModal,
}) => {
	const [points, setPoints] = useState<IPointAllData[]>([])
	const [selectedPointID, setSelectedPointID] = useState(-1)
	const navigate = useNavigate()

	useEffect(() => {
		const getPoints = async () => {
			try {
				const pointsData = await BaristasManagementService.getPoints()
				if (pointsData) {
					setPoints(pointsData)
				}
			} catch (err: any) {
				const error = err.response?.data.message
				toast.error(error.toString())
			}
		}
		getPoints()
	}, [])

	const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
		try {
			e.preventDefault()
			await BaristasManagementService.setPointToBarista(
				selectedBaristas.id,
				selectedPointID
			)
			toast.success(`Point ${selectedPointID} was successfully updated`)
			setVisibleModal(false)
			navigate(`/admin/refresh`)
			navigate(`/admin/baristas?id=${selectedBaristas.id}`)
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
			className='fixed w-full h-full bg-black/50 flex justify-center items-center z-10'
		>
			<form
				className='w-[20%] h-[300px] bg-zinc-400 rounded-2xl flex flex-col justify-between font-roboto'
				onSubmit={submitHandler}
			>
				<h2 className='uppercase w-full text-center text-2xl border-b-2 py-3 px-10 bg-zinc-600 text-white rounded-t-2xl'>
					<b>Set point to barista:</b>
					<br />
					{selectedBaristas.surname + ' ' + selectedBaristas.name}
				</h2>
				<div className='w-[70%] mx-auto'>
					<select
						id='selectPoint'
						className='p-3 rounded-xl text-xl  w-full font-roboto hover:cursor-pointer'
						onChange={e => setSelectedPointID(+e.target.value)}
						required
						defaultValue={-1}
					>
						<option value={-1}>Select point...</option>
						{points.map(item => {
							return (
								<option key={item.id} value={item.id}>
									{item.name}
								</option>
							)
						})}
					</select>
				</div>
				<div className='flex items-center justify-end gap-5 w-full p-5'>
					<button
						className={`bg-zinc-700 text-white px-5 py-2 rounded-2xl text-xl hover:bg-zinc-300 hover:text-black uppercase disabled:cursor-not-allowed disabled:hover:bg-zinc-700 disabled:hover:text-white`}
						type='submit'
						disabled={selectedPointID < 0}
					>
						Add
					</button>
					<button
						onClick={() => setVisibleModal(false)}
						type='button'
						className='bg-zinc-700 text-white px-5 py-2 rounded-2xl text-xl hover:bg-zinc-300 hover:text-black uppercase'
					>
						Close
					</button>
				</div>
			</form>
		</motion.div>
	)
}

export default SetPointToBaristaModal
