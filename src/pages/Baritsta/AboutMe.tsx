import { SquareUserRound } from 'lucide-react'
import { FC } from 'react'
import { useLoaderData } from 'react-router-dom'
import { dateFormater } from '../../helper/date-formater.helper'
import { IAboutMeDataLoader } from './loaders/aboutMeLoader'

const AboutMe: FC = () => {
	const { aboutMe } = useLoaderData() as IAboutMeDataLoader
	console.log(aboutMe)
	return (
		<div className='w-[80%] min-h-[80%] mx-auto my-auto flex flex-row gap-3'>
			<div className='bg-zinc-700 w-[30%] h-full rounded-3xl flex flex-col items-center'>
				<SquareUserRound className='w-[100%] h-[40%]' color='white' />
				<h2 className='text-white font-roboto text-3xl font-bold pt-5 pb-12 border-t-4 w-full text-center'>
					Statistics for last month:
				</h2>
				<div className='grid grid-cols-2 mb-4 gap-x-20 text-white text-lg w-full px-10 pb-12 gap-y-4'>
					<p className='font-bold uppercase'>Count of shifts:</p>
					<p className='text-xl'>{aboutMe.shifts.length}</p>
					<p className='font-bold uppercase'>Total shifts salary:</p>
					<p className='text-xl'>{aboutMe.totalShiftsSalary} UAH</p>
				</div>
				<h2 className='text-white font-roboto text-3xl font-bold p-5 border-t-4 w-full text-center pt-5 pb-12'>
					Working conditions:
				</h2>
				<div className='grid grid-cols-2 mb-4 gap-x-20 text-white text-lg w-full px-10 gap-y-4'>
					<p className='font-bold uppercase'>Fixed hour rate:</p>
					<p className='text-xl'>{aboutMe.fixedHourRate} UAH/h</p>
					<p className='font-bold uppercase'>Percent from earnings:</p>
					<p className='text-xl'>{aboutMe.percentFromEarnings} %</p>
					<p className='font-bold uppercase'>Date of employment:</p>
					<p className='text-xl'>{dateFormater(aboutMe.dateOfEmployment)}</p>
				</div>
			</div>
			<div className='bg-zinc-700 w-[70%] h-full rounded-3xl'></div>
		</div>
	)
}

export default AboutMe
