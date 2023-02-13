import mongoose from 'mongoose'

export interface Customer {
  name: string
  email: string
}

const customerSchema = new mongoose.Schema<Customer>({
  name: {
    required: true,
    type: String
  },
  email: {
    type: String,
    required: true,
    unique: true
  }
})

export const CustomerModel = mongoose.model<Customer>('Customer', customerSchema)
