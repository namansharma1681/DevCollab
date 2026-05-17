const dotenv = require('dotenv')
dotenv.config()

const express = require('express')
const cors = require('cors')
const connectDB = require('./db')

const app = express()

app.use(cors())
app.use(express.json())

const authRoutes = require('./routes/auth')
app.use('/api/auth', authRoutes)

const taskRoutes = require('./routes/taskRoutes')
app.use('/api/tasks', taskRoutes)


connectDB()

app.get('/', (req, res) => {
  res.send('DevCollab backend is running!')
})

const PORT = 5000
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
