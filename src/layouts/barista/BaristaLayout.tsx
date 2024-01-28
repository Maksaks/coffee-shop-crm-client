import { FC } from 'react'
import { Outlet } from 'react-router-dom'
import BaristaHeader from '../../components/Barista/BaristaHeader/BaristaHeader'
import RolesRoutesProtector from '../../components/RolesRoutesProtector/RolesRoutesProtector'

const BaristaLayout: FC = () => {
	return (
		<RolesRoutesProtector>
			<div className='bg-zinc-600 min-h-screen pb-10 flex flex-col'>
				<BaristaHeader />
				<Outlet />
			</div>
		</RolesRoutesProtector>
	)
}

export default BaristaLayout
