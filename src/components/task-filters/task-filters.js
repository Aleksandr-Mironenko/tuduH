import React, { Component } from 'react'

export default class TasksFilter extends Component {
  render() {
    const { functionFilter, valueTab } = this.props

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
          <button
            autoFocus
            className={valueTab === 'Active' ? 'selected' : ''}
            onClick={() => functionFilter('Active')}
          >
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
}
