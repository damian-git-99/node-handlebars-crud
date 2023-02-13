import { Router, Request, Response } from 'express'
import { CustomerModel } from '../models/Customer'
import { requireAuth } from '../middlewares/require-auth'
import { UserModel } from '../models/User'
import { encryptPassword, comparePasswords } from '../utils/PasswordUtils';

const router = Router()

// Auth
router.get('/login', async (req, res) => {
  if (req.session?.isPopulated) {
    return res.redirect('/')
  }
  res.render('login')
})

router.post('/login', async (req, res) => {
  if (req.session?.isPopulated) {
    return res.redirect('/')
  }

  const { name, password } = req.body

  const user = await UserModel.findOne({ name })

  if (!user) {
    throw new Error('Bad credentials')
  }

  if (!comparePasswords(password, user.password)){
    throw new Error('Bad credentials')
  }

  req.session = { auth: true }
  res.redirect('/')
})

router.get('/signup', async (req, res) => {
  if (req.session?.isPopulated) {
    return res.redirect('/')
  }
  res.render('signup')
})

router.post('/signup', async (req, res) => {
  if (req.session?.isPopulated) {
    return res.redirect('/')
  }

  const { name, password } = req.body

  const hashedPassword = encryptPassword(password)

  await UserModel.create({ name, password: hashedPassword })

  res.redirect('/login')
})

// customers
router.get('/', requireAuth, async (req, res) => {
  const customers = await CustomerModel.find().lean() // lean() returns a plain JS object
  res.render('index', { customers })
})

router.get('/edit/:id', requireAuth, async (req, res) => {
  const customer = await CustomerModel.findById(req.params.id).lean()
  res.render('edit', { customer })
})

router.post('/edit/:id', requireAuth, async (req, res) => {
  const { name, email } = req.body
  await CustomerModel.findByIdAndUpdate(req.params.id, { name, email })
  res.redirect('/')
})

router.get('/delete/:id', requireAuth, async (req, res) => {
  await CustomerModel.findByIdAndDelete(req.params.id)
  res.redirect('/')
})

router.post('/customers/add', requireAuth, async (req, res) => {
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
