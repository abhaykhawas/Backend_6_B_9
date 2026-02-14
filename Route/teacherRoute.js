const { createTeacher, getTeachers, register, login } = require('../Controller/teacherController')
const express = require('express')
const router = express.Router()


router.post('/', createTeacher)

router.get('/', getTeachers)

router.post('/signup', register)

router.post('/login', login)


module.exports = router