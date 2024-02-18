import fs from 'fs'
import fsPromise from 'fs/promises'
import path from 'path'
import { v4 as uuidv4 } from 'uuid'
type Schema = Record<string, any>
enum DataTypes {
	Number = 'number',
	String = 'string',
	Date = 'date',
}

class FileDB {
	path: string
	schemas: Record<string, Schema> = {}
	currentTables: Record<string, TableDB> = {}

	constructor(path: string) {
		if (!fs.existsSync(path)) {
			fs.mkdirSync(path)
		}
		this.path = path
		this.currentTables = {}
	}
	async initFiles(): Promise<Record<string, TableDB>> {
		const files = await fsPromise.readdir(this.path)
		for (const file of files) {
			const data = await fsPromise.readFile(path.join(this.path, file), 'utf-8')
			const parsedData = JSON.parse(data)
			const tableName = file.split('.')[0]
			const newTable = new TableDB(
				tableName,
				parsedData[tableName],
				parsedData.schema
			)
			this.currentTables[tableName] = newTable
			this.schemas[tableName] = parsedData.schema
		}
		return this.currentTables
	}

	async registerSchema(tableName: string, schema: Schema): Promise<void> {
		if (
			!this.schemas[tableName] &&
			!fs.existsSync(this.path + `/${tableName}.json`)
		) {
			try {
				const newSchema: Schema = Object.assign({}, schema)
				for (const key in newSchema) {
					if (newSchema[key] === Number) {
						newSchema[key] = DataTypes.Number
					} else if (newSchema[key] === String) {
						newSchema[key] = DataTypes.String
					} else if (newSchema[key] === Date) {
						newSchema[key] = DataTypes.Date
					}
				}
				await fsPromise.writeFile(
					this.path + `/${tableName}.json`,
					JSON.stringify({
						[tableName]: [],
						schema: Object.assign({}, newSchema),
					})
				)
				console.log(`Table ${tableName} created`)
			} catch (error) {
				console.error(error)
			}
		} else {
			console.log('Table already exists')
		}
		this.schemas[tableName] = schema
	}

	getSchemas(): Record<string, Schema> {
		return this.schemas
	}

	async getTable(tableName: string): Promise<TableDB> {
		if (this.currentTables[tableName]) {
			return this.currentTables[tableName]
		}
		throw new Error(`Table ${tableName} does not exist`)
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
	async create(newData: Schema): Promise<void | Schema> {
		const fileData = await this.getFileData()

		// console.log('fileData', fileData)
		if (fileData) {
			const existingItem = fileData[this.tableName].find(
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
		const lastData = Object.assign(
			{
				id: parseInt(uuidv4().replace(/\D/g, '').substring(0, 10)),
				createDate: new Date(),
			},
			newData
		)
		this.data.push(lastData)
		this.writeFile(this.data)
		return lastData
	}
	//R
	getById(id: number): Schema {
		return this.data[this.tableName].find((item: any) => item.id === id)
	}
	getAll(): Schema[] {
		return this.data[this.tableName]
	}
	//U
	async update(id: number, newData: Schema): Promise<void | Schema> {
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
		let updatedObj: Schema = {}
		const newDataArr = parsedData[this.tableName].map((item: any) => {
			if (item.id === id) {
				updatedObj = {
					...item,
					...newData,
					id: item.id,
					createDate: item.createDate,
				}
				return updatedObj
			}
			return item
		})
		this.writeFile(newDataArr)
		return updatedObj
	}
	//D
	async delete(id: number): Promise<void | number> {
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
		return id
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
	async writeFile(data: Schema | Schema[]): Promise<void> {
		await fsPromise
			.writeFile(
				path.join(__dirname + '/DB/FileDB', `${this.tableName}.json`),
				JSON.stringify({ [this.tableName]: data, schema: this.schema })
			)
			.catch(error => {
				console.error(
					`Error writing data to file ${this.tableName}.json:`,
					error
				)
			})
	}
}

const newspostSchema = {
	id: Number,
	title: String,
	text: String,
	createDate: Date,
}
const newDaySchema = {
	id: Number,
	createDate: Date,
}

;(async () => {
	const fileDB = new FileDB(path.join(__dirname + '/DB', 'FileDB'))
	// await fileDB.registerSchema('newspost', newspostSchema)
	// await fileDB.registerSchema('newDay', newDaySchema)
	await fileDB.initFiles()
	// console.log(await fileDB.initFiles())
	const newspostTable = await fileDB.getTable('newspost')
	// console.log(newspostTable)
	console.log(
		await newspostTable.create({
			title: 'asasdwqe123123',
			text: 'Text',
		})
	)

	// const newDayTable = await fileDB.getTable('newDay')
})()
