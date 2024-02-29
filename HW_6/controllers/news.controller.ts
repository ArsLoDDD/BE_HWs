import { Request, Response } from 'express'
import { databaseService } from '../services'

export class NewsController {
	async create(req: Request, res: Response) {
		if (!req.body.title || !req.body.text) {
			return res.status(500).send()
		}
		const createNews = await databaseService.create('news', req.body)
		res.send(createNews)
	}
	async read(req: Request, res: Response) {
		if (
			req.params.id &&
			!isNaN(Number(req.params.id)) &&
			req.params.id !== '0'
		) {
			const getNews = await databaseService.read('news', Number(req.params.id))
			if (!getNews) {
				return res.status(404).send()
			}
			return res.send(getNews)
		}
		if (req.params.id === undefined) {
			const getNews = await databaseService.read('news')
			if (getNews.length === 0) {
				return res.send([])
			}
			return res.send(getNews)
		}
		return res.status(500).send()
	}

	async update(req: Request, res: Response) {
		if (
			req.params.id &&
			!isNaN(Number(req.params.id)) &&
			req.params.id !== '0'
		) {
			const oldData = await databaseService.read('news', Number(req.params.id))
			if (!oldData) {
				return res.status(404).send()
			}
			if (req.body.id) delete req.body.id
			const newData = { ...oldData, ...req.body }
			const updateNews = await databaseService.update('news', newData)
			return res.send(updateNews)
		}
		return res.status(500).send()
	}
	async delete(req: Request, res: Response) {
		if (
			req.params.id &&
			!isNaN(Number(req.params.id)) &&
			req.params.id !== '0'
		) {
			const isExistThisNews = await databaseService.read(
				'news',
				Number(req.params.id)
			)
			if (!isExistThisNews) {
				return res.status(404).send()
			}
			await databaseService.delete('news', Number(req.params.id))
			return res.status(200).send()
		}
		return res.status(500).send()
	}
}
