import React from 'react'
import InputBox from './InputBox'
import './Todo.css'
import { MdCategory } from 'react-icons/md'

const Todo = (props) => {
    return (
        <div className='task-container'>
            <div className='task-text-container'>
                <InputBox status={props.status} />
                <div className='task-text'>
                    <h3>{props.task}</h3>
                </div>
            </div>
            <div className='task-category-container'>
                <h5>{props.category}</h5>
                <MdCategory className='task-category-icon' />
            </div>
        </div>
    )
}

export default Todo