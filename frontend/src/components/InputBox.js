import React, { useState } from 'react'
import './InputBox.css'

const InputBox = () => {
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
        <div className={selectedStatus === 1 ? 'input-box ns' : selectedStatus === 2 ? 'input-box s' : selectedStatus === 3 ? 'input-box c' : 'input-box ns'} onClick={clickHandler}>
            <ul className={status ? 'hide' : 'input-box-selection'}>
                <li className='not-started' value={1} onClick={selectHandler}><div className='input-box-circle ns'></div><p>Not Started</p></li>
                <li className='started' value={2} onClick={selectHandler}><div className='input-box-circle s'></div><p>Started</p></li>
                <li className='complete' value={3} onClick={selectHandler}><div className='input-box-circle c'></div><p>Complete</p></li>
            </ul>
        </div>
    )
}

export default InputBox