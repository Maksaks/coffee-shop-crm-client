/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { motion } from 'framer-motion'
import { Plus, Trash2, UserPlus } from 'lucide-react'
import { FC, useEffect, useState } from 'react'
import { useLoaderData, useNavigate, useSearchParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import Button from '../../components/Button/Button'
import CreateBaristaModal from '../../components/Modals/CreateBaristaModal'
import SetPointToBaristaModal from '../../components/Modals/SetPointToBaristaModal'
import { isEmailValid } from '../../helper/validate-email.helper'
import { BaristasManagementService } from '../../services/Admin/BaristasManagementService'
import { IBaristaAllData } from '../../types/IBaristaAllData'
import { IBaristaUpdateData } from '../../types/IBaristaUpdateData'
import { IBaristaAllDataLoader } from './loaders/baristasLoader'

const Baristas: FC = () => {
	const navigate = useNavigate()
	const { baristas } = useLoaderData() as IBaristaAllDataLoader
	const [isSetPointModalVisible, setIsSetPointModalVisible] = useState(false)
	const [isCreateBaristasModalVisible, setIsCreateBaristasModalVisible] =
		useState(false)
	const [selectedBarista, setSelectedBarista] = useState<IBaristaAllData>()
	const [searchedBaristas, setSearchedBaristas] = useState<IBaristaAllData[]>()
	const [name, setName] = useState('No selected')
	const [surname, setSurname] = useState('No selected')
	const [email, setEmail] = useState('No selected')
	const [phoneNumber, setPhoneNumber] = useState('No selected')
	const [fixedHourRate, setFixedHourRate] = useState(0)
	const [percentFromEarnings, setPercentFromEarnings] = useState(0)
	const [password, setPassword] = useState('')
	const [searchParams, setSearchParams] = useSearchParams()
	useEffect(() => {
		setSearchedBaristas(baristas)
		const id = searchParams.get('id')
		if (id) {
			setSelectedBarista(baristas.find(item => item.id == +id))
		}
	}, [])

	useEffect(() => {
		if (selectedBarista) {
			setName(selectedBarista.name)
			setSurname(selectedBarista.surname)
			setEmail(selectedBarista.email)
			setPhoneNumber(selectedBarista.phoneNumber)
			setFixedHourRate(selectedBarista.fixedHourRate)
			setPercentFromEarnings(selectedBarista.percentFromEarnings)
		}
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

	const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
		try {
			e.preventDefault()
			if (!selectedBarista) return
			if (!isEmailValid(email)) return
			let dataToUpdate: IBaristaUpdateData = {}
			if (name !== selectedBarista.name) {
				dataToUpdate = { ...dataToUpdate, name }
			}
			if (surname !== selectedBarista.surname) {
				dataToUpdate = { ...dataToUpdate, surname }
			}
			if (email !== selectedBarista.email) {
				dataToUpdate = { ...dataToUpdate, email }
			}
			if (phoneNumber !== selectedBarista.phoneNumber) {
				dataToUpdate = { ...dataToUpdate, phoneNumber }
			}
			if (fixedHourRate !== selectedBarista.fixedHourRate) {
				dataToUpdate = { ...dataToUpdate, fixedHourRate }
			}
			if (percentFromEarnings !== selectedBarista.percentFromEarnings) {
				dataToUpdate = { ...dataToUpdate, percentFromEarnings }
			}
			if (password.length) {
				dataToUpdate = { ...dataToUpdate, password }
			}
			await BaristasManagementService.updateBaristaInfo(
				selectedBarista.id,
				dataToUpdate
			)
			navigate('/admin/refresh')
			navigate(`/admin/baristas?id=${selectedBarista.id}`)
			toast.success(
				`Barista #${selectedBarista.id} data was successfully updated`
			)
		} catch (err: any) {
			const error = err.response?.data.message
			toast.error(error.toString())
		}
	}

	const removePointHandler = async (pointID: number) => {
		try {
			if (!selectedBarista) return
			await BaristasManagementService.removePointFromBarista(
				selectedBarista?.id,
				pointID
			)
			toast.success(`Point ${pointID} was removed`)
			navigate('/admin/refresh')
			navigate(`/admin/baristas?id=${selectedBarista.id}`)
		} catch (err: any) {
			const error = err.response?.data.message
			toast.error(error.toString())
		}
	}

	const deleteBaristasHandler = async () => {
		try {
			if (!selectedBarista) return
			await BaristasManagementService.deleteBarista(selectedBarista.id)
			toast.success(`Barista ${selectedBarista.id} was removed`)
			setSelectedBarista(undefined)
			navigate('/admin/refresh')
			navigate(`/admin/baristas`)
		} catch (err: any) {
			const error = err.response?.data.message
			toast.error(error.toString())
		}
	}

	return (
		<>
			{isCreateBaristasModalVisible && !isSetPointModalVisible && (
				<CreateBaristaModal setVisibleModal={setIsCreateBaristasModalVisible} />
			)}
			{isSetPointModalVisible &&
				!isCreateBaristasModalVisible &&
				selectedBarista && (
					<SetPointToBaristaModal
						selectedBaristas={selectedBarista}
						setVisibleModal={setIsSetPointModalVisible}
					/>
				)}
			<motion.div
				initial={{ opacity: 0, y: -20 }}
				animate={{ opacity: 1, y: 0 }}
				exit={{ opacity: 0, y: -20 }}
				transition={{ duration: 0.7 }}
				className='w-[70%] h-[1000px] mt-20 mx-auto text-white font-roboto flex items-center gap-5 relative shadow-2xl'
			>
				<button
					className='absolute top-3 right-3'
					onClick={deleteBaristasHandler}
					disabled={!selectedBarista}
					title='Remove this barista'
				>
					<Trash2
						className={`w-16 h-16 p-2 rounded-full ${selectedBarista ? 'hover:stroke-black hover:bg-zinc-400' : ''}`}
					/>
				</button>
				<div className='h-[100%] w-[23%] bg-zinc-700 rounded-3xl flex items-center flex-col relative'>
					<button
						className='absolute right-5 top-1 py-1 px-2 bg-zinc-900 font-bold hover:bg-zinc-400 rounded-xl hover:text-black'
						onClick={() => setIsCreateBaristasModalVisible(true)}
						title='Add new barista'
					>
						<UserPlus className='w-10 h-10' />
					</button>
					<h2 className='w-full p-3 border-b-4 uppercase text-center text-2xl font-bold'>
						Baristas
					</h2>
					<input
						className='w-[90%] py-2 px-5 my-3 rounded-2xl text-black text-xl'
						placeholder='Search baristas by name...'
						onChange={searchHandler}
					/>
					<div className='w-full h-[80%] flex flex-col items-center gap-2'>
						{searchedBaristas?.length ? (
							searchedBaristas.map((item, indx) => {
								return (
									<button
										key={indx}
										onClick={() => {
											setSelectedBarista(item)
										}}
										title='Select this barista'
										className={`p-4 w-[90%] rounded-2xl hover:bg-zinc-400 text-xl ${selectedBarista?.id == item.id ? 'bg-zinc-300 text-black underline uppercase font-bold' : 'bg-zinc-500'}`}
									>
										{item.surname + ' ' + item.name}
									</button>
								)
							})
						) : (
							<h2 className='uppercase text-2xl pt-5'>Not found</h2>
						)}
					</div>
				</div>
				<div className='h-[100%] w-[76%] bg-zinc-700 rounded-3xl flex flex-col'>
					<form
						className='grid grid-cols-6 px-20 pt-10 h-[50%] items-center border-b-4'
						onSubmit={submitHandler}
					>
						<label className='text-2xl font-bold p-3 flex items-center'>
							Name:
						</label>
						<input
							required
							name='name'
							value={name}
							onChange={e => setName(e.target.value)}
							className='w-[80%] h-[60px] col-span-2 bg-gradient-to-r from-zinc-500 to-zinc-400 p-3 rounded-2xl hover:border-2 placeholder:text-white/70 placeholder:text-lg text-xl'
							placeholder='Enter name...'
						/>
						<label className='text-2xl font-bold p-3  flex items-center'>
							Surname:
						</label>
						<input
							required
							name='surname'
							className='w-[80%] h-[60px] col-span-2 bg-gradient-to-r from-zinc-500 to-zinc-400 p-3 rounded-2xl hover:border-2 placeholder:text-white/70 placeholder:text-lg text-xl'
							value={surname}
							onChange={e => setSurname(e.target.value)}
							placeholder='Enter surname...'
						/>
						<label className='text-2xl font-bold p-3  flex items-center'>
							Email:
						</label>
						<input
							required
							name='email'
							value={email}
							onChange={e => setEmail(e.target.value)}
							className={`w-[80%] h-[60px] col-span-2 bg-gradient-to-r from-zinc-500 to-zinc-400 p-3 rounded-2xl hover:border-2 placeholder:text-white/70 placeholder:text-lg text-xl ${email.length && selectedBarista && !isEmailValid(email) ? 'border-red-700 border-2' : ''}`}
							placeholder='Enter email...'
						/>
						<label className='text-2xl font-bold p-3  flex items-center'>
							Phone number:
						</label>
						<input
							required
							name='phoneNumber'
							value={phoneNumber}
							onChange={e => setPhoneNumber(e.target.value)}
							className='w-[80%] h-[60px] col-span-2 bg-gradient-to-r from-zinc-500 to-zinc-400 p-3 rounded-2xl hover:border-2 placeholder:text-white/70 placeholder:text-lg text-xl'
							placeholder='Enter phone number...'
						/>
						<label className='text-2xl font-bold p-3  flex items-center'>
							Fixed hour rate:
						</label>
						<input
							required
							name='fixedHourRate'
							className='w-[80%] h-[60px] col-span-2 bg-gradient-to-r from-zinc-500 to-zinc-400 p-3 rounded-2xl hover:border-2 placeholder:text-white/70 placeholder:text-lg text-xl'
							value={fixedHourRate}
							onChange={e => setFixedHourRate(+e.target.value)}
							placeholder='Enter fixed hour rate...'
						/>
						<label className='text-2xl font-bold p-3  flex items-center'>
							Percent from earnings:
						</label>
						<input
							required
							name='percentFromEarnings'
							className='w-[80%] h-[60px] col-span-2 bg-gradient-to-r from-zinc-500 to-zinc-400 p-3 rounded-2xl hover:border-2 placeholder:text-white/70 placeholder:text-lg text-xl'
							value={percentFromEarnings}
							onChange={e => setPercentFromEarnings(+e.target.value)}
							placeholder='Enter percent from earnings...'
						/>
						<label className='text-2xl font-bold p-3  flex items-center'>
							Password:
						</label>
						<input
							name='percentFromEarnings'
							className='w-[80%] h-[60px] col-span-2 bg-gradient-to-r from-zinc-500 to-zinc-400 p-3 rounded-2xl hover:border-2 placeholder:text-white/70 placeholder:text-lg text-xl'
							type='password'
							onChange={e => setPassword(e.target.value)}
							placeholder='Enter password...'
						/>
						<Button
							className='col-start-5 px-10 uppercase disabled:hover:text-white disabled:hover:bg-zinc-800'
							title='Update'
							type='submit'
							disabled={!selectedBarista}
						/>
					</form>
					<div className='w-full h-[40%] flex flex-col items-center relative'>
						<h2 className='w-full underline underline-offset-8 text-center p-3 uppercase text-2xl font-bold'>
							Points
						</h2>
						<div className='w-full p-5 h-[100%] flex items-center justify-center gap-5'>
							<div className='w-[90%] h-[100%] bg-zinc-400 overflow-auto rounded-2xl p-3 flex flex-col gap-3 items-center font-bold'>
								{selectedBarista &&
									selectedBarista.points.map((item, indx) => {
										return (
											<div
												key={indx}
												className='w-[95%] text-white bg-zinc-600 rounded-2xl grid grid-cols-12 border-2 border-white uppercase'
											>
												<span className='p-3'>{item.id}</span>
												<span className='col-span-5 p-3 border-x-2 text-center border-white'>
													{item.name}
												</span>
												<span className='p-3 col-span-5 text-center border-r-2 border-white'>
													{item.address}
												</span>
												<button
													className='w-full h-full hover:bg-red-500 rounded-r-2xl'
													onClick={() => removePointHandler(item.id)}
												>
													<Trash2 className='mx-auto' />
												</button>
											</div>
										)
									})}
							</div>
						</div>
						<Button
							className='uppercase absolute top-3 right-20 disabled:hover:text-white disabled:hover:bg-zinc-800'
							icon={<Plus className='w-12 h-12' />}
							type='button'
							disabled={!selectedBarista}
							onClick={() => setIsSetPointModalVisible(true)}
						/>
					</div>
				</div>
			</motion.div>
		</>
	)
}

export default Baristas
