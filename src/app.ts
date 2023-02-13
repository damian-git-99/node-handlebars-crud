import express from 'express'
import 'express-async-errors'
import cookieSession from 'cookie-session'
import indexRoutes from './routes/index.routes'
import authRoutes from './routes/auth.routes'
import { engine } from 'express-handlebars'
import path from 'path'
import { requireAuth } from './middlewares/require-auth'
import { errorHandler } from './middlewares/error-handler'

const app = express()
// we need absolute paths for views
app.set('views', path.join(__dirname, 'views'))
app.engine(
  'hbs',
  engine({
    extname: 'hbs',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    defaultLayout: 'main',
    partialsDir: path.join(app.get('views'), 'partials')
  })
)
app.set('view engine', 'hbs')
app.use(express.urlencoded({ extended: false })) // to parse form data

app.use(
  cookieSession({
    name: 'session',
    signed: false, // disable encryption
  })
)

app.use(authRoutes)
app.use(requireAuth, indexRoutes)
app.use(errorHandler)

export default app
