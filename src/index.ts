import app from './app'
import { connectDB } from './config/database';

app.listen(3000, async () => {
  await connectDB();
  console.log('Server is running on port 3000')
})
