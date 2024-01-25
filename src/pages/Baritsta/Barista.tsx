import { FC } from 'react'
import { useAppSelector } from '../../store/hooks'

const Barista: FC = () => {
	const email = useAppSelector(state => state.barista.barista?.email)
	return <div>{email}</div>
}

export default Barista
