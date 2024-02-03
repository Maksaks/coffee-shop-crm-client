import { FC } from 'react'
import { NavLink } from 'react-router-dom'

const AdminNavigation: FC = () => {
	return (
		<nav className='flex flex-row gap-5 font-roboto text-2xl font-bold uppercase h-full'>
			<NavLink
				className={({ isActive, isPending }) =>
					isPending
						? 'pending'
						: isActive
							? 'flex items-center justify-center px-10 hover:bg-zinc-600/60  underline-offset-8 underline transition-transform transform hover:scale-110 hover:shadow-lg'
							: 'flex items-center justify-center px-10 hover:bg-zinc-600/60  transition-transform hover:underline underline-offset-8 transform hover:scale-110 hover:shadow-lg'
				}
				to={'baristas'}
			>
				Baristas
			</NavLink>
			<NavLink
				className={({ isActive, isPending }) =>
					isPending
						? 'pending'
						: isActive
							? 'flex items-center justify-center px-10 hover:bg-zinc-600/60  underline-offset-8 underline transition-transform transform hover:scale-110 hover:shadow-lg'
							: 'flex items-center justify-center px-10 hover:bg-zinc-600/60  transition-transform hover:underline underline-offset-8 transform hover:scale-110 hover:shadow-lg'
				}
				to={'categories'}
			>
				Categories
			</NavLink>
			<NavLink
				className={({ isActive, isPending }) =>
					isPending
						? 'pending'
						: isActive
							? 'flex items-center justify-center px-10 hover:bg-zinc-600/60  underline-offset-8 underline transition-transform transform hover:scale-110 hover:shadow-lg'
							: 'flex items-center justify-center px-10 hover:bg-zinc-600/60  transition-transform hover:underline underline-offset-8 transform hover:scale-110 hover:shadow-lg'
				}
				to={'discounts'}
			>
				Discounts
			</NavLink>
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
							? 'flex items-center justify-center px-10 hover:bg-zinc-600/60  underline-offset-8 underline transition-transform transform hover:scale-110 hover:shadow-lg'
							: 'flex items-center justify-center px-10 hover:bg-zinc-600/60  transition-transform hover:underline underline-offset-8 transform hover:scale-110 hover:shadow-lg'
				}
				to={'positions'}
			>
				Menu Positions
			</NavLink>
			<NavLink
				className={({ isActive, isPending }) =>
					isPending
						? 'pending'
						: isActive
							? 'flex items-center justify-center px-10 hover:bg-zinc-600/60  underline-offset-8 underline transition-transform transform hover:scale-110 hover:shadow-lg'
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
							? 'flex items-center justify-center px-10 hover:bg-zinc-600/60  underline-offset-8 underline transition-transform transform hover:scale-110 hover:shadow-lg'
							: 'flex items-center justify-center px-10 hover:bg-zinc-600/60  transition-transform hover:underline underline-offset-8 transform hover:scale-110 hover:shadow-lg'
				}
				to={'points'}
			>
				Points
			</NavLink>
			<NavLink
				className={({ isActive, isPending }) =>
					isPending
						? 'pending'
						: isActive
							? 'flex items-center justify-center px-10 hover:bg-zinc-600/60  underline-offset-8 underline transition-transform transform hover:scale-110 hover:shadow-lg'
							: 'flex items-center justify-center px-10 hover:bg-zinc-600/60  transition-transform hover:underline underline-offset-8 transform hover:scale-110 hover:shadow-lg'
				}
				to={'shifts'}
			>
				Shifts
			</NavLink>
			<NavLink
				className={({ isActive, isPending }) =>
					isPending
						? 'pending'
						: isActive
							? 'flex items-center justify-center px-10 hover:bg-zinc-600/60  underline-offset-8 underline transition-transform transform hover:scale-110 hover:shadow-lg'
							: 'flex items-center justify-center px-10 hover:bg-zinc-600/60  transition-transform hover:underline underline-offset-8 transform hover:scale-110 hover:shadow-lg'
				}
				to={'statistics/popularity'}
			>
				Statistics
			</NavLink>
		</nav>
	)
}

export default AdminNavigation
