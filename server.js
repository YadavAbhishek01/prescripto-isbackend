import express from 'express'
import cors from 'cors'
import 'dotenv/config'   // ✅ fixed line
import connectDB from './config/MongoDb.js'
import connectCloudinary from './config/cloudnary.js'
import adminrouter from './routes/adminroute.js'
import loginroutes from './routes/userroutes.js'
import publicroute from './routes/publicroute.js'
import appointmentrouter from './routes/appointmentsroutes.js'


// app config
const app = express()
// Increase JSON limit to handle large payloads
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

const port = process.env.PORT  || 5000
connectDB()
connectCloudinary()
// middlewares
app.use(express.json())
app.use(cors())

// api endpoint
app.use('/api/admin',adminrouter)
app.use('/api/user',loginroutes)
app.use('/api/public',publicroute)
app.use('/api/appointments',appointmentrouter); 


app.get('/', (req, res) => {
  res.send("API Working ")
})

app.listen(port, () => console.log('Server Started on port', port))
