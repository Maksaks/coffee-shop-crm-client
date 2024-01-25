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
				'bg-zinc-800 text-white p-4 rounded-xl text-2xl font-bold'
			)}
		>
			{title}
		</button>
	)
}

export default Button
