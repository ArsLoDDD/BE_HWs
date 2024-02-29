import { Router } from 'express'
import newsRoutes from './news.routes'

interface IRoutes {
	[path: string]: Router
}

const Routes: IRoutes = {
	newsposts: newsRoutes,
}

export default Routes
