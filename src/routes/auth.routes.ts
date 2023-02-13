import { Router, Request, Response } from 'express'
import { UserModel } from '../models/User'
import { encryptPassword, comparePasswords } from '../utils/PasswordUtils'
const router = Router()

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

  if (!comparePasswords(password, user.password)) {
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

router.get('/logout', (req, res) => {
  req.session = null
  return res.redirect('/login')
})

export default router
