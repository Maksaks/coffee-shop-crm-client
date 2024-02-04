import { FC } from 'react'
import { NavLink, Outlet } from 'react-router-dom'

const Statistics: FC = () => {
	return (
		<div className='w-full h-full flex flex-row'>
			<nav className='w-[12vw] p-[0.5vh] pt-[2vh] h-full flex flex-col gap-[2vh] text-[1.8vh]  bg-zinc-700 text-white overflow-auto'>
				<NavLink
					to={'popularity'}
					className={({ isActive, isPending }) =>
						isPending
							? ''
							: isActive
								? 'text-center w-full rounded-2xl p-[1vh] font-bold bg-zinc-300 text-black'
								: 'text-center w-full rounded-2xl bg-zinc-900 p-[1vh] font-bold hover:bg-zinc-300 hover:text-black'
					}
				>
					POPULARITY POSITIONS
				</NavLink>
				<NavLink
					to={'expenses'}
					className={({ isActive, isPending }) =>
						isPending
							? ''
							: isActive
								? 'text-center w-full rounded-2xl p-[1vh] font-bold bg-zinc-300 text-black'
								: 'text-center w-full rounded-2xl bg-zinc-900 p-[1vh] font-bold hover:bg-zinc-300 hover:text-black'
					}
				>
					EXPENSES AND INCOMES BY POINT
				</NavLink>
				<NavLink
					to={'common'}
					className={({ isActive, isPending }) =>
						isPending
							? ''
							: isActive
								? 'text-center w-full rounded-2xl p-[1vh] font-bold bg-zinc-300 text-black'
								: 'text-center w-full rounded-2xl bg-zinc-900 p-[1vh] font-bold hover:bg-zinc-300 hover:text-black'
					}
				>
					COMMON EXPENSES AND INCOMES
				</NavLink>
				<NavLink
					to={'barista'}
					className={({ isActive, isPending }) =>
						isPending
							? ''
							: isActive
								? 'text-center w-full rounded-2xl p-[1vh] font-bold bg-zinc-300 text-black'
								: 'text-center w-full rounded-2xl bg-zinc-900 p-[1vh] font-bold hover:bg-zinc-300 hover:text-black'
					}
				>
					BARISTA SALARY AND SHIFTS
				</NavLink>
				<NavLink
					to={'allBarista'}
					className={({ isActive, isPending }) =>
						isPending
							? ''
							: isActive
								? 'text-center w-full rounded-2xl p-[1vh] font-bold bg-zinc-300 text-black'
								: 'text-center w-full rounded-2xl bg-zinc-900 p-[1vh] font-bold hover:bg-zinc-300 hover:text-black'
					}
				>
					ALL BARISTAS SALARY AND SHIFTS
				</NavLink>
				<NavLink
					to={'consumption'}
					className={({ isActive, isPending }) =>
						isPending
							? ''
							: isActive
								? 'text-center w-full rounded-2xl p-[1vh] font-bold bg-zinc-300 text-black'
								: 'text-center w-full rounded-2xl bg-zinc-900 p-[1vh] font-bold hover:bg-zinc-300 hover:text-black'
					}
				>
					CONSUMPTION OF INGREDIENTS BY POINT
				</NavLink>
				<NavLink
					to={'categories'}
					className={({ isActive, isPending }) =>
						isPending
							? ''
							: isActive
								? 'text-center w-full rounded-2xl p-[1vh] font-bold bg-zinc-300 text-black'
								: 'text-center w-full rounded-2xl bg-zinc-900 p-[1vh] font-bold hover:bg-zinc-300 hover:text-black'
					}
				>
					CATEGORIES ORDERS AND INCOMES
				</NavLink>
			</nav>
			<div className='w-[88%] h-full bg-zinc-500 p-16'>
				<Outlet />
			</div>
		</div>
	)
}

export default Statistics
