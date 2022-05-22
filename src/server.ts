import express from 'express'
import routes from './routes'
import { AppDataSource } from './data_source'
import { DataSource } from 'typeorm'

class Server {
    public app: express.Application
    public db: DataSource
    constructor() {
        this.db = AppDataSource
        this.app = express()
        this.middleware()
        this.routes()
        this.dataBase()
    }
    private dataBase():void{
        this.db.initialize().then(() => {
            console.log('DataBase connect')
        }
        ).catch((error) => console.log(error))
    }

    private middleware(): void {
        this.app.use(express.json())

    }
    private routes(): void {
        this.app.use(routes)
    }
}

export const server  = new Server()