import { motion } from 'framer-motion'
import { Plus, Trash2 } from 'lucide-react'
import { FC, useEffect, useState } from 'react'
import { useLoaderData, useNavigate, useSearchParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import Button from '../../components/Button/Button'
import { CreatingPointModal } from '../../components/Modals/CreatingPointModal'
import { PointsService } from '../../services/Admin/PointsService'
import { IOnlyPointInfo } from '../../types/IOnlyPointInfo'
import { IUpdatePointData } from '../../types/IUpdatePointData'
import { IPointLoader } from './loaders/pointsLoader'

const Points: FC = () => {
	const { points } = useLoaderData() as IPointLoader
	const navigate = useNavigate()
	const [name, setName] = useState<string>()
	const [address, setAddress] = useState<string>()
	const [description, setDescription] = useState<string>()
	const [workingHours, setWorkingHours] = useState<string>()
	const [pointMoney, setPointMoney] = useState<string>()
	const [searchedPoints, setSearchedPoints] = useState<IOnlyPointInfo[]>()
	const [selectedPoint, setSelectedPoint] = useState<IOnlyPointInfo>()
	const [searchParams, setSearchParams] = useSearchParams()
	const [isCreatingModalVisible, setIsCreatingModalVisible] = useState(false)

	const searchHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (!e.target.value.length) {
			setSearchedPoints(points)
			return
		}
		setSearchedPoints(
			points?.filter(item => {
				return item.name.toLowerCase().includes(e.target.value.toLowerCase())
			})
		)
	}

	useEffect(() => {
		if (points) {
			setSearchedPoints(points)
		}
		const pointID = searchParams.get('id')
		if (pointID) {
			setSelectedPoint(points.find(item => item.id == +pointID))
		}
	}, [])

	useEffect(() => {
		if (selectedPoint) {
			setName(selectedPoint.name)
			setAddress(selectedPoint.address)
			setWorkingHours(selectedPoint.workingHours)
			setPointMoney(selectedPoint.pointMoney.toString())
			setDescription(selectedPoint.description)
		}
	}, [selectedPoint])

	const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
		try {
			e.preventDefault()
			if (!selectedPoint) return
			if (!name || !address || !workingHours || !description || !pointMoney)
				return
			let dataToUpdate: IUpdatePointData = {}
			if (selectedPoint.name != name) {
				dataToUpdate = { ...dataToUpdate, name }
			}
			if (selectedPoint.address != address) {
				dataToUpdate = { ...dataToUpdate, address }
			}
			if (selectedPoint.workingHours != workingHours) {
				dataToUpdate = { ...dataToUpdate, workingHours }
			}
			if (selectedPoint.description != description) {
				dataToUpdate = { ...dataToUpdate, description }
			}
			if (selectedPoint.pointMoney != +pointMoney) {
				dataToUpdate = { ...dataToUpdate, pointMoney: +pointMoney }
			}
			await PointsService.updatePoint(selectedPoint.id, dataToUpdate)
			navigate('/admin/refresh')
			navigate(`/admin/points?id=${selectedPoint.id}`)
			toast.success(`Point #${selectedPoint.id} data was successfully updated`)
		} catch (err: any) {
			const error = err.response?.data.message
			toast.error(error.toString())
		}
	}

	const removePointHandler = async () => {
		if (!selectedPoint) return
		try {
			await PointsService.deletePoint(selectedPoint.id)
			toast.success(`Point #${selectedPoint.id} was successfully removed`)
			navigate('/admin/refresh')
			navigate(`/admin/points`)
		} catch (err: any) {
			const error = err.response?.data.message
			toast.error(error.toString())
		}
	}

	return (
		<>
			{isCreatingModalVisible && (
				<CreatingPointModal setVisibleModal={setIsCreatingModalVisible} />
			)}
			<motion.div
				initial={{ opacity: 0, y: -20 }}
				animate={{ opacity: 1, y: 0 }}
				exit={{ opacity: 0, y: -20 }}
				transition={{ duration: 0.7 }}
				className='w-[60%] h-[80vh] mt-[5vh] mx-auto text-white font-roboto flex items-center gap-5 rounded-3xl'
			>
				<div className='h-[100%] w-[35%] bg-zinc-700 rounded-3xl flex items-center flex-col relative shadow-2xl'>
					<h2 className='w-full text-center text-[2vh] uppercase font-bold border-b-4 p-3'>
						POINTS
					</h2>
					<button
						className='absolute top-2 right-2 z-10 w-[2vw] h-[4vh] hover:text-black hover:bg-zinc-300 rounded-full disabled:hover:bg-zinc-700 disabled:hover:text-white'
						onClick={() => {
							setIsCreatingModalVisible(true)
						}}
					>
						<Plus className='w-[2vw] h-[4vh]' />
					</button>
					<input
						className='w-[90%] py-2 px-5 my-3 rounded-2xl text-black text-[2vh]'
						placeholder='Search point by name...'
						onChange={searchHandler}
						disabled={!points.length}
					/>
					<div className='w-full h-[80%] flex flex-col items-center gap-2 overflow-auto'>
						{searchedPoints?.length ? (
							searchedPoints.map((item, indx) => {
								return (
									<button
										title='Select this point'
										key={indx}
										onClick={() => {
											setSelectedPoint(item)
										}}
										className={`p-[1vh] w-[90%] rounded-2xl hover:bg-zinc-400 text-[2vh] ${selectedPoint?.id == item.id ? 'bg-zinc-300 text-black underline uppercase font-bold' : 'bg-zinc-500'}`}
									>
										{item.name}
									</button>
								)
							})
						) : (
							<h2 className='uppercase text-[2vh] pt-5'>Not found</h2>
						)}
					</div>
				</div>
				<div className='h-[100%] w-[65%] bg-zinc-700 rounded-3xl flex items-center flex-col relative shadow-2xl'>
					<h2 className='w-full h-[6%] text-center text-[2vh] uppercase font-bold border-b-4 p-3'>
						POINT INFO
					</h2>
					<div className='h-[7%] border-b-2 w-full grid grid-cols-11 text-[2vh] gap-2 p-5'>
						<label className='col-span-2 px-3 uppercase font-bold'>
							Baristas:
						</label>
						<label className='col-span-1'>{selectedPoint?.baristaCount}</label>
						<label className='col-span-3 px-3 uppercase font-bold'>
							Ingredients:
						</label>
						<label className='col-span-1'>
							{selectedPoint?.ingredientsCount}
						</label>
						<label className='col-span-3 px-3 uppercase font-bold'>
							Menu Position:
						</label>
						<label className='col-span-1'>
							{selectedPoint?.menuPositionsCount}
						</label>
					</div>
					<form
						className='grid grid-cols-3 px-12 p-10 grid-rows-9 w-full h-[70%] items-center relative'
						onSubmit={submitHandler}
					>
						<button
							className='absolute top-3 right-3'
							disabled={!selectedPoint}
							type='button'
							title='Delete this point'
							onClick={() => removePointHandler()}
						>
							<Trash2
								className={`w-[3vw] h-[5vh] p-2 rounded-full ${selectedPoint ? 'hover:stroke-black hover:bg-zinc-400' : ''}`}
							/>
						</button>

						<label className='text-[2vh] uppercase font-bold p-3 flex items-center'>
							Name:
						</label>
						<input
							required
							name='name'
							className='w-[80%] h-[5vh] col-span-2 bg-gradient-to-r from-zinc-500 to-zinc-400 p-3 rounded-2xl hover:border-2 placeholder:text-white/70 placeholder:text-[1.8vh] text-[1.8vh] disabled:hover:border-0'
							placeholder='Enter name...'
							value={name}
							disabled={!selectedPoint}
							onChange={e => setName(e.target.value)}
						/>
						<label className='text-[2vh] uppercase font-bold p-3  flex items-center'>
							Address:
						</label>
						<input
							required
							name='address'
							className='w-[80%] h-[5vh] col-span-2 bg-gradient-to-r from-zinc-500 to-zinc-400 p-3 rounded-2xl hover:border-2 placeholder:text-white/70 placeholder:text-[1.8vh] text-[1.8vh] disabled:hover:border-0'
							placeholder='Enter address...'
							value={address}
							onChange={e => setAddress(e.target.value)}
						/>
						<label className='text-[2vh] uppercase font-bold p-3  flex items-center'>
							Working hours:
						</label>
						<input
							required
							name='workingHours'
							className='w-[80%] h-[5vh] col-span-2 bg-gradient-to-r from-zinc-500 to-zinc-400 p-3 rounded-2xl hover:border-2 placeholder:text-white/70 placeholder:text-[1.8vh] text-[1.8vh] disabled:hover:border-0'
							placeholder='Enter working hours...'
							value={workingHours}
							onChange={e => setWorkingHours(e.target.value)}
						/>
						<label className='text-[2vh] uppercase font-bold p-3  flex items-center'>
							Point money:
						</label>
						<input
							required
							name='pointMoney'
							className='w-[80%] h-[5vh] col-span-2 bg-gradient-to-r from-zinc-500 to-zinc-400 p-3 rounded-2xl hover:border-2 placeholder:text-white/70 placeholder:text-[1.8vh] text-[1.8vh] disabled:hover:border-0'
							placeholder='Enter point money...'
							value={pointMoney}
							onChange={e => setPointMoney(e.target.value)}
						/>
						<label className='text-[2vh] uppercase col-span-3 font-bold p-3 flex items-center'>
							Description:
						</label>
						<textarea
							required
							name='description'
							className='w-full h-[15vh] row-start-6 col-span-3 row-span-3 bg-gradient-to-r from-zinc-500 to-zinc-400 p-3 rounded-2xl hover:border-2 overflow-auto placeholder:text-white/70 placeholder:text-[1.8vh] text-[1.8vh] disabled:hover:border-0'
							placeholder='Enter description...'
							value={description}
							onChange={e => setDescription(e.target.value)}
						/>
						<Button
							className='col-span-3 w-[50%] mx-auto px-10 h-[5vh] p-0 mt-5 uppercase disabled:hover:text-white text-[2vh] disabled:hover:bg-zinc-800'
							title='Update'
							type='submit'
							disabled={
								!selectedPoint ||
								(selectedPoint.name == name &&
									selectedPoint?.address == address &&
									selectedPoint.description == description &&
									selectedPoint.pointMoney == +pointMoney &&
									selectedPoint.workingHours == workingHours)
							}
						/>
					</form>
				</div>
			</motion.div>
		</>
	)
}

export default Points
