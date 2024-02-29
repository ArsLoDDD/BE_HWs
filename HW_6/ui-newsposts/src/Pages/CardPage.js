import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import axios from 'axios'

const CardPage = () => {
	const path = useLocation().pathname.split('/')[2]
	const [cardData, setCardData] = useState({})

	useEffect(() => {
		;(async () => {
			const { data } = await axios.get(
				`http://localhost:8000/newsposts/${path}`
			)
			console.log(data)
			setCardData(data)
		})()
	}, [])
	if (!cardData) return <h1>Loading...</h1>
	return (
		<div>
			<article className='w-full flex flex-col items-center text-center'>
				<h1 className=' text-5xl font-bold mb-12'>{cardData.title}</h1>
				<p className=' w-3/4 text-xl'>{cardData.text}</p>
			</article>
			<Link
				to={`/edit/${cardData.id}`}
				state={{ title: cardData.title, text: cardData.text, id: cardData.id }}
				className=' bg-green-500 text-white rounded-lg py-2 px-4'
			>
				Edit Post
			</Link>
		</div>
	)
}
export default CardPage
