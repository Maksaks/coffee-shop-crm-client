import { FC } from 'react'
import { NavLink } from 'react-router-dom'

const AdminNavigation: FC = () => {
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
				to={''}
			>
				No
			</NavLink>
		</nav>
	)
}

export default AdminNavigation
