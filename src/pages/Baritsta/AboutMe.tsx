import { motion } from 'framer-motion'
import { User } from 'lucide-react'
import { FC, useState } from 'react'
import { useLoaderData } from 'react-router-dom'
import { toast } from 'react-toastify'
import Button from '../../components/Button/Button'
import { dateFormater } from '../../helper/date-formater.helper'
import { BaristaService } from '../../services/BaristaServices'
import { IBaristaUpdateData } from '../../types/IBaristaUpdateData'
import { IAboutMeDataLoader } from './loaders/aboutMeLoader'

const AboutMe: FC = () => {
	const { aboutMe } = useLoaderData() as IAboutMeDataLoader
	const [name, setName] = useState(aboutMe.name)
	const [surname, setSurname] = useState(aboutMe.surname)
	const [email, setEmail] = useState(aboutMe.email)
	const [phoneNumber, setPhoneNumber] = useState(aboutMe.phoneNumber)

	const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
		try {
			e.preventDefault()
			let dataToUpdate: IBaristaUpdateData = {}
			if (name !== aboutMe.name) {
				dataToUpdate = { ...dataToUpdate, name }
			}
			if (surname !== aboutMe.surname) {
				dataToUpdate = { ...dataToUpdate, surname }
			}
			if (email !== aboutMe.email) {
				dataToUpdate = { ...dataToUpdate, email }
			}
			if (phoneNumber !== aboutMe.phoneNumber) {
				dataToUpdate = { ...dataToUpdate, phoneNumber }
			}
			await BaristaService.updateBarista(dataToUpdate)
			toast.success('Data was successfully updated')
		} catch (err: any) {
			const error = err.response?.data.message
			toast.error(error.toString())
		}
	}

	return (
		<div className='w-[80%] p-10 mx-auto my-auto flex flex-row gap-10 font-roboto text-white'>
			<motion.div
				initial={{ opacity: 0, y: -20 }}
				animate={{ opacity: 1, y: 0 }}
				exit={{ opacity: 0, y: -20 }}
				transition={{ duration: 0.7 }}
				className='bg-zinc-700 w-[30%] rounded-3xl flex flex-col items-center h-[1100px]'
			>
				<User className='w-[100%] h-[40%]' color='white' />
				<h2 className=' text-3xl font-bold pt-5 pb-12 border-t-4 w-full text-center'>
					Statistics for last month:
				</h2>
				<div className='grid grid-cols-2 mb-4 gap-x-20 text-lg w-full px-10 pb-12 gap-y-4'>
					<p className='font-bold uppercase'>Count of shifts:</p>
					<p className='text-xl'>{aboutMe.shifts.length}</p>
					<p className='font-bold uppercase'>Total shifts salary:</p>
					<p className='text-xl'>{aboutMe.totalShiftsSalary} UAH</p>
				</div>
				<h2 className=' font-roboto text-3xl font-bold p-5 border-t-4 w-full text-center pt-5 pb-12'>
					Working conditions:
				</h2>
				<div className='grid grid-cols-2 mb-4 gap-x-20 text-lg w-full px-10 gap-y-4'>
					<p className='font-bold uppercase'>Fixed hour rate:</p>
					<p className='text-xl'>{aboutMe.fixedHourRate} UAH/h</p>
					<p className='font-bold uppercase'>Percent from earnings:</p>
					<p className='text-xl'>{aboutMe.percentFromEarnings} %</p>
					<p className='font-bold uppercase'>Date of employment:</p>
					<p className='text-xl'>{dateFormater(aboutMe.dateOfEmployment)}</p>
				</div>
			</motion.div>
			<motion.div
				initial={{ opacity: 0, y: -20 }}
				animate={{ opacity: 1, y: 0 }}
				exit={{ opacity: 0, y: -20 }}
				transition={{ duration: 0.7 }}
				className='bg-zinc-700 w-[70%] h-[1100px] rounded-3xl pb-10'
			>
				<h1 className='w-full text-center text-white uppercase text-4xl font-bold p-5 border-b-4'>
					Profile info
				</h1>
				<form
					className='grid grid-cols-3 px-20 py-10 gap-y-10  h-[50%]'
					onSubmit={submitHandler}
				>
					<label className='text-2xl font-bold p-3'>Name:</label>
					<input
						required
						name='name'
						value={name}
						onChange={e => setName(e.target.value)}
						className='w-[80%] col-span-2 bg-gradient-to-r from-zinc-500 to-zinc-400 p-3 rounded-2xl hover:border-2 placeholder:text-black/50 placeholder:text-lg text-xl'
						placeholder='Enter your name...'
					/>
					<label className='text-2xl font-bold p-3'>Surname:</label>
					<input
						required
						name='surname'
						className='w-[80%] col-span-2 bg-gradient-to-r from-zinc-500 to-zinc-400 p-3 rounded-2xl hover:border-2 placeholder:text-black/50 placeholder:text-lg text-xl'
						value={surname}
						onChange={e => setSurname(e.target.value)}
						placeholder='Enter your surname...'
					/>
					<label className='text-2xl font-bold p-3'>Email:</label>
					<input
						required
						name='email'
						value={email}
						onChange={e => setEmail(e.target.value)}
						className='w-[80%] col-span-2 bg-gradient-to-r from-zinc-500 to-zinc-400 p-3 rounded-2xl hover:border-2 placeholder:text-black/50 placeholder:text-lg text-xl'
						placeholder='Enter your email...'
					/>
					<label className='text-2xl font-bold p-3'>Phone number:</label>
					<input
						required
						name='phoneNumber'
						value={phoneNumber}
						onChange={e => setPhoneNumber(e.target.value)}
						className='w-[80%] col-span-2 bg-gradient-to-r from-zinc-500 to-zinc-400 p-3 rounded-2xl hover:border-2 placeholder:text-black/50 placeholder:text-lg text-xl'
						placeholder='Enter your phone number...'
					/>
					<Button
						className='col-start-3 uppercase'
						title='Update'
						type='submit'
					/>
				</form>
				<div className='w-full flex flex-row h-[45%]'>
					<div className='w-[50%] flex flex-col items-center'>
						<h2 className='w-full text-center border-t-4 text-3xl uppercase font-bold p-5'>
							Your working points
						</h2>
						<div className='w-[90%] overflow-auto h-[80%]'>
							<table className='table-auto w-full text-center border-collapse'>
								<thead>
									<tr className='sticky top-0 text-xl bg-zinc-800'>
										<th className='w-[10%] p-2 border border-white'>ID</th>
										<th className='w-[45%] p-2 border border-white'>NAME</th>
										<th className='w-[45%] p-2 border border-white'>ADDRESS</th>
									</tr>
								</thead>
								<tbody>
									{aboutMe.points.map((item, indx) => {
										return (
											<tr key={indx} className='bg-zinc-600'>
												<td className='p-2 border border-white'>{indx + 1}</td>
												<td className='border border-white'>{item.name}</td>
												<td className='border border-white'>{item.address}</td>
											</tr>
										)
									})}
								</tbody>
							</table>
						</div>
					</div>
					<div className='w-[50%] flex flex-col items-center'>
						<h2 className='w-full text-center border-t-4 text-3xl uppercase font-bold p-5'>
							Your shifts
						</h2>
						<div className='w-[90%] overflow-auto h-[80%]'>
							<table className='table-auto w-full text-center border-collapse'>
								<thead>
									<tr className='sticky top-0 text-xl bg-zinc-800'>
										<th className='w-[10%] p-2 border border-white'>ID</th>
										<th className='w-[30%] p-2 border border-white'>DATA</th>
										<th className='w-[30%] p-2 border border-white'>SALARY</th>
										<th className='w-[30%] p-2 border border-white'>POINT</th>
									</tr>
								</thead>
								<tbody>
									{aboutMe.shifts.map((item, indx) => {
										return (
											<tr key={indx} className='bg-zinc-600'>
												<td className='p-2 border border-white'>{indx + 1}</td>
												<td className='border border-white'>
													{dateFormater(item.time)}
												</td>
												<td className='border border-white'>
													{item.baristaSalary} UAH
												</td>
												<td className='border border-white'>
													{item.point?.name}
												</td>
											</tr>
										)
									})}
								</tbody>
							</table>
						</div>
					</div>
				</div>
			</motion.div>
		</div>
	)
}

export default AboutMe
