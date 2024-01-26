import { FC } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import Button from '../../components/Button/Button'
import { useAppSelector } from '../../store/hooks'
import { logoutAdmin } from '../../store/slice/admin.slice'

const Admin: FC = () => {
	const email = useAppSelector(state => state.admin.admin?.email)
	const navigate = useNavigate()
	const dispatch = useDispatch()
	return (
		<div>
			{email}
			<Button
				title='Log out'
				onClick={() => {
					dispatch(logoutAdmin())
					navigate('/auth/login')
					toast.success('Logout')
				}}
			/>
		</div>
	)
}

export default Admin
