import { FC } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import Button from '../../components/Button/Button'
import { useAppSelector } from '../../store/hooks'
import { logoutBarista } from '../../store/slice/barista.slice'

const Barista: FC = () => {
	const email = useAppSelector(state => state.barista.barista?.email)
	const navigate = useNavigate()
	const dispatch = useDispatch()
	return (
		<div>
			<Button
				title='Log out'
				onClick={() => {
					dispatch(logoutBarista())
					navigate('/auth/login')
					toast.success('Logout')
				}}
			/>
			{email}
		</div>
	)
}

export default Barista
