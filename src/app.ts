import express from 'express'
import indexRoutes from './routes/index.routes'
import { engine } from 'express-handlebars'
import path from 'path'

const app = express()
// we need absolute paths for views
app.set('views', path.join(__dirname, 'views'))
app.engine(
  'hbs',
  engine({
    extname: '.hbs',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    defaultLayout: 'main',
    partialsDir: path.join(app.get('views'), 'partials')
  })
)
app.set('view engine', 'hbs')
app.use(indexRoutes)

export default app
