const mongoose = require('mongoose')
if (process.env.NODE_END !== 'production') {
  require('dotenv').config()
}
const mongoURL = process.env.MONGO_URL

const connectDB = async () => {
  try {
    await mongoose.connect(mongoURL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    console.log('MongoDB Connected...')
  } catch (err) {
    console.error(err.message)
    process.exit(1)
  }
}

module.exports = connectDB
