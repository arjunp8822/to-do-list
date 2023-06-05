import React, { useState } from 'react'
import './InputBox.css'

const InputBox = (props) => {
    const [status, setStatus] = useState(true)
    const [selectedStatus, setSelectedStatus] = useState(1)
    const clickHandler = () => {
        setStatus(!status)
    }
    const selectHandler = (e) => {
        if (e.target.outerText === 'Not Started') { setSelectedStatus(1) }
        if (e.target.outerText === 'Started') { setSelectedStatus(2) }
        if (e.target.outerText === 'Complete') { setSelectedStatus(3) }
    }
    return (
        <div className={props.status === 1 ? 'input-box ns' : props.status === 2 ? 'input-box s' : props.status === 3 ? 'input-box c' : 'input-box ns'} onClick={clickHandler}>

        </div>
    )
}

export default InputBox