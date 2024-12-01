import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class Task extends Component {
  static propTypes = {
    label: PropTypes.string,
    onDeleted: PropTypes.func.isRequired,
    onToggleItems: PropTypes.func.isRequired,
    isChecked: PropTypes.bool.isRequired,
    completed: PropTypes.bool.isRequired,
    timerstop: PropTypes.func,
    timerplay: PropTypes.func,
  }

  render() {
    const { id, label, onDeleted, onToggleItems, isChecked, completed, formatted, time, timerstop, timerplay } =
      this.props

    let classLi = ''

    if (completed) {
      classLi += 'completed'
    }

    return (
      <li className={classLi}>
        <div className="View">
          <input type="checkbox" checked={isChecked} className="toggle" onChange={onToggleItems} />
          <label>
            <span className="title" onClick={onToggleItems}>
              {label}
            </span>
            <span className="description">
              <button className="icon icon-play" onClick={() => timerplay(id)}></button>
              <button className="icon icon-pause" onClick={() => timerstop(id)}></button>
              {time}
            </span>
            <span className="description"> {`created ${formatted}`}</span>
          </label>
          <button type="button" className="icon icon-edit"></button>
          <button type="button" onClick={onDeleted} className="icon icon-destroy"></button>
        </div>
      </li>
    )
  }
}
