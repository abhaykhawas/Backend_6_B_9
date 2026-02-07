const { createTeacher, getTeachers } = require('../Controller/teacherController')
const express = require('express')
const router = express.Router()


router.post('/', createTeacher)

router.get('/', getTeachers)


module.exports = router