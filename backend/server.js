const dotenv = require('dotenv')
dotenv.config()

const express = require('express')
const cors = require('cors')
const http = require('http')
const { Server } = require('socket.io')
const connectDB = require('./db')

const app = express()
const server = http.createServer(app)
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST']
  }
})

app.use(cors())
app.use(express.json())

const authRoutes = require('./routes/auth')
const taskRoutes = require('./routes/taskRoutes')
app.use('/api/auth', authRoutes)
app.use('/api/tasks', taskRoutes)

connectDB()

app.get('/', (req, res) => {
  res.send('DevCollab backend is running!')
})

io.on('connection', (socket) => {
  console.log('A user connected:', socket.id)

  socket.on('sendMessage', (message) => {
    io.emit('receiveMessage', message)
  })

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id)
  })
})

const PORT = process.env.PORT || 5000
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})