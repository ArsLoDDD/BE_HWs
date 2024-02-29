import { Link, useLocation } from 'react-router-dom'
import './App.css'
import AppRoutes from './AppRoutes'

function App() {
	const path = useLocation().pathname
	console.log(path)
	return (
		<div className=' bg-white w-full h-screen p-6'>
			<div className=' bg-slate-100 p-8 rounded-3xl w-full h-full relative'>
				{path !== '/' && (
					<Link
						to='/'
						className='absolute bg-slate-500 top-6 rounded-full p-2 select-none '
					>
						Back
					</Link>
				)}
				<AppRoutes />
			</div>
		</div>
	)
}

export default App
