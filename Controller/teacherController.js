const Teacher = require('../Model/teacher')

// Create a teacher
const createTeacher = async (req, res) => {
    try{
        const { name, expertise, expereince } = req.body
        // const teacher = new Teacher({name, expertise, experience})
        // await teacher.save()
        const teacher = await Teacher.create({name, expertise, expereince})

        res.status(201).json(teacher)
    }
    catch(err) {
        res.status(400).json({error: err.message})
    }
}


// Get All Teachers 
const getTeachers = async (req, res) => {
    try{
        const teachers = await Teacher.find()

        res.status(200).json(teachers)
    }
    catch(err){
        res.status(400).json({error: err.message})
    }
}







module.exports = { createTeacher, getTeachers }