import { FC } from 'react'
import { NavLink } from 'react-router-dom'

const BaristaNavigation: FC = () => {
	return (
		<nav className='flex flex-row gap-20 font-roboto text-xl uppercase h-full'>
			<NavLink
				className={({ isActive, isPending }) =>
					isPending
						? 'pending'
						: isActive
							? 'flex items-center justify-center px-10 hover:bg-zinc-600/60 underline underline-offset-8 hover:border-x-2'
							: 'flex items-center justify-center px-10 hover:bg-zinc-600/60 hover:border-x-2'
				}
				to={'ingredients'}
			>
				Ingredients
			</NavLink>
			<NavLink
				className={({ isActive, isPending }) =>
					isPending
						? 'pending'
						: isActive
							? 'flex items-center justify-center px-10 hover:bg-zinc-600/60 underline underline-offset-8 hover:border-x-2'
							: 'flex items-center justify-center px-10 hover:bg-zinc-600/60 hover:border-x-2'
				}
				to={'createOrder'}
			>
				Create Order
			</NavLink>
			<NavLink
				className={({ isActive, isPending }) =>
					isPending
						? 'pending'
						: isActive
							? 'flex items-center justify-center px-10 hover:bg-zinc-600/60 underline underline-offset-8 hover:border-x-2'
							: 'flex items-center justify-center px-10 hover:bg-zinc-600/60 hover:border-x-2'
				}
				to={'orders'}
			>
				Orders
			</NavLink>
			<NavLink
				className={({ isActive, isPending }) =>
					isPending
						? 'pending'
						: isActive
							? 'flex items-center justify-center px-10 hover:bg-zinc-600/60 underline underline-offset-8 hover:border-x-2'
							: 'flex items-center justify-center px-10 hover:bg-zinc-600/60 hover:border-x-2'
				}
				to={'point'}
			>
				Point Info
			</NavLink>
		</nav>
	)
}

export default BaristaNavigation
