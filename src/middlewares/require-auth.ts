import { Router, Request, Response, NextFunction } from 'express'
import { Customer, CustomerModel } from '../models/Customer'

export const requireAuth = (req: Request, res: Response, next: NextFunction) => {
  if (!req.session?.isPopulated) {
    return res.redirect('/login')
  }
  next()
}