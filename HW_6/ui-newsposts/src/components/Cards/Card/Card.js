import React from 'react'
import { Link, useLocation } from 'react-router-dom'
const Card = ({ card }) => {
	return (
		<Link
			to={`/card/${card.id}`}
			className='bg-slate-200 text-black p-3 h-40 w-52 flex rounded-3xl'
		>
			<article className='w-full   text-center'>
				<h3 className='mb-4 bg-slate-300 rounded-3xl'>{card.title}</h3>
				<p className=' line-clamp-3 '>{card.text}</p>
			</article>
		</Link>
	)
}
export default Card
