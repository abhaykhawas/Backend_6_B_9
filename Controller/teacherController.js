const Teacher = require('../Model/teacher')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

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


const register = async (req, res) => {
    try{
        const { name, expertise, expereince, email, password } = req.body

        const exsistingTeacher = await Teacher.findOne({email})

        if(exsistingTeacher) {
            return res.status(400).json({message: "Teacher already exsists"})
        }

        // Hash password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        // create teacher
        const teacher = await Teacher.create({name, expereince, expertise, email, password: hashedPassword})

        // create JWT token
        const token = jwt.sign(
            { id: teacher._id, type: "teacher" },
            "THis is my secret",
            { expiresIn: "5m" }
        )

        res.status(200).json({
            message: "Signup successful",
            token,
            email: teacher.email
        })

    }
    catch(err) {
        res.status(400).json({error: err.message})
    }
}


const login = async (req, res) => {
    try{
        const { email, password } = req.body

        const teacher = await Teacher.findOne({email})
        if(!teacher) {
            return res.status(404).json({message: "Teacher not found"})
        }

        // compare password
        const isMatch = await bcrypt.compare(password, teacher.password)
        if(!isMatch) {
            return res.status(401).json({message: "Password is wrong"})
        }

        // Generate JWT
        const token = jwt.sign(
            { id: teacher._id, type: "teacher" },
            "THis is my secret",
            { expiresIn: "5m" }
        )

        res.status(200).json({
            message: "Login Succesful",
            token,
            email: teacher.email
        })
    }
    catch(err) {
        res.status(400).json({error: err.message})
    }
}





module.exports = { createTeacher, getTeachers, register, login }