import { motion } from 'framer-motion'
import { Trash2 } from 'lucide-react'
import { FC, useEffect, useState } from 'react'
import { useLoaderData, useNavigate, useSearchParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { dateTimeFormatter } from '../../helper/date-formater.helper'
import { ShiftsService } from '../../services/Admin/ShiftsService'
import { IShiftData } from '../../types/IShiftData'
import {
	IBaristaShort,
	IBaristaShortAllDataLoader,
} from './loaders/shiftsLoader'

const Shifts: FC = () => {
	const { baristas } = useLoaderData() as IBaristaShortAllDataLoader
	const [searchedBaristas, setSearchedBaristas] = useState<IBaristaShort[]>()
	const [selectedBarista, setSelectedBarista] = useState<IBaristaShort>()
	const [baristaShifts, setBaristaShifts] = useState<IShiftData[]>()
	const navigate = useNavigate()
	const [searchParams, setSearchParams] = useSearchParams()
	useEffect(() => {
		setSearchedBaristas(baristas)
		const id = searchParams.get('barista')
		if (id) {
			setSelectedBarista(baristas.find(item => item.id == +id))
		}
	}, [])

	useEffect(() => {
		const getShiftsByBarista = async () => {
			if (!selectedBarista) return
			try {
				const shifts = await ShiftsService.getShiftsByBarista(
					selectedBarista?.id
				)
				if (shifts) {
					setBaristaShifts(shifts)
				}
			} catch (err: any) {
				const error = err.response?.data.message
				toast.error(error.toString())
			}
		}
		getShiftsByBarista()
	}, [selectedBarista])

	const searchHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (!e.target.value.length) {
			setSearchedBaristas(baristas)
			return
		}
		setSearchedBaristas(
			baristas?.filter(item => {
				const nameSurname = item.name + ' ' + item.surname
				return nameSurname.toLowerCase().includes(e.target.value.toLowerCase())
			})
		)
	}

	const removeShiftHandler = async (item: IShiftData) => {
		try {
			await ShiftsService.deleteShiftByID(item.id)
			toast.success(
				`Shift #${item.id} for barista ${selectedBarista?.name + ' ' + selectedBarista?.surname} was removed`
			)
			navigate('/admin/refresh')
			navigate(`/admin/shifts?barista=${selectedBarista?.id}`)
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
			className='w-[70%] h-[80vh] mt-[5vh] mx-auto text-white font-roboto flex items-center gap-5'
		>
			<div className='h-[100%] w-[30%] bg-zinc-700 rounded-3xl flex items-center flex-col relative  shadow-2xl'>
				<h2 className='w-full h-[6%] p-3 border-b-4 uppercase text-center text-[2vh] font-bold'>
					Baristas
				</h2>
				<input
					className='w-[90%] py-2 px-5 my-3 rounded-2xl text-black text-[2vh]'
					placeholder='Search barista by surname or name...'
					onChange={searchHandler}
				/>
				<div className='w-full h-[80%] flex flex-col items-center gap-2  overflow-auto'>
					{searchedBaristas?.length ? (
						searchedBaristas.map((item, indx) => {
							return (
								<button
									title='Select this barista'
									key={indx}
									onClick={() => {
										setSelectedBarista(item)
									}}
									className={`p-[1vh] w-[90%] rounded-2xl hover:bg-zinc-400 text-[2vh] ${selectedBarista?.id == item.id ? 'bg-zinc-300 text-black underline uppercase font-bold' : 'bg-zinc-500'}`}
								>
									{item.surname + ' ' + item.name}
								</button>
							)
						})
					) : (
						<h2 className='uppercase text-[2vh] pt-5'>Not found</h2>
					)}
				</div>
			</div>
			<div className='h-[100%] w-[70%] bg-zinc-700 rounded-3xl flex items-center flex-col relative gap-3'>
				<h2 className='w-full h-[6%] p-3 border-b-4 uppercase text-center text-[2vh] font-bold'>
					{!selectedBarista
						? 'BARISTA`S SHIFTS'
						: `SHIFTS FOR BARISTA ${selectedBarista.name + ' ' + selectedBarista.surname}`}
				</h2>
				{baristaShifts?.length ? (
					<div className='w-[90%] bg-zinc-800/80 h-[6vh] rounded-t-2xl grid grid-cols-10 items-center px-5 py-2 font-bold text-[2vh]'>
						<label>ID</label>
						<label className='col-span-3 text-center'>POINT NAME</label>
						<label className='col-span-2 text-center'>SALARY</label>
						<label className='col-span-3 text-center'>TIME</label>
						<label className='col-span-1 text-center'></label>
					</div>
				) : (
					<></>
				)}
				<div className='w-[90%] flex flex-col items-center h-[80%] overflow-auto gap-2'>
					{baristaShifts?.length ? (
						baristaShifts.map((item, indx) => {
							return (
								<div
									key={indx}
									className='w-full bg-zinc-500/90 h-[60px] rounded-2xl grid grid-cols-10 items-center px-5 py-2 text-[1.7vh]'
								>
									<label>{item.id}</label>
									<label className='col-span-3 text-center'>
										{item.point?.name}
									</label>
									<label className='col-span-2 text-center'>
										{item.baristaSalary} UAH
									</label>
									<label className='col-span-3 text-center'>
										{dateTimeFormatter(item.time)}
									</label>
									<div className='col-span-1 flex justify-end'>
										<button
											className='w-[2vw] h-[3.5vh] rounded-full flex justify-end hover:bg-red-500 p-2'
											onClick={() => removeShiftHandler(item)}
											title='Remove this shift'
										>
											<Trash2 className='w-[1.5vw] h-[2.5vh]' />
										</button>
									</div>
								</div>
							)
						})
					) : (
						<h2 className='uppercase font-bold text-[2vh] w-full text-center p-10 text-white/60'>
							shifts were not found
						</h2>
					)}
				</div>
			</div>
		</motion.div>
	)
}

export default Shifts
