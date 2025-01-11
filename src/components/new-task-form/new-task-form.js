import React, { useState } from 'react'

const NewTaskForm = ({ onEnterPressed }) => {
  const [label, setLabel] = useState('')

  const onChange = (event) => {
    setLabel(event.target.value)
  }

  const addedInput = (event) => {
    if (event.key === 'Enter') {
      onEnterPressed(label)
      setLabel('')
    }
  }

  return (
    <input
      name="newTask"
      className="new-todo"
      autoFocus
      placeholder="What needs to be done"
      onKeyDown={addedInput}
      onChange={onChange}
      value={label}
    />
  )
}
export default NewTaskForm
