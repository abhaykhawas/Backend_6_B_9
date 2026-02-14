const express = require('express')
const { 
    createStudent, 
    readStudents, 
    readStudentById, 
    updateStudent,
    deleteStudent,
    deleteStudentWithEmail,
    updateStudentByEmail,
    softDeleteStudent ,
    addGrade,
    searchStudents,
    register,
    login,
    updateStudentByStudent
} = require('../Controller/studentController')

const authMiddleware = require('../Middleware/authMiddleware')
const teacherAuthMiddleware = require('../Middleware/teacherAuthMiddleware')

const router = express.Router()


router.post('/',authMiddleware, createStudent)

router.get('/', authMiddleware, teacherAuthMiddleware,readStudents)

router.get('/search', authMiddleware, teacherAuthMiddleware ,searchStudents)

router.get("/:id", authMiddleware, teacherAuthMiddleware ,readStudentById)

router.put('/:id', authMiddleware, teacherAuthMiddleware ,updateStudent)

router.put('/', authMiddleware, updateStudentByStudent)

router.delete('/:id', authMiddleware, teacherAuthMiddleware ,deleteStudent)

router.delete('/',authMiddleware, teacherAuthMiddleware ,deleteStudentWithEmail)

router.patch('/:email', authMiddleware, teacherAuthMiddleware ,updateStudentByEmail)

router.delete('/soft/:id', authMiddleware,teacherAuthMiddleware ,softDeleteStudent)

router.post('/grade/:id', authMiddleware,teacherAuthMiddleware ,addGrade)

router.post('/signup', register)

router.post('/login', login)

module.exports = router