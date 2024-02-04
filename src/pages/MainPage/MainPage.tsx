import { motion } from 'framer-motion'
import {
	ArrowLeft,
	ArrowRight,
	ArrowUpToLine,
	Coffee,
	LogIn,
} from 'lucide-react'
import { FC, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const MainPage: FC = () => {
	const [showButton, setShowButton] = useState(false)
	const [slideNumber, setSlideNumber] = useState(1)

	const handleScroll = () => {
		const scrollY = window.scrollY
		if (scrollY > window.innerHeight) {
			setShowButton(true)
		} else {
			setShowButton(false)
		}
	}

	const scrollToTop = () => {
		window.scrollTo({
			top: 0,
			behavior: 'smooth',
		})
	}

	const arrowLeftHandler = () => {
		if (slideNumber == 1) {
			setSlideNumber(9)
		} else {
			setSlideNumber(prev => prev - 1)
		}
	}

	const arrowRightHandler = () => {
		if (slideNumber == 9) {
			setSlideNumber(1)
		} else {
			setSlideNumber(prev => prev + 1)
		}
	}

	useEffect(() => {
		window.addEventListener('scroll', handleScroll)
		return () => {
			window.removeEventListener('scroll', handleScroll)
		}
	}, [])
	return (
		<main className='flex flex-col w-full min-h-screen bg-gradient-to-b from-zinc-900 to-zinc-600 relative font-roboto'>
			{showButton && (
				<button
					onClick={scrollToTop}
					className='fixed z-12 bottom-7 right-10 w-18 h-18 text-black bg-zinc-200 p-2 rounded-2xl'
				>
					<ArrowUpToLine className='w-14 h-14' />
				</button>
			)}

			<Link
				to={'/auth/login'}
				className='fixed top-1 right-5 w-[5vw] h-[6vh] z-10 text-white hover:bg-zinc-200 hover:text-black p-2 rounded-2xl'
			>
				<LogIn className='w-[4vw] h-[4vh]' />
			</Link>
			<nav className='fixed top-0 left-0 w-full bg-gradient-to-t from-zinc-900 to-zinc-800 h-[7vh] p-[1vh]'>
				<ul className='flex items-center justify-center gap-[3vw] text-white text-[3vh] font-bold'>
					<li>
						<a
							className='hover:bg-zinc-400 hover:text-black rounded-2xl py-3 px-10'
							href='#aboutUs'
						>
							ABOUT US
						</a>
					</li>
					<li>
						<a
							className='hover:bg-zinc-400 hover:text-black rounded-2xl py-3 px-10'
							href='#advantages'
						>
							ADVANTAGES
						</a>
					</li>

					<li>
						<a
							className='hover:bg-zinc-400 hover:text-black rounded-2xl py-3 px-10'
							href='#interface'
						>
							INTERFACE
						</a>
					</li>
					<li>
						<a
							className='hover:bg-zinc-400 hover:text-black rounded-2xl py-3 px-10'
							href='#howToGet'
						>
							HOW TO GET
						</a>
					</li>
				</ul>
			</nav>
			<motion.section
				initial={{ opacity: 0, y: -100 }}
				animate={{ opacity: 1, y: 0 }}
				exit={{ opacity: 0, y: -100 }}
				transition={{ duration: 1 }}
				className='h-screen flex flex-col items-center justify-center'
			>
				<Coffee size={500} color='white'>
					<animate
						attributeName='fill'
						values='brown;orange'
						dur='5s'
						repeatCount='indefinite'
					/>
				</Coffee>
				<h1 className='text-[100px] font-bold text-white'>COFFEE CRM</h1>
				<a
					href='https://github.com/Maksaks'
					className='text-white/40 text-2xl uppercase'
				>
					by Maksaks
				</a>
			</motion.section>
			<section
				id='aboutUs'
				className='h-screen flex flex-col gap-10 items-center justify-center text-center text-white text-[3vh]'
			>
				<p className='w-[60%]'>
					Welcome to the wonderful world of Coffee CRM - yours a reliable
					companion in the successful management of the coffee business. Let's
					tell you a little story about how our CRM system came to be an
					indispensable tool for many coffee entrepreneurs.
				</p>
				<p className='w-[60%]'>
					With Coffee CRM, you will get the opportunity to effectively manage
					stocks of the best coffee beans, maintain a high level of service and
					analyze financial indicators so that every cup brings you joy not only
					in taste, but also in financial success.
				</p>
				<p className='w-[60%]'>
					Our system is not only a tool, but also an assistant in management
					every aspect of your coffee business. Join Coffee CRM and feel how
					your cafe turns into a real work of art in the world of coffee. Thank
					you for your attention and a joint journey into the world of coffee
					perfection!
				</p>
			</section>
			<section
				id='advantages'
				className='h-screen flex items-center justify-center'
			>
				<div className='w-[60vw] h-[80vh] rounded-3xl shadow-2xl'>
					<h2 className='w-full border-b-2 p-3 text-center text-[4vh] text-white font-bold bg-zinc-800 rounded-t-3xl'>
						ADVANTAGES
					</h2>
					<div className='flex flex-col py-5 px-10 text-white text-[3vh] gap-5'>
						<p>
							🌱 <b>Inventory optimization:</b> Tracking inventory and demand
							helps ensure your favorite coffees are available without cost
							overruns.
						</p>
						<p>
							☕ <b>Convenient Planning:</b> Separation of coffee recipes and
							ingredients for convenient service planning.
						</p>
						<p>
							🚀 <b>Fast Order Processing:</b> Acceleration of order processing
							and implementation of an effective service system without
							unnecessary formalities.
						</p>
						<p>
							💡 <b>Analytics Without Extra Download:</b> Easily integrate
							analytics to learn and improve performance without heavy
							workloads.
						</p>
						<p>
							🎯 <b>Simplification of Management:</b> Focusing on the main
							aspects of the business, thanks to the automation of routine
							tasks.
						</p>

						<p>
							📈 <b>Increasing Service Speed:</b> Quickly finding information
							allows you to work quickly and ensures high quality of service.
						</p>
					</div>
				</div>
			</section>
			<section
				id='interface'
				className='h-screen flex items-center justify-center'
			>
				<div className='flex w-[90%] p-32 rounded-3xl justify-center items-center gap-10 '>
					<button
						onClick={arrowLeftHandler}
						className='text-white hover:text-black hover:bg-zinc-300 rounded-3xl'
					>
						<ArrowLeft className='w-20 h-20' />
					</button>
					<img
						src={`/public/interface${slideNumber}.jpg`}
						className='border-4 rounded-3xl w-[80%] h-[70%]'
					/>
					<button
						onClick={arrowRightHandler}
						className='text-white hover:text-black hover:bg-zinc-300 rounded-3xl'
					>
						<ArrowRight className='w-20 h-20' />
					</button>
				</div>
			</section>
			<section id='howToGet' className='h-screen'>
				<div className='w-full h-full flex flex-col items-center justify-center text-center text-white  text-[3vh] gap-5'>
					<p className='w-[60%] uppercase font-bold'>
						🌟 Welcome to the world of "Coffee CRM"!
					</p>

					<p className='w-[60%]'>
						Your own coffee shop is waiting for you, but in order to fully
						master all the charms of our unique "Coffee CRM" platform, we need
						to know a little about you. And the best news is that registration
						is absolutely free and fast!
					</p>

					<p className='w-[60%]'>
						Get ready for the limitless world of possibilities that "Coffee CRM"
						will reveal to you. Tools are available to you to optimize the
						management of your coffee shop and create unique experiences for
						your customers. Professional business management has become so easy
						that you will want coffee even more!
					</p>

					<p className='w-[60%]'>
						Don't waste time and get access now to enjoy the endless
						possibilities of "Coffee CRM". Because coffee is always even better
						when your business is at the peak of its success! ☕✨
					</p>
					<Link
						to={'/auth/registration'}
						className='bg-zinc-900 px-10 py-[3vh] uppercase text-[4vh] font-bold rounded-3xl hover:text-black hover:bg-zinc-300'
					>
						Get access
					</Link>
				</div>
			</section>
			<footer className='h-[100px] bg-zinc-700 text-white flex items-center justify-center border-t-2 text-[3vh]'>
				{' '}
				<p>
					&copy; 2024 Coffee CRM{' '}
					<a
						href='https://github.com/Maksaks'
						className='text-white/40 text-xl hover:text-white'
					>
						by Maksaks
					</a>
					. All rights reserved.
				</p>
			</footer>
		</main>
	)
}

export default MainPage
