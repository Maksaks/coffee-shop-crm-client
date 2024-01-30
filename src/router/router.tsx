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
import SelectPoint from '../pages/Auth/SelectPoint'
import AboutMe from '../pages/Baritsta/AboutMe'
import CreateOrder from '../pages/Baritsta/CreateOrder'
import CurrentPointInfo from '../pages/Baritsta/CurrentPointInfo'
import IngredientsInfo from '../pages/Baritsta/IngredientsInfo'
import OrdersInfo from '../pages/Baritsta/OrdersInfo'
import Recipes from '../pages/Baritsta/Recipes'
import { aboutMeLoader } from '../pages/Baritsta/loaders/aboutMeLoader'
import { currentPointInfoLoader } from '../pages/Baritsta/loaders/currentPointInfoLoader'
import { ingredientsLoader } from '../pages/Baritsta/loaders/ingredientsLoader'
import { menuLoader } from '../pages/Baritsta/loaders/menuLoader'
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
			{
				path: 'select',
				element: <SelectPoint />,
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
				element: <AboutMe />,
				loader: aboutMeLoader,
			},
			{
				path: 'ingredients',
				element: <IngredientsInfo />,
				loader: ingredientsLoader,
			},
			{
				path: 'createOrder',
				element: <CreateOrder />,
				loader: menuLoader,
			},
			{
				path: 'orders',
				element: <OrdersInfo />,
			},
			{
				path: 'point',
				element: <CurrentPointInfo />,
				loader: currentPointInfoLoader,
			},
			{
				path: 'recipes',
				element: <Recipes />,
				loader: menuLoader,
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
