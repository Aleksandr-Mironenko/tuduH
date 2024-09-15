import React, { Component } from 'react'

import Header from '../header'
import Main from '../main'

export default class App extends Component {
  constructor() {
    super()
    this.state = {
      todoData: [],
      valueTab: 'all',
    }

    this.createEl = (text) => {
      this.setState(({ todoData }) => {
        const newId = (Math.random() * 1000000) ^ 2

        const newTodoItem = {
          label: text,
          id: newId,
          isChecked: false,
          completed: false,
        }

        return {
          todoData: [...todoData, newTodoItem],
          label: '',
        }
      })
    }

    this.onEnterPressed = (label) => {
      return this.createEl(label)
    }

    this.onToggleItems = (id) => {
      this.setState(({ todoData }) => {
        const idx = todoData.findIndex((el) => el.id === id)
        const oldItem = todoData[idx]

        const newItem = {
          ...oldItem,
          completed: !oldItem.completed,
          isChecked: !oldItem.isChecked,
        }

        const newArray = [...todoData.slice(0, idx), newItem, ...todoData.slice(idx + 1)]

        return { todoData: newArray }
      })
    }

    this.deleteElement = (id) => {
      this.setState(({ todoData }) => {
        const idx = todoData.findIndex((el) => el.id === id)
        const newtodoData = [...todoData.slice(0, idx), ...todoData.slice(idx + 1)]
        return { todoData: newtodoData }
      })
    }

    this.functionFilter = (tab) => {
      this.setState({ valueTab: tab })
    }

    this.filterTasks = (tasks, tab) => {
      if (tab === 'Active') {
        return tasks.filter((task) => !task.completed)
      } else if (tab === 'Completed') {
        return tasks.filter((task) => task.completed)
      } else {
        return tasks
      }
    }
    this.clearCompleted = () => {
      this.setState(({ todoData }) => {
        const newtodoData = [...todoData.filter((el) => !el.completed)]
        return { todoData: newtodoData }
      })
    }
  }

  render() {
    const { todoData } = this.state
    const count = this.state.todoData.length - this.state.todoData.filter((el) => el.completed).length

    const filteredTasks = this.filterTasks(todoData, this.state.valueTab)

    return (
      <section className="todoapp">
        <Header onEnterPressed={this.onEnterPressed} />
        <Main
          onDeleted={this.deleteElement}
          onToggleItems={this.onToggleItems}
          onToggleChecked={this.onToggleChecked}
          countNotChecked={count}
          functionFilter={this.functionFilter}
          filteredTasks={filteredTasks}
          clearCompleted={this.clearCompleted}
          valueTab={this.state.valueTab}
        />
      </section>
    )
  }
}
