const express = require('express')
const app = express()

const tasksRoutes = require('./routes/tasks')

app.use(express.json())

app.use('/api/v1/tasks', tasksRoutes)

const port = 3000
app.listen(port, console.log(`Server is listening on port ${port}...`))