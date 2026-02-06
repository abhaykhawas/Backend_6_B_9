const Student = require('../Model/student')

const createStudent = async (req, res) => {
    try{
        const { name, age, email } = req.body

        const student = new Student({name, age, email})
        await student.save()

        res.status(201).json(student)
    }
    catch(err) {
        res.status(400).json({error: err.message})
    }
}

module.exports = { createStudent }