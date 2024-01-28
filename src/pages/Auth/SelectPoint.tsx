import { FC, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import Button from '../../components/Button/Button'
import MessageBox from '../../components/MessageBox/MessageBox'
import { dateFormater } from '../../helper/date-formater.helper'
import { removeTokenFromLocalStorage } from '../../helper/localstorage.helper'
import { AuthService } from '../../services/AuthService'
import { useAppSelector } from '../../store/hooks'
import { logoutBarista, setPointData } from '../../store/slice/barista.slice'

const SelectPoint: FC = () => {
	const [selectedPointID, setSelectedPointID] = useState<number>(-1)
	const [message, setMessage] = useState<string>('')
	const points = useAppSelector(state => state.barista.barista?.points)
	const dispatch = useDispatch()
	const navigate = useNavigate()

	useEffect(() => {
		if (!points?.length) {
			dispatch(logoutBarista())
		}
	}, [points])

	const onChangeSelectionHandler = (
		e: React.ChangeEvent<HTMLSelectElement>
	) => {
		if (e.target.value === 'DEFAULT') setSelectedPointID(-1)
		else setSelectedPointID(+e.target.value)
	}

	const selectPointHandler = async (e: React.FormEvent<HTMLFormElement>) => {
		try {
			e.preventDefault()
			if (selectedPointID == -1) {
				toast.error('First you need to select one of the points')
				return
			}
			const data = await AuthService.startBaristaShiftOnPoint(selectedPointID)
			console.log(data)
			if (data) {
				setMessage(`${data.status}. Time: ${dateFormater(data.time)}`)
				const pointData = await AuthService.getBaristaPoint(selectedPointID)
				if (pointData) {
					dispatch(setPointData(pointData))
				}
			}
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
		} catch (err: any) {
			const error = err.response?.data.message
			toast.error(error.toString())
		}
	}

	return (
		<>
			{!message.length ? (
				<>
					{points?.length ? (
						<>
							<h2 className='text-white text-[40px] font-bold leading-[50px] mb-[50px] border-b-4 text-center uppercase'>
								SELECT POINT
							</h2>
							<form
								className='flex flex-col w-2/3 items-center'
								onSubmit={selectPointHandler}
							>
								<label
									htmlFor='selectPoint'
									className='text-white font-roboto w-full text-left px-2 py-2 text-lg font-bold'
								>
									Select point for starting the shift:
								</label>
								<select
									id='selectPoint'
									className='p-3 rounded-xl text-xl  w-full font-roboto hover:cursor-pointer'
									onChange={onChangeSelectionHandler}
									required
									defaultValue={'DEFAULT'}
								>
									<option value={'DEFAULT'}>Select point...</option>
									{points.map(item => {
										return (
											<option key={item.id} value={item.id}>
												{item.name}
											</option>
										)
									})}
								</select>
								<Button
									title='Select point'
									type='submit'
									className='mt-20 uppercase w-full'
								/>
							</form>
						</>
					) : (
						<MessageBox
							message={
								'You have not been set on any point. Please, contact to your administrator for doing this.'
							}
						/>
					)}
				</>
			) : (
				<MessageBox message={message} linkData={{ title: '', to: '' }} />
			)}
			{!message.length && points?.length ? (
				<Button
					title='Back to login'
					className='mt-2 uppercase w-2/3'
					onClick={() => {
						removeTokenFromLocalStorage()
						dispatch(logoutBarista())
						navigate('/auth/login')
					}}
				/>
			) : (
				''
			)}
		</>
	)
}

export default SelectPoint
