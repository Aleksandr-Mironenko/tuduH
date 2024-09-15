import React, { Component } from 'react'
import PropTypes from 'prop-types'

import NewTaskForm from '../new-task-form'

export default class Header extends Component {
  static propTypes = {
    onEnterPressed: PropTypes.func.isRequired,
  }

  render() {
    const { onEnterPressed } = this.props
    return (
      <header className="header">
        <h1>todos</h1>
        <NewTaskForm onEnterPressed={onEnterPressed} />
      </header>
    )
  }
}
