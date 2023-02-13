import mongoose from 'mongoose'

export const connectDB = async () => {
  try {
    mongoose.set('strictQuery', false) // to avoid deprecation warning
    const conn = await mongoose.connect('mongodb://localhost:27017/users_db')
    console.log(`MongoDB Connected: ${conn.connection.host}`)
  } catch (error) {
    console.log(error)
    process.exit(1)
  }
}
