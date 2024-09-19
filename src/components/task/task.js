import React, { Component } from 'react'
import PropTypes from 'prop-types'
import KG from 'date-fns/locale/en-AU'
import { formatDistanceToNow } from 'date-fns'

export default class Task extends Component {
  state = {
    creationDate: new Date(),
    formatted: '',
  }
  componentDidMount() {
    this.updateInterval = setInterval(this.func, 1000)
  }

  static propTypes = {
    label: PropTypes.string,
    onDeleted: PropTypes.func.isRequired,
    onToggleItems: PropTypes.func.isRequired,
    isChecked: PropTypes.bool.isRequired,
    completed: PropTypes.bool.isRequired,
  }

  func = () => {
    const format = formatDistanceToNow(this.state.creationDate, {
      includeSeconds: true,
      locale: KG,
      addSuffix: true,
    })
    this.setState({ formatted: format })
  }

  render() {
    const { label, onDeleted, onToggleItems, isChecked, completed } = this.props

    let classLi = ''

    if (completed) {
      classLi += 'completed'
    }

    return (
      <li className={classLi}>
        <div className="View">
          <input type="checkbox" checked={isChecked} className="toggle" onChange={onToggleItems} />
          <label onClick={onToggleItems}>
            <span className="description">{label}</span>
            <span className="created"> {`created ${this.state.formatted}`}</span>
          </label>
          <button type="button" className="icon icon-edit"></button>
          <button type="button" onClick={onDeleted} className="icon icon-destroy"></button>
        </div>
      </li>
    )
  }
}
