import dotenv from 'dotenv'
import { DataSource } from 'typeorm'
dotenv.config()

const AppDataSource = new DataSource({
  type: 'mysql',
  host: 'localhost',
  port: process.env.MYSQL_PORT ? parseInt(process.env.MYSQL_PORT) : 3306,
  username: 'root',
  password: process.env.MYSQL_PASSWORD,
  database: 'netflix',
  entities: ['src/entities/*.entity.ts'],
  synchronize: true
})
async function databaseInitialize() {
  try {
    await AppDataSource.initialize()
    console.log('Data source connected')
  } catch (e) {
    console.log(e)
  }
}

export { AppDataSource, databaseInitialize }
