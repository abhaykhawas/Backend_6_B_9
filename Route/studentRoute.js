const express = require('express')
const { createStudent } = require('../Controller/studentController')
const router = express.Router()


router.post('/', createStudent)


module.exports = router