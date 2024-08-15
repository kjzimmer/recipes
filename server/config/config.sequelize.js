import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
// import { User } from '../models/user.model.js';

dotenv.config();

// const DB_NAME = process.env.DB_NAME
// const DB_USER_NAME = process.env.DB_USER_NAME
// const DB_PASSWORD = process.env.DB_PASSWORD
// const DB_HOST = process.env.DB_HOST
// const DB_PORT = process.env.DB_PORT


const DB_NAME = process.env.DB_NAME
const DB_USER_NAME = process.env.DB_USER_NAME
const DB_PASSWORD = process.env.DB_PASSWORD
const DB_HOST = 'devmysql1.cpnjiuyyhode.us-west-2.rds.amazonaws.com'
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
    conn
    .then( console.log(`Connected to ${DB_NAME}`) )
    .catch( error => console.log(`Failed to connect to ${DB_NAME}`) )
}

sequelize.sync({alter:true})
// .then(() => {
//     User.create({
//         firstName:'karl',
//         lastName:'zimmer',
//         email:'karl.zimmer@enterpriseedge.com',
//         password:'1aA@5678'
//     })
//     .then(newUser => console.log('new user: ', newUser))
//     .catch(error => confirm.log('create user error: ', error))
// })