import React from 'react'

const Task = ({
  id,
  label,
  onEdit,
  edit,
  onDeleted,
  onToggleItems,
  isChecked,
  completed,
  formatted,
  time,
  timerstop,
  timerplay,
  onChangeLabel,
}) => {
  return (
    <li className={completed ? 'completed' : ''}>
      <div className="View">
        <input type="checkbox" name="checkbox" checked={isChecked} className="toggle" onChange={onToggleItems} />
        <label>
          <span className="title" onClick={onToggleItems}>
            {!edit ? label : <input onChange={onChangeLabel} name={label} value={label} />}
          </span>
          <span className="description">
            <button className="icon icon-play" onClick={() => timerplay(id)}></button>
            <button className="icon icon-pause" onClick={() => timerstop(id)}></button>
            {time}
          </span>
          <span className="description"> {`created ${formatted}`}</span>
        </label>
        <button type="button" onClick={onEdit} className="icon icon-edit"></button>
        <button type="button" onClick={onDeleted} className="icon icon-destroy"></button>
      </div>
    </li>
  )
}
export default Task
// onKeyDown={addedInput}
//       onChange={onChange}
//       value={label}

// const onEdit = (id) => {
//   const idx = todoData.findIndex((el) => el.id === id)
//   const oldItem = todoData[idx]
//   const newItem = {
//     ...oldItem,
//     edit: !oldItem.edit,
//   }
//   setTodoData([...todoData.slice(0, idx), newItem, ...todoData.slice(idx + 1)])
// }
