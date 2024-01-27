import { FC } from 'react'
import { Outlet } from 'react-router-dom'
import AdminHeader from '../../components/Admin/AdminHeader/AdminHeader'
import RolesRoutesProtector from '../../components/RolesRoutesProtector/RolesRoutesProtector'

const AdminLayout: FC = () => {
	return (
		<RolesRoutesProtector>
			<div>
				<AdminHeader />
				<Outlet />
			</div>
		</RolesRoutesProtector>
	)
}

export default AdminLayout
