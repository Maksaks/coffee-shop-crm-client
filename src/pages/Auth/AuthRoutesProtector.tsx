import { FC, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCheckWhoAuth } from '../../hooks/useCheckWhoAuth.hook'
import { useAppSelector } from '../../store/hooks'

interface IProps {
	children: JSX.Element
}

const AuthRoutesProtector: FC<IProps> = ({ children }) => {
	const whoAuth = useCheckWhoAuth()
	const navigate = useNavigate()

	const isBaristaSet = useAppSelector(state => state.barista.barista)
	const isPointNotSet = useAppSelector(state => state.barista.point)

	useEffect(() => {
		if (whoAuth) {
			navigate(`/${whoAuth}`)
		}
		if (isBaristaSet && !isPointNotSet) {
			navigate('/auth/select')
		}
	}, [whoAuth])
	return <>{children}</>
}

export default AuthRoutesProtector
