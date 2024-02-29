import Card from './Card/Card'

const Cards = ({ posts }) => {
	return (
		<div className='flex flex-wrap gap-5'>
			{posts.map(post => {
				return <Card key={post.id} card={post} />
			})}
		</div>
	)
}
export default Cards
