import { useEffect } from 'react'
import { RouterProvider } from 'react-router-dom'
import { toast } from 'react-toastify'
import { getTokenFromLocalStorage } from './helper/localstorage.helper'
import { router } from './router/router'
import { AuthService } from './services/AuthService'
import { useAppDispatch } from './store/hooks'
import { loginAdmin } from './store/slice/admin.slice'
import { loginBarista, setPointData } from './store/slice/barista.slice'
import { IAdminData } from './store/types/IAdminData'
import { IBaristaData } from './store/types/IBaristaData'

function App() {
	const dispatch = useAppDispatch()

	const checkAuth = async () => {
		const token = getTokenFromLocalStorage()
		try {
			if (token) {
				const data = await AuthService.getProfileBarista()
				console.log(data)
				if (data?.role == 'barista') {
					const barista = data as IBaristaData
					if (barista) {
						dispatch(loginBarista(barista))
						if (barista.lastPoint) {
							dispatch(setPointData(barista.lastPoint))
						}
					}
				} else if (data?.role == 'admin') {
					const admin = data as IAdminData
					if (admin) {
						dispatch(loginAdmin(admin))
					}
				}
			}
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
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
