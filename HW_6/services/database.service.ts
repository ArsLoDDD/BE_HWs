import knex from 'knex'
import path from 'path'

export class DatabaseService {
	private db: any

	constructor() {
		this.db = knex({
			client: 'sqlite3',
			connection: {
				filename: path.join(__dirname, '../db.sqlite'),
			},
		})
	}

	async createTable() {
		const userTableExists = await this.db.schema.hasTable('news')
		if (userTableExists) return

		await this.db.schema.createTable('news', (table: any) => {
			table.increments('id').primary()
			table.string('title')
			table.string('text')
		})
	}

	async create(table: string, data: any) {
		return this.db
			.insert(data)
			.into(table)
			.returning('*')
			.then((rows: any) => rows[0])
	}

	async read(table: string, id: number): Promise<any>
	async read(table: string): Promise<any[]>

	async read(table: string, id?: number): Promise<any | any[]> {
		if (id !== undefined) {
			return this.db
				.select()
				.from(table)
				.where('id', id)
				.then((rows: any) => rows[0])
		} else {
			return this.db
				.select()
				.from(table)
				.then((rows: any) => rows)
		}
	}

	async update(table: string, data: any) {
		return this.db(table)
			.where('id', data.id)
			.update(data)
			.returning('*')
			.then((rows: any) => rows[0])
	}

	async delete(table: string, id: number) {
		return this.db(table)
			.where('id', id)
			.del()
			.returning('*')
			.then((rows: any) => rows[0])
	}
}
