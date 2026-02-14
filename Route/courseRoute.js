const { createCourse, getCourses, getStudentWithCourse } = require('../Controller/courseController')
const express = require('express')
const router = express.Router()
const authMiddleware = require('../Middleware/authMiddleware')
const teacherAuthMiddleware = require('../Middleware/teacherAuthMiddleware')

router.post('/', authMiddleware, teacherAuthMiddleware ,createCourse)

router.get('/', authMiddleware ,getCourses)

router.get('/:courseId', authMiddleware ,getStudentWithCourse)


module.exports = router