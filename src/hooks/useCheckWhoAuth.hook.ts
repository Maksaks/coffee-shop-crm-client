import { useAppSelector } from '../store/hooks'

export const useCheckWhoAuth = (): string | undefined => {
	const isBaristaAuth = useAppSelector(state => state.barista.IsAuth)
	const isAdminAuth = useAppSelector(state => state.admin.IsAuth)
	if (isAdminAuth) {
		return 'admin'
	}
	if (isBaristaAuth) {
		return 'barista'
	}
}
