import { Application, Request, Response } from 'express'
import express from 'express'
import path from 'path'

export class MainController {
	private app: Application
	constructor(app: Application) {
		this.app = app
	}
	public getStartedPage(req: Request, res: Response) {
		this.app.use(express.static(path.join(__dirname, '../ui-newsposts/build')))
		res.sendFile(path.join(__dirname, '../ui-newsposts/build', 'index.html'))
	}
}
