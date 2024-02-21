const Joi = require('joi')
const express = require('express')
const app = express()

app.use(express.json())

const courses = [

    {id: 1, name: "Marcus Aurelius"}, 
    {id: 2, name: "Ghetto Othello"}, 
    {id: 3, name: "Judas Iscariot"}

]

app.get('/', (req, res) => {
    res.send('The Hood Screaming We On Our Way')
})

app.get('/api/courses/', (req, res) => {
    res.send(courses)
})

app.listen(3000, () => {
    console.log('We have lift off...')
})

