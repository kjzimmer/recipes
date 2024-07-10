import express from 'express'
import  cors from 'cors'
import dotenv from 'dotenv'
// import dotenv/config from 'dotenv'   // this will run dotenv.config() without line 12 below
import { dbConnect } from './config/config.sequelize.js'
import { usersRouter  } from './routes/user.routes.js'
import cookies from 'cookie-parser'
import { routeRouter } from './routes/root.routes.js'
import { recipesRouter } from './routes/recipes.routes.js'
import { ingredientsRouter } from './routes/ingredients.routes.js'
import { prepStepsRouter } from './routes/prepSteps.routes.js'

const app = express()
app.use(express.json(), cors(), cookies())

dotenv.config()

const PORT = process.env.SERVER_PORT || 8000
const APP_NAME = process.env.APP_NAME || 'Unknown App'

dbConnect()

app.use('/api', routeRouter)
app.use('/api/users', usersRouter)
app.use('/api/recipes', recipesRouter)
// app.use('/api/recipes', ()=>console.log('$$$$$$$$$$$'))
app.use('/api/ingredients', ingredientsRouter)
app.use('/api/prepSteps', prepStepsRouter)

app.listen(PORT, () => {
    console.log(`${APP_NAME} server listening on port: ${PORT}`)
})