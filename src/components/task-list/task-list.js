import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Task from '../task'

export default class TaskList extends Component {
  static propTypes = {
    filteredTasks: PropTypes.arrayOf(PropTypes.object).isRequired,
    onDeleted: PropTypes.func.isRequired,
    onToggleItems: PropTypes.func.isRequired,
  }

  render() {
    const { onDeleted, onToggleItems, filteredTasks } = this.props
    // const { todos } = this.props;
    const elements = filteredTasks.map((item) => {
      return (
        <Task
          key={item.id}
          {...item}
          onDeleted={() => onDeleted(item.id)}
          onToggleItems={() => onToggleItems(item.id)}
        />
      )
    })

    return <ul className="todo-list">{elements}</ul>
  }
}
