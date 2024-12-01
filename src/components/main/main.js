import React, { Component } from 'react'
import PropTypes from 'prop-types'

import TaskList from '../task-list'
import Footer from '../footer'

export default class Main extends Component {
  static propTypes = {
    onEnterPressed: PropTypes.func,
    filteredTasks: PropTypes.arrayOf(PropTypes.object).isRequired,
    onDeleted: PropTypes.func.isRequired,
    onToggleItems: PropTypes.func.isRequired,
  }

  render() {
    const {
      onDeleted,
      onToggleItems,
      countNotChecked,
      functionFilter,
      filteredTasks,
      clearCompleted,
      valueTab,
      timerstop,
      timerplay,
    } = this.props

    return (
      <section className="main">
        <TaskList
          onDeleted={onDeleted}
          onToggleItems={onToggleItems}
          filteredTasks={filteredTasks}
          timerstop={timerstop}
          timerplay={timerplay}
        />
        <Footer
          countNotChecked={countNotChecked}
          functionFilter={functionFilter}
          clearCompleted={clearCompleted}
          valueTab={valueTab}
        />
      </section>
    )
  }
}
