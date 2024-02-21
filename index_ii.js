const Joi = require('joi')
const express = require('express')
const app = express()

app.use(express.json())

const courses = [

    {id: 1, name: 'Lil Wayne'}, 
    {id: 2, name: 'Rick Ross'}, 
    {id: 3, name: 'Aubrey Graham'}

]

app.get('/', (req, res) => {
    res.send('Houston, we have are Sky High')
})

app.get('/api/courses', (req, res) => {
    res.send(courses)
})

app.get('/api/courses/:id', (req, res) => {

    const course = courses.find(c => c.id === parseInt(req.params.id))
    if (!course) {
        res.status(404).send(`The course with the given id of ${req.params.id} was not found unfortunately!`)
    } else {
        res.send(course)
    }
})

// app.get('/api/posts/dalston?searchBy=name', (req, res) => {
//     res.send(req.query)
// })

app.post('/api/courses', (req, res) => {

    const { error } = validateCourse(req.body)
    if (error) {
        res.status(400).send(error.details[0].message)
        return
    }

    const course = {
        id: courses.length + 1, 
        name: req.body.name
    }
    courses.push(course)
    res.send(course)
})

app.put('/api/courses/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id))
    if (!course) {
        res.status(400).send('We nuh have dat')
        return
    } 

    const { error } = validateCourse(req.body)
    if (error) {
        res.status(400).send(error.details[0].message)
        return
    }

    course.name = req.body.name 
    res.send(course)
})

function validateCourse(course) {

    schema = Joi.object({
        name: Joi.string()
            .alphanum()
            .min(3)
            .required()
    })

    return (schema.validate(course))
}

app.listen(5000, () => {
    console.log('Neo?')
})