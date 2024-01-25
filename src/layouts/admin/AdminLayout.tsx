import { FC } from 'react'
import { Outlet } from 'react-router-dom'
import AdminHeader from '../../components/Admin/AdminHeader/AdminHeader'

const AdminLayout: FC = () => {
	return (
		<div>
			<AdminHeader />
			<Outlet />
		</div>
	)
}

export default AdminLayout
