const { createCourse, getCourses, getStudentWithCourse } = require('../Controller/courseController')
const express = require('express')
const router = express.Router()


router.post('/', createCourse)

router.get('/', getCourses)

router.get('/:courseId', getStudentWithCourse)


module.exports = router