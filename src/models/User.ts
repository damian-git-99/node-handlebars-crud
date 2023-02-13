import mongoose from 'mongoose'

export interface User {
  name: string
  password: string
}

const userSchema = new mongoose.Schema<User>({
  name: {
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