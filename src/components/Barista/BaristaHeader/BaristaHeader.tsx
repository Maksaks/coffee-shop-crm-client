import { Coffee } from 'lucide-react'
import { FC } from 'react'
import HeaderInfo from '../../HeaderInfo/HeaderInfo'
import BaristaNavigation from '../BaristaNavigation/BaristaNavigation'

const BaristaHeader: FC = () => {
	return (
		<div className='flex justify-between h-[80px] bg-zinc-800 items-center text-white font-roboto px-3 border-b-[1px]'>
			<div className='h-full flex flex-col items-center p-2 gap-[2px]'>
				<Coffee size={45} color='white' />
				<h1 className='text-base font-bold text-white'>COFFEE CRM</h1>
			</div>
			<BaristaNavigation />
			<HeaderInfo />
		</div>
	)
}

export default BaristaHeader
