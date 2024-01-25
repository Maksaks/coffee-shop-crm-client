import { FC } from 'react'
import { Outlet } from 'react-router-dom'
import BaristaHeader from '../../components/Barista/BaristaHeader/BaristaHeader'

const BaristaLayout: FC = () => {
	return (
		<div>
			<BaristaHeader />
			<Outlet />
		</div>
	)
}

export default BaristaLayout
