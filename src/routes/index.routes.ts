import { Router } from 'express'
import { CustomerModel } from '../models/Customer'
const router = Router()

router.get('/', async (req, res) => {
  const customers = await CustomerModel.find().lean() // lean() returns a plain JS object
  res.render('index', { customers })
})

router.get('/edit/:id', async (req, res) => {
  const customer = await CustomerModel.findById(req.params.id).lean()
  res.render('edit', { customer })
})

router.post('/edit/:id', async (req, res) => {
  const { name, email } = req.body
  await CustomerModel.findByIdAndUpdate(req.params.id, { name, email })
  res.redirect('/')
})

router.get('/delete/:id', async (req, res) => {
  await CustomerModel.findByIdAndDelete(req.params.id)
  res.redirect('/')
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
