const mongoose = require('mongoose')

const todoSchema = mongoose.Schema(
    {
        task: {
            type: String,
            required: true
        },
        status: {
            type: Number,
            default: 1
        },
        category: {
            type: String,
            enum: ['Personal', 'Study', 'Work']
        },
    },
    {
        timestamps: true
    }
)

module.exports = mongoose.model('Todo', todoSchema)