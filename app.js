const express = require('express')
const app = express()

const tasksRoutes = require('./routes/tasks')
const connectDB = require('./db/connect')
require('dotenv').config()
const USERNAME = process.env.DATABASE_USERNAME
const PASSWORD = encodeURIComponent(process.env.DATABASE_PASSWORD)
const MONGO_OBJ = process.env.MONGO_OBJ
MONGO_URI = `mongodb+srv://${USERNAME}:${PASSWORD}@nodeexpressproject.${MONGO_OBJ}.mongodb.net/TASK-MANAGER?retryWrites=true&w=majority`

app.use(express.json())
app.use('/api/v1/tasks', tasksRoutes)

const port = 3000
const start = async () => {
    try {
        await connectDB(MONGO_URI)
        app.listen(port, console.log(`Server is listening on port ${port}...`))
    } catch (error) {
        console.log(error)
    }
}
start()