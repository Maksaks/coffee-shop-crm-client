import cn from 'classnames'
import React, { FC } from 'react'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	title: string
}

const Button: FC<ButtonProps> = ({ title, className, ...props }) => {
	return (
		<button
			{...props}
			className={cn(
				className,
				'bg-zinc-800 text-white p-4 rounded-xl text-2xl font-bold hover:bg-zinc-300 hover:text-black'
			)}
		>
			{title}
		</button>
	)
}

export default Button
