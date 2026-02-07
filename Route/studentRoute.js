const express = require('express')
const { 
    createStudent, 
    readStudents, 
    readStudentById, 
    updateStudent,
    deleteStudent,
    deleteStudentWithEmail,
    updateStudentByEmail 
} = require('../Controller/studentController')
const router = express.Router()


router.post('/', createStudent)

router.get('/', readStudents)

router.get("/:id", readStudentById)

router.put('/:id', updateStudent)

router.delete('/:id', deleteStudent)

router.delete('/', deleteStudentWithEmail)

router.patch('/:email', updateStudentByEmail)

module.exports = router