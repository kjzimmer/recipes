import express from 'express'
import  cors from 'cors'
import dotenv from 'dotenv'
// import dotenv/config from 'dotenv'   // this will run dotenv.config() without line 12 below
import { dbConnect } from './config/config.sequelize.js'
import { usersRouter, baseRouter } from './routes/user.routes.js'
import cookies from 'cookie-parser'

const app = express()
app.use(express.json(), cors(), cookies())

dotenv.config()

const PORT = process.env.SERVER_PORT || 8000
const APP_NAME = process.env.APP_NAME || 'Unknown App'

dbConnect()

app.use('/api/users', usersRouter)
app.use('/api', baseRouter)

app.listen(PORT, () => {
    console.log(`${APP_NAME} server listening on port: ${PORT}`)
})