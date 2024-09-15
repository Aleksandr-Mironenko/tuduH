import React, { Component } from 'react'
import PropTypes from 'prop-types'

import TasksFilter from '../task-filters'

export default class Footer extends Component {
  static defaultProps = {
    countNotChecked: 948,
  }

  static propTypes = {
    countNotChecked: PropTypes.number.isRequired,
  }

  render() {
    const { countNotChecked, functionFilter, clearCompleted, valueTab } = this.props
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
}
