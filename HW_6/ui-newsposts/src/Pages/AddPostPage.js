import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const AddPostPage = () => {
	const [title, setTitle] = useState('')
	const [text, setText] = useState('')
	const navigate = useNavigate()
	const handleSubmit = async e => {
		e.preventDefault()
		console.log(e.target.title.value)
		const sendPost = await axios.post('http://localhost:8000/newsposts', {
			title: e.target.title.value,
			text: e.target.text.value,
		})
		if (sendPost.status === 200) {
			console.log('Post added')
			navigate('/')
		}
	}
	return (
		<div className='pt-12'>
			<form
				onSubmit={handleSubmit}
				className='flex flex-col w-2/3 mx-auto'
				action=''
			>
				<label htmlFor='title'>Title</label>
				<input
					className=' py-3  rounded-xl'
					type='text'
					name='title'
					id='title'
					onChange={e => setTitle(e.target.value)}
					value={title}
				/>
				<label htmlFor='text'>Text</label>
				<textarea
					className='mb-5'
					name='text'
					id='text'
					cols='30'
					rows='10'
					onChange={e => setText(e.target.value)}
					value={text}
				></textarea>
				<button
					className=' w-1/3 mx-auto bg-green-500 text-white rounded-lg py-2 px-4'
					type='submit'
				>
					Add
				</button>
			</form>
		</div>
	)
}

export default AddPostPage
