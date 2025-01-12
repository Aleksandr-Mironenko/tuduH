import React, { useEffect, useState } from 'react'
import { formatDistanceToNow } from 'date-fns'
import KG from 'date-fns/locale/en-AU'

import Header from '../header'
import Main from '../main'

const App = () => {
  const [todoData, setTodoData] = useState([])
  const [valueTab, setValueTab] = useState('all')

  const createEl = (text) => {
    const newId = (Math.random() * 1000000) ^ 2
    setTodoData([
      ...todoData,
      {
        label: text,
        id: newId,
        isChecked: false,
        completed: false,
        creationDate: new Date(),
        formatted: 'now',
        time: '00:00:00',
        timerplay: false,
        edit: false,
      },
    ])
  }

  const onToggleItems = (id) => {
    setTodoData(
      todoData.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed, isChecked: !todo.isChecked } : todo
      )
    )
  }

  const onChangeLabel = (id, newLabel) => {
    setTodoData(todoData.map((todo) => (todo.id === id ? { ...todo, label: newLabel } : todo)))
  }

  const onEdit = (id) => {
    setTodoData(todoData.map((todo) => (todo.id === id ? { ...todo, edit: !todo.edit } : todo)))
  }

  const deleteElement = (id) => {
    const idx = todoData.findIndex((el) => el.id === id)
    setTodoData([...todoData.slice(0, idx), ...todoData.slice(idx + 1)])
  }

  const functionFilter = (tab) => {
    setValueTab(tab)
  }

  const filterTasks = (tasks, tab) => {
    if (tab === 'Active') {
      return tasks.filter((task) => !task.completed)
    } else if (tab === 'Completed') {
      return tasks.filter((task) => task.completed)
    } else {
      return tasks
    }
  }

  const clearCompleted = () => {
    setTodoData([...todoData.filter((el) => !el.completed)])
  }

  const timerplay = (id) => {
    setTodoData(todoData.map((todo) => (todo.id === id ? { ...todo, timerplay: true } : todo)))
  }

  const timerstop = (id) => {
    setTodoData(todoData.map((todo) => (todo.id === id ? { ...todo, timerplay: false } : todo)))
  }

  const timer = () => {
    setTodoData((prev) => {
      return prev.map((el) => {
        if (el.timerplay) {
          let secMinHour = el.time.split(':')
          let seconds = +secMinHour[2]
          let minutes = +secMinHour[1]
          let hours = +secMinHour[0]
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
          return { ...el, time: `${displayHours}:${displayMinutes}:${displaySeconds}` }
        }
        return el
      })
    })
  }

  const func = () => {
    setTodoData((prev) => {
      return prev.map((el) => ({
        ...el,
        formatted: formatDistanceToNow(el.creationDate, {
          includeSeconds: true,
          locale: KG,
          addSuffix: true,
        }),
      }))
    })
  }

  useEffect(() => {
    const timerInterval = setInterval(timer, 1000)

    return () => {
      clearInterval(timerInterval)
    }
  }, [todoData])

  useEffect(() => {
    const funcInterval = setInterval(func, 5000)
    return () => clearInterval(funcInterval)
  }, [])

  useEffect(() => {
    setTodoData(localStorage.getItem('todoData') ? JSON.parse(localStorage.getItem('todoData')) : [])
  }, [])

  useEffect(() => {
    localStorage.setItem('todoData', JSON.stringify(todoData))
  }, [todoData])

  const count = todoData.length - todoData.filter((el) => el.completed).length

  const filteredTasks = filterTasks(todoData, valueTab)

  return (
    <section className="todoapp">
      <Header onEnterPressed={createEl} />
      <Main
        onEdit={onEdit}
        onDeleted={deleteElement}
        onToggleItems={onToggleItems}
        countNotChecked={count}
        functionFilter={functionFilter}
        filteredTasks={filteredTasks}
        clearCompleted={clearCompleted}
        valueTab={valueTab}
        timerstop={timerstop}
        timerplay={timerplay}
        onChangeLabel={onChangeLabel}
      />
    </section>
  )
}
export default App
