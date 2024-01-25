import { FC, InputHTMLAttributes } from 'react'

interface Props extends InputHTMLAttributes<HTMLInputElement> {
	labelName: string
}

const Input: FC<Props> = ({ labelName, ...props }) => {
	return (
		<label className='flex flex-col font-bold text-xl gap-1 text-white'>
			{labelName}
			<input
				className='p-4 rounded-xl border-zinc-950 border-2 text-white bg-zinc-700 placeholder:text-zinc-500 focus:border-zinc-300'
				{...props}
			/>
		</label>
	)
}

export default Input
