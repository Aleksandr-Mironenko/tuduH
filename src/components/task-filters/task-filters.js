import React from 'react'

const TasksFilter = ({ functionFilter, valueTab }) => {
  return (
    <ul className="filters">
      <li>
        <button
          autoFocus
          className={valueTab !== 'Active' && valueTab !== 'Completed' ? 'selected' : ''}
          onClick={() => functionFilter('all')}
        >
          All
        </button>
      </li>
      <li>
        <button autoFocus className={valueTab === 'Active' ? 'selected' : ''} onClick={() => functionFilter('Active')}>
          Active
        </button>
      </li>
      <li>
        <button
          autoFocus
          className={valueTab === 'Completed' ? 'selected' : ''}
          onClick={() => functionFilter('Completed')}
        >
          Completed
        </button>
      </li>
    </ul>
  )
}
export default TasksFilter
