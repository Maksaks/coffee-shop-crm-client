import { FC } from 'react'
import { NavLink } from 'react-router-dom'

const BaristaNavigation: FC = () => {
	return (
		<nav className='flex flex-row gap-20 font-roboto text-2xl font-bold uppercase h-full'>
			<NavLink
				className={({ isActive, isPending }) =>
					isPending
						? 'pending'
						: isActive
							? 'flex items-center justify-center px-10 hover:bg-zinc-600/60  underline-offset-8 underline transition-transform transform hover:scale-110 hover:shadow-lg'
							: 'flex items-center justify-center px-10 hover:bg-zinc-600/60  transition-transform hover:underline underline-offset-8 transform hover:scale-110 hover:shadow-lg'
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
							? 'flex items-center justify-center px-10 hover:bg-zinc-600/60 underline underline-offset-8  transition-transform transform hover:scale-110 hover:shadow-lg'
							: 'flex items-center justify-center px-10 hover:bg-zinc-600/60  transition-transform hover:underline underline-offset-8 transform hover:scale-110 hover:shadow-lg'
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
							? 'flex items-center justify-center px-10 hover:bg-zinc-600/60 underline underline-offset-8  transition-transform transform hover:scale-110 hover:shadow-lg'
							: 'flex items-center justify-center px-10 hover:bg-zinc-600/60  transition-transform hover:underline underline-offset-8 transform hover:scale-110 hover:shadow-lg'
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
							? 'flex items-center justify-center px-10 hover:bg-zinc-600/60 underline underline-offset-8  transition-transform transform hover:scale-110 hover:shadow-lg'
							: 'flex items-center justify-center px-10 hover:bg-zinc-600/60  transition-transform hover:underline underline-offset-8 transform hover:scale-110 hover:shadow-lg'
				}
				to={'point'}
			>
				Point Info
			</NavLink>
			<NavLink
				className={({ isActive, isPending }) =>
					isPending
						? 'pending'
						: isActive
							? 'flex items-center justify-center px-10 hover:bg-zinc-600/60 underline underline-offset-8  transition-transform transform hover:scale-110 hover:shadow-lg'
							: 'flex items-center justify-center px-10 hover:bg-zinc-600/60  transition-transform hover:underline underline-offset-8 transform hover:scale-110 hover:shadow-lg'
				}
				to={'recipes'}
			>
				Recipes
			</NavLink>
		</nav>
	)
}

export default BaristaNavigation
