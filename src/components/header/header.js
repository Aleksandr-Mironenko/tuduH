import React from 'react'

import NewTaskForm from '../new-task-form'

const Header = ({ onEnterPressed }) => {
  return (
    <header className="header">
      <h1>todos</h1>
      <NewTaskForm onEnterPressed={onEnterPressed} />
    </header>
  )
}
export default Header
