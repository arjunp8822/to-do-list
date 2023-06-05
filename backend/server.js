const express = require('express')
const dotenv = require('dotenv').config()
const mongoose = require('mongoose')
const todo = require('./todoModel')
const cors = require('cors')

const connection = async () => {
    try {
        const connect = await mongoose.connect(process.env.MONGODB_CONN)
        console.log('Database connected')
    } catch (e) {
        console.log(e)
    }
}
connection()

const app = express()

app.use(express.json())
app.use(cors())

app.get('/api/todos', async (req, res) => {
    const todos = await todo.find()
    res.json(todos)
})

app.get('/api/todos/:id', async (req, res) => {
    try {
        const todoItem = await todo.findById(req.params.id)
        res.json(todoItem)
    } catch (e) {
        res.status(404).json({ 'message': 'Item not found' })
    }
})

app.post('/api/todos', async (req, res) => {
    const { task } = req.body
    if (!task) {
        res.json(
            { 'message': 'All fields are mandatory' }
        )
    } else {
        const todoItem = await todo.create({
            task: req.body.task,
            status: req.body.status,
            category: req.body.category,
            description: req.body.description
        })
        res.json(
            { 'message': 'Todo created' }
        )
        console.log(todoItem)
    }
})

app.put('/api/todos/:id', async (req, res) => {
    try {
        const todoItem = await todo.findById(req.params.id)
        const updatedTodoItem = await todo.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        )
        res.json(
            { 'message': 'Todo updated' }
        )
    } catch (e) {
        res.json(
            { 'message': 'Update failed' }
        )
    }
})

app.delete('/api/todos/:id', async (req, res) => {
    try {
        const todoItem = await todo.findById(req.params.id)
        const deletedTodoItem = await todo.findByIdAndDelete(req.params.id)
        res.json(
            { 'message': 'Todo deleted' }
        )
    } catch (e) {
        res.json(
            { 'message': 'Delete failed' }
        )
    }
})

app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`)
})