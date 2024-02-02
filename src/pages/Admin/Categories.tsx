import { motion } from 'framer-motion'
import { FC, useEffect, useState } from 'react'
import { useLoaderData } from 'react-router-dom'
import { ICategoryData } from '../../types/ICategory'
import { ICategoriesLoader } from './loaders/categoriesLoader'

const Categories: FC = () => {
	const { categories } = useLoaderData() as ICategoriesLoader
	const [searchedCategories, setSearchedCategories] =
		useState<ICategoryData[]>()

	useEffect(() => {
		setSearchedCategories(categories)
	}, [])

	const searchHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (!e.target.value.length) {
			setSearchedCategories(categories)
			return
		}
		setSearchedCategories(
			categories?.filter(item => {
				return item.title.toLowerCase().includes(e.target.value.toLowerCase())
			})
		)
	}

	return (
		<motion.div
			initial={{ opacity: 0, y: -20 }}
			animate={{ opacity: 1, y: 0 }}
			exit={{ opacity: 0, y: -20 }}
			transition={{ duration: 0.7 }}
			className='w-[40%] h-[1000px] mt-20 mx-auto bg-zinc-500 text-white font-roboto flex flex-col gap-2 rounded-2xl shadow-2xl'
		>
			<h2 className='w-full text-center p-3 border-b-4 text-2xl font-bold rounded-t-2xl bg-zinc-700'>
				CATEGORIES
			</h2>
			<input
				className='w-[90%] py-2 px-5 mx-auto rounded-2xl text-black text-xl'
				placeholder='Search category by name...'
				onChange={searchHandler}
			/>
			<div className='w-[90%] p-3 h-[80%] overflow-auto bg-zinc-400 mx-auto rounded-2xl shadow-xl flex flex-col items-center gap-2'>
				{searchedCategories?.length ? (
					searchedCategories.map(item => {
						return (
							<div className='w-[90%] bg-zinc-600/90 h-[50px] rounded-2xl'></div>
						)
					})
				) : (
					<h2 className='uppercase text-black/70 font-bold text-xl w-full text-center'>
						Categories were not found
					</h2>
				)}
			</div>
		</motion.div>
	)
}

export default Categories
