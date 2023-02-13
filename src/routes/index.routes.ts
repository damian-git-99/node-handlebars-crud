import { Router } from 'express'
import { Customer, CustomerModel } from '../models/Customer';

const router = Router()

router.get('/', async (req, res) => {
  const customers = await CustomerModel.find().lean() // lean() returns a plain JS object
  res.render('index', { customers })
})

router.get('/edit', (req, res) => {
  res.render('edit')
})

router.post('/customers/add', async (req, res) => {
  const { name, email } = req.body
  const exists = await CustomerModel.findOne({ email })
  if (exists) {
    return res.send(`Email: ${email} already exists`)
  }
  const user = new CustomerModel({ name, email })
  await user.save()
  res.redirect('/')
})

export default router
