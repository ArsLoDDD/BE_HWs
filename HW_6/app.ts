import exporess, { Application } from 'express'
import { MainController } from './controllers'
import dotenv from 'dotenv'
import Routes from './routes/index'
import { databaseService } from './services'
import bodyParser from 'body-parser'
import morgan from 'morgan'
import cors from 'cors'

class App {
	private app: Application
	private mainController: MainController

	constructor() {
		this.app = exporess()
		this.app.use(cors())
		this.mainController = new MainController(this.app)
	}

	routing() {
		this.app.get(
			'/',
			this.mainController.getStartedPage.bind(this.mainController)
		)

		Object.keys(Routes).forEach(routeName => {
			this.app.use(`/${routeName}`, Routes[routeName])
		})
	}

	initPlugins() {
		this.app.use(bodyParser.json())
		this.app.use(morgan('dev'))
	}

	async start() {
		await databaseService.createTable()

		this.initPlugins()
		this.routing()
		this.app.use('*', cors())
		this.app.listen(process.env.SERVER_PORT, () => {
			console.log(
				`Server is running on http://${process.env.SERVER_HOST}:${process.env.SERVER_PORT}`
			)
		})
	}
}

dotenv.config()
const app = new App()
app.start()
