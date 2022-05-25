import { useState, useEffect } from 'react'
import { BrowserRouter as Router,Routes, Route } from 'react-router-dom'
import Header from './Components/Header'
import Footer from './Components/Footer'
import About from './Components/About'
import Tasks from './Components/Tasks'
import AddTask from './Components/AddTask';

function App() {
  const name = 'Zakiy';
  const [showAddTask, setShowAddTask] = useState(false)
  const [tasks, setTasks] = useState([])

  useEffect(()=> {
    const getTasks = async () => {
      const taskFromServer = await fetchTasks()
      setTasks(taskFromServer)
    }
    getTasks()
  }, [])

  // fetch tasks from server
  const fetchTasks = async () => {
    const res = await fetch('http://localhost:5000/tasks')
    const data = await res.json()
    console.log(data)
    return data
  }
  // fetch task from server
  const fetchTask = async (id) => {
    const res = await fetch(`http://localhost:5000/tasks/${id}`)
    const data = await res.json()
    console.log(data)
    return data
  }
  const deleteTask = async (id) => {
    await fetch(`http://localhost:5000/tasks/${id}`, {
      method: 'DELETE'
    })
    setTasks(tasks.filter((task)=> task.id !== id))
  }

  const toggleReminder = async (id) => {
    const taskToToggle = await fetchTask(id)
    const updateTask = {
      ...taskToToggle,
      reminder: !taskToToggle.reminder
    }
    const res = await fetch(`http://localhost:5000/tasks/${id}`,
    {
      method: 'PUT',
      headers: {
        'Content-type':'application/json'
      },
      body: JSON.stringify(updateTask)
    }
    )
    const data = await res.json()

    setTasks(tasks.map((task)=> task.id === id ? {...task, reminder: data.reminder} : task))
  }

  // addTask to state
  const addTask = async (task) => {
    // addTask locally
    // console.log('task')
    // const id = Math.floor(Math.random() * 10000)+1
    // const newTask = {id, ...task}
    // setTasks([...tasks, newTask])

    // addTask to the server
    const res = await fetch('http://localhost:5000/tasks',
    {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(task)
    })
    const data = await res.json()
    setTasks([...tasks, data])
  }


  return (
    <Router>
<div className="container">
      <Header title="Task Tracker" onAdd={()=> setShowAddTask(!showAddTask)}
        showAdd={showAddTask}/>
      {/* if showAddTask == true , show AddTask */}
    <Routes>
      <Route 
        path='/' 
        exact 
        element= {
          <>
          { showAddTask &&
            <AddTask onAdd={addTask}/>}
          {/* <h1>Hello World</h1>
          <h2>I'm {name}</h2> */}
          {tasks.length > 0 ? (
            <Tasks tasks = {tasks} onDelete= {deleteTask} onToggle={toggleReminder}/>
          ) : (
            'No Task For Now'
          )}
          </> 
        }/>
      <Route path= '/about' element= {<About />} />
    </Routes>  
      <Footer/>
        </div>
    </Router>
    
  );
}

export default App;
