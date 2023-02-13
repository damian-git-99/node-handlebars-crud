import mongoose from 'mongoose'

export const connectDB = async () => {
  try {
    mongoose.set('strictQuery', false) // to avoid deprecation warning
    const conn = await mongoose.connect('mongodb://damian:password@mongo:27017/users_db?authSource=admin');
    console.log(`MongoDB Connected: ${conn.connection.host}`)
  } catch (error) {
    console.log(error)
    process.exit(1)
  }
}
