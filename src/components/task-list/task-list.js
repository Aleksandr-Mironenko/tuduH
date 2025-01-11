import React from 'react'

import Task from '../task'

const TaskList = ({ onChangeLabel, onDeleted, onEdit, onToggleItems, filteredTasks, timerstop, timerplay }) => {
  const elements = filteredTasks.map((item) => {
    return (
      <Task
        key={item.id}
        {...item}
        onDeleted={() => onDeleted(item.id)}
        onEdit={() => onEdit(item.id)}
        onToggleItems={() => onToggleItems(item.id)}
        timerstop={timerstop}
        timerplay={timerplay}
        onChangeLabel={(e) => onChangeLabel(item.id, e.target.value)}
      />
    )
  })

  return <ul className="todo-list">{elements}</ul>
}
export default TaskList
