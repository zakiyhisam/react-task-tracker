import React from 'react'
import { useState } from 'react'

const AddTask = ({ onAdd }) => {

    //input text form controller
    const [text, setText] = useState('') 
    const [day, setDay] = useState('')
    const [reminder, setReminder] = useState(false)

    const onSubmit = (e) => {
        e.preventDefault()
        if(!text) {
            alert('Please add a task')
            return
        }
        //add func to the state (task)
        onAdd({ text, day, reminder})

        //reset controller to default value
        setText('')
        setDay('')
        setReminder(false)
    }

  return (
    <form className= 'add-form' onSubmit= {onSubmit}>
        <div className= 'form-control'>
            <label>Task</label>
            <input type='text' 
                placeholder='Add Task'
                value= {text} 
                //handle value setState to target controller
                onChange = {(e)=> setText(e.target.value)}
            />
        </div>
        <div className='form-control'>
        <label>Day & Time</label>
        <input
          type='text'
          placeholder='Add Day & Time'
          value={day}
          onChange={(e)=> setDay(e.target.value)}
        />
      </div>
      <div className='form-control form-control-check'>
        <label>Set Reminder</label>
        <input
          type='checkbox'
          checked={reminder}
          value={reminder}
          onChange={(e)=> setReminder(e.currentTarget.checked)}
        />
      </div>

      <input type='submit' value='Save Task' className='btn btn-block' />
    </form>
  )
}

export default AddTask