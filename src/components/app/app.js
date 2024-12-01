import React, { Component } from 'react'
import { formatDistanceToNow } from 'date-fns'
import KG from 'date-fns/locale/ru'

import Header from '../header'
import Main from '../main'

export default class App extends Component {
  state = {
    todoData: [],
    valueTab: 'all',
  }

  createEl = (text) => {
    this.setState(({ todoData }) => {
      const newId = (Math.random() * 1000000) ^ 2

      const newTodoItem = {
        label: text,
        id: newId,
        isChecked: false,
        completed: false,
        creationDate: new Date(),
        formatted: 'now',
        time: '00:00:00',
        timerplay: false,
      }

      return {
        todoData: [...todoData, newTodoItem],
      }
    })
  }

  onEnterPressed = (label) => {
    this.createEl(label)
  }

  onToggleItems = (id) => {
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

  deleteElement = (id) => {
    this.setState(({ todoData }) => {
      const idx = todoData.findIndex((el) => el.id === id)
      const newtodoData = [...todoData.slice(0, idx), ...todoData.slice(idx + 1)]
      return { todoData: newtodoData }
    })
  }

  functionFilter = (tab) => {
    this.setState({ valueTab: tab })
  }

  filterTasks = (tasks, tab) => {
    if (tab === 'Active') {
      return tasks.filter((task) => !task.completed)
    } else if (tab === 'Completed') {
      return tasks.filter((task) => task.completed)
    } else {
      return tasks
    }
  }
  clearCompleted = () => {
    this.setState(({ todoData }) => {
      const newtodoData = [...todoData.filter((el) => !el.completed)]
      return { todoData: newtodoData }
    })
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.todoData !== prevState.todoData) {
      clearInterval(this.timerInterval)
      clearInterval(this.funcInterval)
      this.timerInterval = setTimeout(this.timer, 1000)
      this.funcInterval = setTimeout(this.func, 5000)
      localStorage.setItem('todoData', JSON.stringify(this.state.todoData))
    }
  }

  timerplay = (id) => {
    const updatedTodoData = this.state.todoData.map((todo) => (todo.id === id ? { ...todo, timerplay: true } : todo))
    this.setState({ todoData: updatedTodoData })
  }

  timerstop = (id) => {
    const updatedTodoData = this.state.todoData.map((todo) => (todo.id === id ? { ...todo, timerplay: false } : todo))
    this.setState({ todoData: updatedTodoData })
  }

  timer = () => {
    if (this.state.todoData.length > 0) {
      const updatedTodoData = this.state.todoData.map((el) => {
        if (el.timerplay) {
          let secMinHour = el.time.split(':')
          let seconds = +secMinHour[0]
          let minutes = +secMinHour[1]
          let hours = +secMinHour[2]
          seconds++
          if (seconds === 60) {
            seconds = 0
            ++minutes
            if (minutes === 60) {
              minutes = 0
              ++hours
            }
          }
          let displaySeconds = (seconds < 10 ? '0' : '') + seconds
          let displayMinutes = (minutes < 10 ? '0' : '') + minutes
          let displayHours = (hours < 10 ? '0' : '') + hours
          return { ...el, time: `${displaySeconds}:${displayMinutes}:${displayHours}` }
        }
        return el
      })

      this.setState({ todoData: updatedTodoData })
    }
  }

  func = () => {
    this.setState(({ todoData }) => {
      const newTodoData = todoData.map((el) => ({
        ...el,
        formatted: formatDistanceToNow(el.creationDate, {
          includeSeconds: true,
          locale: KG,
          addSuffix: true,
        }),
      }))
      return { todoData: newTodoData }
    })
  }

  componentDidMount = () => {
    if (this.state.todoData.length === 0) {
      const todoData = localStorage.getItem('todoData') ? JSON.parse(localStorage.getItem('todoData')) : []
      this.setState({ todoData: todoData })
    }
  }

  componentWillUnmount() {
    clearInterval(this.timerInterval)
    clearInterval(this.funcInterval)
  }
  render() {
    const { todoData, valueTab } = this.state
    const count = todoData.length - todoData.filter((el) => el.completed).length

    const filteredTasks = this.filterTasks(todoData, valueTab)

    return (
      <section className="todoapp">
        <Header onEnterPressed={this.onEnterPressed} />
        <Main
          onDeleted={this.deleteElement}
          onToggleItems={this.onToggleItems}
          countNotChecked={count}
          functionFilter={this.functionFilter}
          filteredTasks={filteredTasks}
          clearCompleted={this.clearCompleted}
          valueTab={valueTab}
          timerstop={this.timerstop}
          timerplay={this.timerplay}
        />
      </section>
    )
  }
}
