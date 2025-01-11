import React from 'react'

import TasksFilter from '../task-filters'

const Footer = ({ countNotChecked = 948, functionFilter, clearCompleted, valueTab }) => {
  return (
    <footer className="footer">
      <span className="todo-count">{countNotChecked} items left</span>
      <TasksFilter functionFilter={functionFilter} valueTab={valueTab} />
      <button className="Clear-completed" onClick={clearCompleted}>
        Clear completed
      </button>
    </footer>
  )
}
export default Footer
