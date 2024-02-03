import { createBrowserRouter } from 'react-router-dom'
import AdminLayout from '../layouts/admin/AdminLayout'
import BaristaLayout from '../layouts/barista/BaristaLayout'
import Admin from '../pages/Admin/Admin'
import Baristas from '../pages/Admin/Baristas'
import Categories from '../pages/Admin/Categories'
import Discounts from '../pages/Admin/Discounts'
import Ingredients from '../pages/Admin/Ingredients'
import MenuPositions from '../pages/Admin/MenuPositions'
import Orders from '../pages/Admin/Orders'
import Points from '../pages/Admin/Points'
import RefreshPage from '../pages/Admin/RefreshPage'
import Shifts from '../pages/Admin/Shifts'
import Statistics from '../pages/Admin/Statistics'
import AllBarista from '../pages/Admin/Statistics/AllBarista'
import BaristaSalaryShifts from '../pages/Admin/Statistics/BaristaSalaryShifts'
import CategoriesIncomes from '../pages/Admin/Statistics/CategoriesIncomes'
import Common from '../pages/Admin/Statistics/Common'
import Consumption from '../pages/Admin/Statistics/Consumption'
import Expenses from '../pages/Admin/Statistics/Expenses'
import Popularity from '../pages/Admin/Statistics/Popularity'
import { allBaristasSalaryLoader } from '../pages/Admin/loaders/allBaristasSalaryLoader'
import { allCategoriesLoader } from '../pages/Admin/loaders/allCategoriesLoader'
import { baristasLoader } from '../pages/Admin/loaders/baristasLoader'
import { categoriesLoader } from '../pages/Admin/loaders/categoriesLoader'
import { commonLoader } from '../pages/Admin/loaders/commonLoader'
import { discountsLoader } from '../pages/Admin/loaders/discountsLoader'
import { ingredientsWithPointsLoader } from '../pages/Admin/loaders/ingredientsWithPointsLoader'
import { ordersPointsLoader } from '../pages/Admin/loaders/ordersLoader'
import { pointsLoader } from '../pages/Admin/loaders/pointsLoader'
import { pointsShortLoader } from '../pages/Admin/loaders/pointsShortLoader'
import { positionsLoader } from '../pages/Admin/loaders/positionsLoader'
import { shiftsLoader } from '../pages/Admin/loaders/shiftsLoader'
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
import { ordersLoader } from '../pages/Baritsta/loaders/ordersLoader'
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
				loader: ordersLoader,
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
			{
				path: 'baristas',
				element: <Baristas />,
				loader: baristasLoader,
			},
			{
				path: 'categories',
				element: <Categories />,
				loader: categoriesLoader,
			},
			{
				path: 'discounts',
				element: <Discounts />,
				loader: discountsLoader,
			},
			{
				path: 'ingredients',
				element: <Ingredients />,
				loader: ingredientsWithPointsLoader,
			},
			{
				path: 'positions',
				element: <MenuPositions />,
				loader: positionsLoader,
			},
			{
				path: 'orders',
				element: <Orders />,
				loader: ordersPointsLoader,
			},
			{
				path: 'points',
				element: <Points />,
				loader: pointsLoader,
			},
			{
				path: 'shifts',
				element: <Shifts />,
				loader: shiftsLoader,
			},
			{
				path: 'statistics',
				element: <Statistics />,
				children: [
					{
						path: 'popularity',
						element: <Popularity />,
						loader: pointsShortLoader,
					},
					{
						path: 'expenses',
						element: <Expenses />,
						loader: pointsShortLoader,
					},
					{ path: 'common', element: <Common />, loader: commonLoader },
					{
						path: 'barista',
						element: <BaristaSalaryShifts />,
						loader: shiftsLoader,
					},
					{
						path: 'allBarista',
						element: <AllBarista />,
						loader: allBaristasSalaryLoader,
					},
					{
						path: 'consumption',
						element: <Consumption />,
						loader: pointsShortLoader,
					},
					{
						path: 'categories',
						element: <CategoriesIncomes />,
						loader: allCategoriesLoader,
					},
				],
			},
			{
				path: 'refresh',
				element: <RefreshPage />,
			},
		],
	},
	{
		index: true,
		element: <ErrorPage />,
	},
])
