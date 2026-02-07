const express = require("express")
const connectMongoDB = require('./utils/mongoDB')
require('dotenv').config()
const studentRoute = require('./Route/studentRoute')
const teacherRoute = require('./Route/teacherRoute')
const courseRoute = require('./Route/courseRoute')


const app = express()

app.use(express.json())

connectMongoDB() 

app.use('/api/student', studentRoute)
app.use('/api/teacher', teacherRoute)
app.use('/api/course', courseRoute)

app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`)
})