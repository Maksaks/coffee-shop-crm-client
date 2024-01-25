import { createBrowserRouter } from 'react-router-dom'
import AdminLayout from '../layouts/admin/AdminLayout'
import BaristaLayout from '../layouts/barista/BaristaLayout'
import Admin from '../pages/Admin/Admin'
import ChangePassword from '../pages/Auth/ChangePassword'
import Login from '../pages/Auth/Login'
import Registration from '../pages/Auth/Registration'
import RestorePassword from '../pages/Auth/RestorePassword'
import Barista from '../pages/Baritsta/Barista'
import ErrorPage from '../pages/Error/ErrorPage'

export const router = createBrowserRouter([
	{
		path: '/',
		element: <Login />,
		errorElement: <ErrorPage />,
	},
	{
		path: '/registration',
		element: <Registration />,
		errorElement: <ErrorPage />,
	},
	{
		path: '/changepass/:token',
		element: <ChangePassword />,
		errorElement: <ErrorPage />,
	},
	{
		path: '/restore',
		element: <RestorePassword />,
		errorElement: <ErrorPage />,
	},
	{
		path: 'barista',
		element: <BaristaLayout />,
		errorElement: <ErrorPage />,
		children: [
			{
				index: true,
				element: <Barista />,
			},
		],
	},
	{
		path: 'admin',
		element: <AdminLayout />,
		errorElement: <ErrorPage />,
		children: [
			{
				index: true,
				element: <Admin />,
			},
		],
	},
])
