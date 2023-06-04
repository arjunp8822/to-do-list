import { useEffect, useState } from 'react';
import './App.css';

function App() {

  const [data, setData] = useState(null)
  const [newTask, setNewTask] = useState(null)
  const [loading, setLoading] = useState(true)

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
      'task': newTask
    }
    try {
      const post = await fetch('http://localhost:5000/api/todos', {
        method: 'POST',
        body: JSON.stringify(newTodo),
        headers: {
          'Content-Type': 'application/json',
        }
      })
    } catch (e) {
      console.log(e)
    }
    window.location.reload(false);
  }

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
      <div className="App">
        <div>
          {data && data.map((item) => (
            <div>
              <p>{item.task}</p>
              <button onClick={updateHandler} value={item._id}>Change</button>
              <button onClick={deleteHandler} value={item._id}>Delete</button>
            </div>
          ))}
        </div>
        <form onSubmit={submitHandler}>
          <input placeholder='Task' onChange={(e) => setNewTask(e.target.value)} />
          <button>Create</button>
        </form>
      </div>
    );
  }

}

export default App;
