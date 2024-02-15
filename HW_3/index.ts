import fs from 'fs'
import fsPromise from 'fs/promises'
import path from 'path'

type Schema = Record<string, any>

class FileDB {
	path: string
	schemas: Record<string, Schema> = {}

	constructor(path: string) {
		if (!fs.existsSync(path)) {
			fs.mkdirSync(path)
		}
		this.path = path
	}
	async registerSchema(tableName: string, schema: Schema): Promise<void> {
		if (
			!this.schemas[tableName] &&
			!fs.existsSync(this.path + `/${tableName}.json`)
		) {
			try {
				await fsPromise.writeFile(
					this.path + `/${tableName}.json`,
					JSON.stringify({ [tableName]: [] })
				)

				console.log(`Table ${tableName} created`)
			} catch (error) {
				console.error(error)
			}
		} else {
			console.log('Table already exists')
		}
		this.schemas[tableName] = schema
		// this.getSchemas()
	}

	getSchemas(): Record<string, Schema> {
		// console.log(this.schemas)
		return this.schemas
	}

	async getTable(tableName: string): Promise<TableDB> {
		const data = await fsPromise
			.readFile(this.path + `/${tableName}.json`, 'utf-8')
			.then(data => JSON.parse(data))
			.catch(error => console.error(error))

		return new TableDB(tableName, data, this.schemas[tableName])
	}
}

class TableDB {
	data: Schema
	tableName: string
	schema: Schema
	constructor(
		tableName: string,
		data: Schema = { [tableName]: [] },
		schema: Schema
	) {
		this.tableName = tableName
		this.data = data
		this.schema = schema
	}
	//C
	async create(newData: Schema): Promise<void> {
		const fileData = await fsPromise
			.readFile(
				path.join(__dirname + '/DB/FileDB', `${this.tableName}.json`),
				'utf-8'
			)
			.catch(error => {
				console.error(`Error reading file ${this.tableName}.json:`, error)
				return null
			})

		if (fileData) {
			const parsedData = JSON.parse(fileData)
			const existingItem = parsedData[this.tableName].find(
				(item: any) => item.id === newData.id
			)
			if (existingItem) {
				console.log(
					`Item with id ${newData.id} already exists in the table ${this.tableName}`
				)
				return
			}
		}
		if (!this.isValidData(newData)) {
			return
		}

		this.data[this.tableName].push(newData)
		this.writeFile(this.data[this.tableName])
	}
	//R
	getById(id: number | string): Schema {
		return this.data[this.tableName].find((item: any) => item.id === id)
	}
	getAll(): Schema[] {
		return this.data[this.tableName]
	}
	//U
	async update(id: number | string, newData: Schema): Promise<void> {
		const parsedData = await this.getFileData()
		if (!parsedData[this.tableName].find((item: any) => item.id === id)) {
			console.log(
				`Item with id ${id} does not exist in the table ${this.tableName}`
			)
			return
		}
		if (!this.isValidData(newData)) {
			return
		}
		const newDataArr = parsedData[this.tableName].map((item: any) => {
			if (item.id === id) {
				return { ...item, ...newData }
			}
			return item
		})
		this.writeFile(newDataArr)
	}
	//D
	async delete(id: number | string): Promise<void> {
		const parsedData = await this.getFileData()
		if (!parsedData[this.tableName].find((item: any) => item.id === id)) {
			console.log(
				`Item with id ${id} does not exist in the table ${this.tableName}`
			)
			return
		}
		const newData = parsedData[this.tableName].filter(
			(item: any) => item.id !== id
		)
		this.writeFile(newData)
	}

	//Other
	async getFileData(): Promise<Schema> {
		const fileData = await fsPromise.readFile(
			path.join(__dirname + '/DB/FileDB', `${this.tableName}.json`),
			'utf-8'
		)
		return JSON.parse(fileData)
	}

	isValidData(data: Schema): boolean {
		const newKeys = Object.keys(data)
		const schemaKeys = Object.keys(this.schema)
		const isValid = newKeys.every(key => schemaKeys.includes(key))
		if (!isValid) {
			console.error(
				`Error creating item in table ${this.tableName}: Data fields do not match the schema`
			)
		}
		return isValid
	}
	async writeFile(data: Schema[]): Promise<void> {
		await fsPromise
			.writeFile(
				path.join(__dirname + '/DB/FileDB', `${this.tableName}.json`),
				JSON.stringify({ [this.tableName]: data })
			)
			.catch(error => {
				console.error(
					`Error writing data to file ${this.tableName}.json:`,
					error
				)
			})
	}
}

const fileDB = new FileDB(path.join(__dirname + '/DB', 'FileDB'))
const newspostSchema = {
	id: Number,
	title: String,
	text: String,
	createDate: Date,
}
const newDaySchema = {
	id: Number,
	date: Date,
}
fileDB.registerSchema('newspost', newspostSchema)
fileDB.registerSchema('newDay', newDaySchema)
;(async () => {
	const newspostTable = await fileDB.getTable('newspost')
	const newDayTable = await fileDB.getTable('newDay')
})()
