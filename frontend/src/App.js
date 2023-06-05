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
  const [displayTodo, setDisplayTodo] = useState(false)
  const [updateTask, setUpdateTask] = useState(null)
  const [updateStatus, setUpdateStatus] = useState(null)
  const [updateCategory, setUpdateCategory] = useState(null)
  const [updateDescription, setUpdateDescription] = useState(null)
  const [updateId, setUpdateId] = useState(null)
  const [deleteId, setDeleteId] = useState(null)

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

  const getHandler = async (e) => {
    const id = await e.currentTarget.id
    const post = await fetch(`http://localhost:5000/api/todos/${id}`)
    const response = await post.json()
    setDisplayTodo(true)
    setUpdateTask(response.task)
    setUpdateStatus(response.status)
    setUpdateCategory(response.category)
    setUpdateDescription(response.description)
    setUpdateId(response._id)
    setDeleteId(response._id)
  }

  const deleteHandler = async (e) => {
    try {
      e.preventDefault()
      const deleteTodo = await fetch(`http://localhost:5000/api/todos/${deleteId}`, {
        method: 'DELETE'
      })
    } catch (e) {
      console.log(e)
    }
    window.location.reload(false);

  }

  const updateHandler = async (e) => {
    e.preventDefault()
    try {
      const updatedTodo = {
        'task': updateTask,
        'status': updateStatus,
        'category': updateCategory,
        'description': updateDescription
      }
      const updatedPost = await fetch(`http://localhost:5000/api/todos/${updateId}`, {
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
            <div onClick={getHandler} id={item._id} >
              <Todo task={item.task} id={item._id} />
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
                <button onClick={() => setNewStatus(3)} type='button' className={newStatus === 3 ? 'button-active' : 'button-inactive'}>Complete</button>
              </div>
            </div>
            <textarea placeholder='Description' type='text' onChange={(e) => setNewDescription(e.target.value)} className='new-description' />
            <div className='create-submit-button-container'>
              <button type='submit'>Create</button>
            </div>
          </form>
        </div>

        {/* todo edit modal */}

        <div className={displayTodo ? 'create-modal' : 'create-modal-inactive'}>
          <form onSubmit={updateHandler} className='create-container'>
            <div className='create-container-close-container'>
              <AiFillCloseCircle className='create-container-close-button' onClick={() => setDisplayTodo(false)} />
            </div>
            <input value={updateTask} type='text' onChange={(e) => setUpdateTask(e.target.value)} className='new-task' />
            <div className='create-buttons'>
              <div className='create-category-buttons'>
                <button onClick={() => setUpdateCategory('Personal')} type='button' className={updateCategory === 'Personal' ? 'button-active' : 'button-inactive'}>Personal</button>
                <button onClick={() => setUpdateCategory('Study')} type='button' className={updateCategory === 'Study' ? 'button-active' : 'button-inactive'}>Study</button>
                <button onClick={() => setUpdateCategory('Work')} type='button' className={updateCategory === 'Work' ? 'button-active' : 'button-inactive'}>Work</button>
              </div>
              <div className='create-status-buttons'>
                <button onClick={() => setUpdateStatus(1)} type='button' className={updateStatus === 1 ? 'button-active' : 'button-inactive'}>Not Started</button>
                <button onClick={() => setUpdateStatus(2)} type='button' className={updateStatus === 2 ? 'button-active' : 'button-inactive'}>Started</button>
                <button onClick={() => setUpdateStatus(3)} type='button' className={updateStatus === 3 ? 'button-active' : 'button-inactive'}>Complete</button>
              </div>
            </div>
            <textarea value={updateDescription} type='text' onChange={(e) => setUpdateDescription(e.target.value)} className='new-description' />
            <div className='create-submit-button-container'>
              <button type='submit' >Update</button>
              <button type='submit' onClick={deleteHandler}>Delete</button>
            </div>
          </form>
        </div>

      </>
    );
  }

}

export default App;
