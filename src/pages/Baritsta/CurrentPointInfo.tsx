/* eslint-disable @typescript-eslint/no-explicit-any */
import { motion } from 'framer-motion'
import { Store } from 'lucide-react'
import { FC, useState } from 'react'
import { useLoaderData, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { BaristaService } from '../../services/BaristaServices'
import { IPointInfoDataLoader } from './loaders/currentPointInfoLoader'

const CurrentPointInfo: FC = () => {
	const { point } = useLoaderData() as IPointInfoDataLoader
	const navigate = useNavigate()
	const [amount, setAmount] = useState('')
	const takeMoneyHandler = async () => {
		try {
			if (+amount <= 0) return
			const amountToSend = Math.round(+amount)

			await BaristaService.takeMoneyFromPointBalance(
				{ amount: amountToSend },
				point.id
			)
			toast.success('Ingredients was successfully updated')
			navigate('/barista/point')
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
			className='w-[70%] h-[1000px] mt-20 mx-auto text-white flex font-roboto bg-zinc-700 rounded-2xl py-5 flex-col shadow-2xl'
		>
			<h2 className='h-[8%] w-full uppercase border-b-4 text-center pb-3 text-[3vh] font-bold'>
				Current point
			</h2>
			<div className='flex h-[90%] w-full justify-start px-28'>
				<div className='w-[30%] h-full border-r-4'>
					<Store className='w-full h-[50%] border-b-4 p-5 fill-zinc-600' />
					<div className='w-full h-[20%] py-5 flex flex-col items-center border-b-4 justify-center'>
						<label className='flex items-center pl-3 w-[80%] uppercase font-bold text-[2vh]'>
							Point balance:
						</label>
						<label className='col-span-4 w-[80%] h-[55px] bg-gradient-to-r from-zinc-500 to-zinc-400 flex items-center p-3 rounded-2xl cursor-default placeholder:text-black/50 placeholder:text-lg text-[2vh]'>
							{point.pointMoney} UAH
						</label>
					</div>
					<div className='w-full h-[30%] flex flex-col items-center justify-center'>
						<label
							htmlFor='takingMoney'
							className='text-left w-[80%] pl-3 uppercase font-bold text-[2vh]'
						>
							withdrawal amount
						</label>
						<input
							id='takingMoney'
							type='number'
							value={amount}
							onChange={e => setAmount(e.target.value)}
							className='w-[80%] text-[2vh] p-3 rounded-2xl text-black placeholder:text-[2vh]'
							placeholder='Input withdrawal amount...'
						/>
						<button
							className='bg-zinc-800 text-white rounded-xl text-[2vh] font-bold px-10 uppercase py-3 mt-10 hover:bg-zinc-300 hover:text-black disabled:hover:bg-zinc-800 disabled:hover:text-white disabled:cursor-not-allowed'
							onClick={takeMoneyHandler}
							disabled={+amount <= 0}
						>
							Take money
						</button>
					</div>
				</div>
				<div className='grid grid-cols-5 gap-x-[4vw] w-[70%] px-16 pt-16 text-xl max-h-[90%]'>
					<label className='flex items-center h-[5vh] text-[2vh] uppercase font-bold'>
						Name:
					</label>
					<label className='col-span-4 w-full h-[5vh] bg-gradient-to-r from-zinc-500 to-zinc-400 flex items-center p-3 rounded-2xl cursor-default placeholder:text-black/50 placeholder:text-lg text-[2vh]'>
						{point.name}
					</label>
					<label className='uppercase font-bold flex items-center h-[5vh] text-[2vh]'>
						Address:
					</label>
					<label className='col-span-4 w-full h-[5vh] bg-gradient-to-r from-zinc-500 to-zinc-400 flex items-center p-3 rounded-2xl cursor-default placeholder:text-black/50 placeholder:text-lg text-[2vh]'>
						{point.address}
					</label>
					<label className='uppercase font-bold flex items-center h-[5vh] text-[2vh]'>
						Working hours:
					</label>
					<label className='col-span-4 w-full h-[5vh] bg-gradient-to-r from-zinc-500 to-zinc-400 flex items-center p-3 rounded-2xl cursor-default placeholder:text-black/50 placeholder:text-lg text-[2vh]'>
						{point.workingHours}
					</label>

					<label className='uppercase font-bold flex items-center h-[5vh] text-[2vh]'>
						Description:
					</label>
					<label className='col-span-4 max-h-full min-h-[5vh] overflow-auto bg-gradient-to-r from-zinc-500 to-zinc-400 px-3 py-3 rounded-2xl cursor-default placeholder:text-black/50 placeholder:text-lg text-[2vh]'>
						{point.description}
					</label>
				</div>
			</div>
		</motion.div>
	)
}

export default CurrentPointInfo
