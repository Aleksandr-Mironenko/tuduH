import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class NewTaskForm extends Component {
  state = {
    label: '',
  }

  static propTypes = {
    onEnterPressed: PropTypes.func.isRequired,
  }

  onChange = (event) => {
    this.setState({ label: event.target.value })
  }

  addedInput = (event) => {
    if (event.key === 'Enter') {
      this.props.onEnterPressed(this.state.label)
      this.setState({
        label: '',
      })
    }
  }

  render() {
    return (
      <input
        className="new-todo"
        autoFocus
        placeholder="What needs to be done"
        onKeyDown={this.addedInput}
        onChange={this.onChange}
        value={this.state.label}
      />
    )
  }
}
