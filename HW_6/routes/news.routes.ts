import { Router } from 'express'
import { NewsController } from '../controllers'

class NewsRoutes {
	private router: Router
	private newsController: NewsController

	constructor() {
		this.router = Router()
		this.newsController = new NewsController()
		this.routes()
	}
	routes() {
		this.router.get('/', this.newsController.read)
		this.router.get('/:id', this.newsController.read)
		this.router.post('/', this.newsController.create)
		this.router.put('/:id', this.newsController.update)
		this.router.delete('/:id', this.newsController.delete)
	}
	getRouter() {
		return this.router
	}
}

const newsRoutes = new NewsRoutes()

export default newsRoutes.getRouter()
