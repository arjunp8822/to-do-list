import { useEffect, useState } from 'react';
import './App.css';
import Todo from './components/Todo';
import { AiOutlinePlus, AiFillCloseCircle } from 'react-icons/ai'

function App() {

  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [newTask, setNewTask] = useState(null)
  const [newStatus, setNewStatus] = useState(null)
  const [newCategory, setNewCategory] = useState(null)
  const [newDescription, setNewDescription] = useState(null)
  const [displayCreate, setDisplayCreate] = useState(false)

  const submitHandler = async (e) => {
    e.preventDefault()
    const newTodo = {
      'task': newTask,
      'status': newStatus,
      'category': newCategory,
      'description': newDescription
    }
    try {
      const post = await fetch('http://localhost:5000/api/todos', {
        method: 'POST',
        body: JSON.stringify(newTodo),
        headers: {
          'Content-Type': 'application/json',
        }
      })
      setDisplayCreate(false)
    } catch (e) {
      console.log(e)
    }
    window.location.reload(false);
  }

  useEffect(() => {
    setLoading(true)
    const fetchData = async () => {
      const response = await fetch('http://localhost:5000/api/todos')
      if (response) {
        const jsonData = await response.json()
        setData(jsonData)
        setLoading(false)
      } else {
        throw new Error('Please try again later')
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  const deleteHandler = async (e) => {
    try {
      const id = await e.target.value
      const deleteTodo = await fetch(`http://localhost:5000/api/todos/${id}`, {
        method: 'DELETE'
      })
    } catch (e) {
      console.log(e)
    }
    window.location.reload(false);
  }

  const updateHandler = async (e) => {
    try {
      const id = await e.target.value
      const updatedTodo = {
        'task': 'test update'
      }
      const updatedPost = await fetch(`http://localhost:5000/api/todos/${id}`, {
        method: 'PUT',
        body: JSON.stringify(updatedTodo),
        headers: {
          'Content-Type': 'application/json',
        }
      })
    } catch (e) {
      console.log(e)
    }
    window.location.reload(false);
  }

  if (loading) {
    return (
      <div>Loading</div>
    )
  } else {
    return (
      <>
        <div className="App">
          <nav>
            <h1>Tasks</h1>
            <AiOutlinePlus onClick={() => setDisplayCreate(true)} />
          </nav>
          {data && data.map((item) => (
            <div>
              <Todo task={item.task} />
            </div>
          ))}
        </div>

        {/* create modal */}

        <div className={displayCreate ? 'create-modal' : 'create-modal-inactive'}>
          <form onSubmit={submitHandler} className='create-container'>
            <div className='create-container-close-container'>
              <AiFillCloseCircle className='create-container-close-button' onClick={() => setDisplayCreate(false)} />
            </div>
            <input placeholder='Task' type='text' onChange={(e) => setNewTask(e.target.value)} className='new-task' />
            <div className='create-buttons'>
              <div className='create-category-buttons'>
                <button onClick={() => setNewCategory('Personal')} type='button' className={newCategory === 'Personal' ? 'button-active' : 'button-inactive'}>Personal</button>
                <button onClick={() => setNewCategory('Study')} type='button' className={newCategory === 'Study' ? 'button-active' : 'button-inactive'}>Study</button>
                <button onClick={() => setNewCategory('Work')} type='button' className={newCategory === 'Work' ? 'button-active' : 'button-inactive'}>Work</button>
              </div>
              <div className='create-status-buttons'>
                <button onClick={() => setNewStatus(1)} type='button' className={newStatus === 1 ? 'button-active' : 'button-inactive'}>Not Started</button>
                <button onClick={() => setNewStatus(2)} type='button' className={newStatus === 2 ? 'button-active' : 'button-inactive'}>Started</button>
              </div>
            </div>
            <textarea placeholder='Description' type='text' onChange={(e) => setNewDescription(e.target.value)} className='new-description' />
            <div className='create-submit-button-container'>
              <button type='submit'>Create</button>
            </div>
          </form>
        </div>
      </>
    );
  }

}

export default App;
