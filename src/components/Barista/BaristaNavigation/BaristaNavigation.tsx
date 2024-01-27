import { FC } from 'react'
import { NavLink } from 'react-router-dom'

const BaristaNavigation: FC = () => {
	return (
		<nav className='flex flex-row gap-5'>
			<NavLink to={'ingredients'}>Ingredients</NavLink>
			<NavLink to={'createOrder'}>Create Order</NavLink>
			<NavLink to={'orders'}>Orders</NavLink>
			<NavLink to={'point'}>Point Info</NavLink>
		</nav>
	)
}

export default BaristaNavigation
