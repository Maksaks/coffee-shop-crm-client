import { FC } from 'react'
import { Outlet } from 'react-router-dom'
import AdminHeader from '../../components/Admin/AdminHeader/AdminHeader'
import RolesRoutesProtector from '../../components/RolesRoutesProtector/RolesRoutesProtector'

const AdminLayout: FC = () => {
	return (
		<RolesRoutesProtector>
			<div className='bg-zinc-600 min-h-screen h-screen flex flex-col'>
				<AdminHeader />
				<Outlet />
			</div>
		</RolesRoutesProtector>
	)
}

export default AdminLayout
