import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

const DB_NAME = process.env.DB_NAME
const DB_USER_NAME = process.env.DB_USER_NAME
const DB_PASSWORD = process.env.DB_PASSWORD
const DB_HOST = process.env.DB_HOST
const DB_PORT = process.env.DB_PORT

export const sequelize = new Sequelize(
    DB_NAME,
    DB_USER_NAME,
    DB_PASSWORD,
    {
        host: DB_HOST,
        dialect: 'mysql',
        port: DB_PORT,
        logging: false
    }
)

export const dbConnect = () => {
    const conn = sequelize.authenticate()
    console.log('conn: ', conn)
    conn
    .then( console.log(`Connected to ${DB_NAME}`) )
    .catch( error => console.log(`Failed to connect to ${DB_NAME}`) )
}
