import { FC } from 'react'
import { useAppSelector } from '../../store/hooks'

const Admin: FC = () => {
	const email = useAppSelector(state => state.admin.admin?.email)
	return <div>{email}</div>
}

export default Admin
