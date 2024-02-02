import cn from 'classnames'
import React, { FC } from 'react'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	title?: string
	icon?: JSX.Element
}

const Button: FC<ButtonProps> = ({ title, className, icon, ...props }) => {
	return (
		<button
			title={title}
			{...props}
			className={cn(
				className,
				`bg-zinc-800 text-white ${!icon ? 'p-4 ' : ''}rounded-xl text-2xl font-bold hover:bg-zinc-300 hover:text-black`
			)}
		>
			{!icon ? title : icon}
		</button>
	)
}

export default Button
