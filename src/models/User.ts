import mongoose from 'mongoose'

export interface User {
  name: string
  email: string
  password: string
}

const userSchema = new mongoose.Schema<User>({
  name: {
    required: true,
    type: String
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  }
})

export const UserModel = mongoose.model<User>('User', userSchema)
