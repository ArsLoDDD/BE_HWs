import { useEffect, useState } from 'react'
import Cards from '../components/Cards/Cards'
import axios from 'axios'
import { Link } from 'react-router-dom'

const HomePage = () => {
	const [posts, setPosts] = useState([])

	useEffect(() => {
		;(async () => {
			// const { data } = await axios.get(
			// 	`http://${process.env.SERVER_HOST}:${process.env.SERVER_PORT}/newsposts`
			// )
			const { data } = await axios.get('http://localhost:8000/newsposts')
			setPosts(data)
			console.log(data)
		})()
	}, [])
	return (
		<div className=' flex flex-col justify-between items-center h-full'>
			<Cards posts={posts} />
			<Link to='/add' className=' bg-green-500 text-white rounded-lg py-2 px-4'>
				Add Post
			</Link>
		</div>
	)
}

export default HomePage
