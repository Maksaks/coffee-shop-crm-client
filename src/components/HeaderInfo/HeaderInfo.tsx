import { CircleUserRound, LogOut } from 'lucide-react'
import { FC } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { dateFormater } from '../../helper/date-formater.helper'
import { useCheckWhoAuth } from '../../hooks/useCheckWhoAuth.hook'
import { AuthService } from '../../services/AuthService'
import { useAppSelector } from '../../store/hooks'
import { logoutAdmin } from '../../store/slice/admin.slice'
import { logoutBarista } from '../../store/slice/barista.slice'
import { IAdminData } from '../../store/types/IAdminData'
import { IBaristaData } from '../../store/types/IBaristaData'
import Button from '../Button/Button'

const HeaderInfo: FC = () => {
	const whoAuth = useCheckWhoAuth()
	const barista = useAppSelector(state => state.barista)
	const admin = useAppSelector(state => state.admin)
	let entity: IBaristaData | IAdminData | null = null
	if (whoAuth === 'admin') {
		entity = admin.admin
	} else if (whoAuth === 'barista') {
		entity = barista.barista
	}
	const navigate = useNavigate()
	const dispatch = useDispatch()

	const logoutHandler = async () => {
		if (whoAuth === 'admin') {
			dispatch(logoutAdmin())
			toast.success('Logout successfully')
			navigate('/auth/login')
		} else if (whoAuth === 'barista') {
			try {
				if (barista.point) {
					const data = await AuthService.endBaristaShiftOnPoint(
						barista?.point?.id
					)
					toast.success(
						`Logout successfully!Your salary for this shift:${data.baristaSalary}. Time: ${dateFormater(data.time)}`
					)
				}
				dispatch(logoutBarista())
				navigate('/auth/login')
				// eslint-disable-next-line @typescript-eslint/no-explicit-any
			} catch (err: any) {
				const error = err.response?.data.message
				toast.error(error.toString())
			}
		}
	}

	return (
		<div className='flex flex-row max-w-[15%] text-base gap-2 h-full items-center'>
			<div className='grid grid-cols-3 border-r-[1px] pr-2 items-center w-full h-full py-2'>
				{whoAuth === 'barista' ? (
					<>
						<p className='text-white/50'>Barista:</p>
						<p className='col-span-2 font-bold'>
							{entity?.surname} {entity?.name}
						</p>
						<p className='text-white/50'>Point:</p>
						<p className='col-span-2'>
							{barista.point ? barista.point.name : 'No point'}
						</p>
					</>
				) : (
					<>
						<p className='text-white/50 m-0'>Admin: </p>
						<p className='col-span-2'>
							{entity?.surname} {entity?.name}
						</p>
					</>
				)}
			</div>
			<Button
				className='h-[70%] w-[20%] p-1'
				icon={<CircleUserRound size={40} />}
				onClick={() => {
					navigate(`/${whoAuth}`)
				}}
			/>
			<Button
				className='h-[70%] w-[25%] p-1'
				icon={<LogOut size={40} />}
				onClick={logoutHandler}
			/>
		</div>
	)
}

export default HeaderInfo
