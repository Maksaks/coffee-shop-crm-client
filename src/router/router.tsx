import { createBrowserRouter } from 'react-router-dom'
import AdminLayout from '../layouts/admin/AdminLayout'
import BaristaLayout from '../layouts/barista/BaristaLayout'
import Admin from '../pages/Admin/Admin'
import AuthLayout from '../pages/Auth/AuthLayout'
import ChangePassword from '../pages/Auth/ChangePassword'
import ConfirmingEmail from '../pages/Auth/ConfirmingEmail'
import Login from '../pages/Auth/Login'
import Registration from '../pages/Auth/Registration'
import RestorePassword from '../pages/Auth/RestorePassword'
import Barista from '../pages/Baritsta/Barista'
import ErrorPage from '../pages/Error/ErrorPage'

export const router = createBrowserRouter([
	{
		path: 'auth',
		element: <AuthLayout />,
		errorElement: <ErrorPage />,
		children: [
			{
				path: 'login',
				element: <Login />,
			},
			{
				path: 'registration',
				element: <Registration />,
			},
			{
				path: 'confirming/:token',
				element: <ConfirmingEmail />,
			},
			{
				path: 'change/:token',
				element: <ChangePassword />,
			},
			{
				path: 'restore',
				element: <RestorePassword />,
			},
		],
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
