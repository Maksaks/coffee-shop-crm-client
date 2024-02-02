import { motion } from 'framer-motion'
import { Pencil, Plus, Trash2 } from 'lucide-react'
import { FC, useEffect, useState } from 'react'
import { useLoaderData, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import CreateCategoryModal from '../../components/Modals/CreateCategoryModal'
import UpdateCategoryModal from '../../components/Modals/UpdateCategoryModal'
import { CategoryService } from '../../services/Admin/CategoryService'
import { ICategoryData } from '../../types/ICategory'
import { ICategoriesLoader } from './loaders/categoriesLoader'

const Categories: FC = () => {
	const navigate = useNavigate()
	const { categories } = useLoaderData() as ICategoriesLoader
	const [searchedCategories, setSearchedCategories] =
		useState<ICategoryData[]>()
	const [selectedCategory, setSelectedCategory] = useState<ICategoryData>()
	const [isCreatingModalVisible, setIsCreatingModalVisible] = useState(false)
	const [isUpdatingModalVisible, setIsUpdatingModalVisible] = useState(false)

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

	const removeCategoryHandler = async (item: ICategoryData) => {
		try {
			await CategoryService.deleteCategory(item.id)
			toast.success(`Category ${item.title} was removed`)
			navigate('/admin/refresh')
			navigate(`/admin/categories`)
		} catch (err: any) {
			const error = err.response?.data.message
			toast.error(error.toString())
		}
	}

	return (
		<>
			{isCreatingModalVisible && (
				<CreateCategoryModal setVisibleModal={setIsCreatingModalVisible} />
			)}
			{isUpdatingModalVisible && selectedCategory && (
				<UpdateCategoryModal
					setVisibleModal={setIsUpdatingModalVisible}
					category={selectedCategory}
				/>
			)}
			<motion.div
				initial={{ opacity: 0, y: -20 }}
				animate={{ opacity: 1, y: 0 }}
				exit={{ opacity: 0, y: -20 }}
				transition={{ duration: 0.7 }}
				className='w-[40%] h-[1000px] mt-20 mx-auto bg-zinc-500 text-white font-roboto flex flex-col gap-2 rounded-2xl shadow-2xl relative'
			>
				<button
					className='top-1 right-1 absolute rounded-full h-12 w-12 hover:bg-green-300'
					onClick={() => {
						setIsCreatingModalVisible(true)
					}}
				>
					<Plus className='w-12 h-12' />
				</button>
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
						<div className='w-[90%] bg-zinc-700/95 h-[70px] rounded-t-2xl grid grid-cols-6 items-center px-5 py-2 font-bold text-xl'>
							<label>ID</label>
							<label className='col-span-4 text-center'>TITLE</label>
							<label className='col-span-1 text-center'></label>
						</div>
					) : (
						<></>
					)}
					{searchedCategories?.length ? (
						searchedCategories.map((item, indx) => {
							return (
								<div
									key={indx}
									className='w-[90%] bg-zinc-600/90 h-[60px] rounded-2xl grid grid-cols-6 items-center px-5 py-2 text-lg'
								>
									<label>{item.id}</label>
									<label className='col-span-4 text-center'>{item.title}</label>
									<div className='col-span-1 flex justify-end'>
										<button
											className='w-10 rounded-full flex justify-end hover:bg-green-300 p-2'
											onClick={() => {
												setSelectedCategory(item)
												setIsUpdatingModalVisible(true)
											}}
										>
											<Pencil />
										</button>
										<button
											className='w-10 rounded-full flex justify-end hover:bg-red-500 p-2'
											onClick={() => removeCategoryHandler(item)}
										>
											<Trash2 />
										</button>
									</div>
								</div>
							)
						})
					) : (
						<h2 className='uppercase text-black/70 font-bold text-xl w-full text-center'>
							Categories were not found
						</h2>
					)}
				</div>
			</motion.div>
		</>
	)
}

export default Categories
