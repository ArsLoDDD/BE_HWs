import { Route, Routes } from 'react-router-dom'
import HomePage from './Pages/HomePage'
import CardPage from './Pages/CardPage'
import AddPostPage from './Pages/AddPostPage'
import EditPostPage from './Pages/EditPostPage'

const AppRoutes = () => {
	return (
		<Routes>
			<Route path='/' element={<HomePage />} />
			<Route path='/card/:id' element={<CardPage />} />
			<Route path='/add' element={<AddPostPage />} />
			<Route path='/edit/:id' element={<EditPostPage />} />
			<Route path='*' element={<h1>404</h1>} />
		</Routes>
	)
}
export default AppRoutes
