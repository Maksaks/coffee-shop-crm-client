import { FC } from 'react'
import { SelectedPosition } from '../../../pages/Baritsta/CreateOrder'
import OrderPositionItem from '../OrderPositionItem/OrderPositionItem'

interface Props {
	selectedPositions: SelectedPosition[]
	setSelectedPositions: (position: SelectedPosition[]) => void
}

const OrderPositionList: FC<Props> = ({
	selectedPositions,
	setSelectedPositions,
}) => {
	const removePositionHandler = (position: SelectedPosition) => {
		setSelectedPositions(
			selectedPositions.filter(item => item.position.id != position.position.id)
		)
	}

	const updateAmountPositionHandler = (position: SelectedPosition) => {
		const positionID = selectedPositions.indexOf(position)
		const newArray = [...selectedPositions]
		newArray[positionID] = position

		setSelectedPositions(newArray)
	}

	return (
		<div className='w-[95%] mx-auto max-h-[90%] flex flex-col items-center gap-5 p-5 overflow-auto'>
			{selectedPositions.map((item, indx) => {
				return (
					<OrderPositionItem
						removePosition={removePositionHandler}
						key={indx}
						orderPosition={item}
						updatePosition={updateAmountPositionHandler}
					/>
				)
			})}
		</div>
	)
}

export default OrderPositionList
