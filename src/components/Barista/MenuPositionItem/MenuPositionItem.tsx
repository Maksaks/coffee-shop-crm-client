import { ChefHat, Coffee, CupSoda, GlassWater, Sandwich } from 'lucide-react'
import { FC } from 'react'
import { useDispatch } from 'react-redux'
import { addToOrder } from '../../../store/slice/order.slice'
import { IMenuPositionWithRecipeData } from '../../../types/IMenuPositionWithRecipe'

interface Props {
	menuPosition: IMenuPositionWithRecipeData
}

const CategoryIconSelector = (category: string) => {
	if (category.toLowerCase().includes('ice')) {
		return <GlassWater className='w-[60%] h-[60%] fill-blue-300' />
	} else if (category.toLowerCase().includes('drinks')) {
		return <GlassWater className='w-[60%] h-[60%] fill-red-600' />
	} else if (category.toLowerCase().includes('juice')) {
		return <CupSoda className='w-[60%] h-[60%] fill-orange-500' />
	} else if (
		category.toLowerCase().includes('tea') ||
		category.toLowerCase().includes('coffee') ||
		category.toLowerCase().includes('hot')
	) {
		return (
			<Coffee
				className={`w-[60%] h-[60%] ${category.toLowerCase().includes('tea') ? 'fill-amber-800' : 'fill-black'}`}
			/>
		)
	} else if (category.toLowerCase().includes('sandwich')) {
		return <Sandwich className='w-[60%] h-[60%]' />
	} else {
		return <ChefHat className='w-[60%] h-[60%]' />
	}
}

const MenuPositionItem: FC<Props> = ({ menuPosition }) => {
	const dispatch = useDispatch()
	return (
		<button
			className='w-full h-[20vh] border-2 rounded-xl bg-zinc-600 flex flex-col items-center justify-center hover:bg-zinc-500 relative'
			onClick={() => dispatch(addToOrder(menuPosition))}
		>
			{menuPosition.discount &&
				new Date(menuPosition.discount.endAt) > new Date() && (
					<span className='absolute top-1 right-1 border-2 rounded-full p-1 bg-zinc-200 text-black  text-[1.5vh]'>
						{menuPosition.discount?.amount} %
					</span>
				)}
			<span
				className={`absolute font-bold  text-[1.5vh] top-1 left-1 border-2 rounded-full p-1 ${menuPosition.discount && new Date(menuPosition.discount.endAt) > new Date() ? 'bg-red-600 text-white border-black' : 'bg-zinc-200 text-black'}`}
			>
				{menuPosition.discount &&
				new Date(menuPosition.discount.endAt) > new Date() ? (
					<>
						<span className='line-through mr-2 text-[1.5vh]'>
							{menuPosition.price}
						</span>
						<span className='text-[1.5vh]'>
							{Math.round(
								(menuPosition.price * (100 - menuPosition.discount.amount)) /
									100
							)}{' '}
							UAH
						</span>
					</>
				) : (
					<>{menuPosition.price} UAH</>
				)}
			</span>
			<label className='h-[70%] w-full flex items-end justify-center border-b-2  hover:cursor-pointer'>
				{CategoryIconSelector(menuPosition.category.title)}
			</label>
			<div className='h-[30%] w-full flex flex-col items-center justify-center  uppercase text-[2vh] font-bold'>
				{menuPosition.name}
			</div>
		</button>
	)
}

export default MenuPositionItem
