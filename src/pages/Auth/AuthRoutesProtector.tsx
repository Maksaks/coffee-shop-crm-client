import { FC, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCheckWhoAuth } from '../../hooks/useCheckWhoAuth.hook'

interface IProps {
	children: JSX.Element
}

const AuthRoutesProtector: FC<IProps> = ({ children }) => {
	const whoAuth = useCheckWhoAuth()
	const navigate = useNavigate()
	useEffect(() => {
		if (whoAuth) {
			navigate(`/${whoAuth}`)
		}
	}, [])
	return <>{children}</>
}

export default AuthRoutesProtector
