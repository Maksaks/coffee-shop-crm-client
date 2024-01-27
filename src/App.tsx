import { useEffect } from 'react'
import { RouterProvider } from 'react-router-dom'
import { toast } from 'react-toastify'
import { getTokenFromLocalStorage } from './helper/localstorage.helper'
import { router } from './router/router'
import { AuthService } from './services/AuthService'
import { useAppDispatch } from './store/hooks'
import { loginAdmin } from './store/slice/admin.slice'
import { loginBarista, setPointData } from './store/slice/barista.slice'

function App() {
	const dispatch = useAppDispatch()

	const checkAuth = async () => {
		const token = getTokenFromLocalStorage()
		try {
			if (token) {
				const data = await AuthService.getRole()
				if (data == 'barista') {
					const barista = await AuthService.getProfileBarista()
					if (barista) {
						dispatch(loginBarista(barista))
						const pointID = await AuthService.getLastShiftPoint()
						if (pointID != '-1') {
							const point = await AuthService.getBaristaPoint(+pointID)
							dispatch(setPointData(point))
						}
					}
				} else if (data == 'admin') {
					const admin = await AuthService.getProfileAdmin()
					if (admin) {
						dispatch(loginAdmin(admin))
					}
				}
			}
		} catch (err: any) {
			const error = err.response?.data.message
			toast.error(error ? error.toString() : 'Uncaught error')
		}
	}
	useEffect(() => {
		checkAuth()
	}, [])
	return <RouterProvider router={router} />
}

export default App
