import { Coffee } from 'lucide-react'
import { FC } from 'react'
import HeaderInfo from '../../HeaderInfo/HeaderInfo'
import AdminNavigation from '../AdminNavigation/AdminNavigation'

const AdminHeader: FC = () => {
	return (
		<div className='flex justify-between h-[80px] bg-zinc-800 items-center text-white font-roboto px-3 border-b-[1px]'>
			<div className='h-full flex flex-col items-center p-2 gap-[2px]'>
				<Coffee size={45} color='white' />
				<h1 className='text-[1.2vh] font-bold text-white'>COFFEE CRM</h1>
			</div>
			<AdminNavigation />
			<HeaderInfo />
		</div>
	)
}

export default AdminHeader
